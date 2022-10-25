import { useContext, useRef, useState } from "react";
import { patchUserPicture } from "../../../lib/services/users";
import { fileToURL } from "../../../lib/utils/fileToUrl";
import { UsersContext } from "../../users-list/UsersList/UsersList";
import style from "./UserFormEditPicture.module.css";

const UserFormEditPicture = ({ user, closeModal }) => {
  const [preview, setPreview] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const { updateUsersByUser } = useContext(UsersContext);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Editar foto de {user.name}</h1>
      <div className={style.pictureBox}>
        <img
          className={style.picture}
          src={preview?.src || user.picture || "/user-picture.svg"}
        />
        <input
          accept={ALLOWED_MIME_TYPES.join(",")}
          ref={inputRef}
          onChange={(ev) => handleChange(ev, setPreview)}
          className={style.input}
          type="file"
        />
        <button
          disabled={isSubmitting}
          onClick={() => inputRef.current.click()}
          className={style.changePic}
        >
          Cambiar foto
        </button>
      </div>
      {preview && preview.error && (
        <p className={style.error}>{preview.error}</p>
      )}
      {preview && preview.filename && (
        <p className={style.filename}>Archivo: {preview.filename}</p>
      )}
      <button
        disabled={!preview?.src || isSubmitting}
        onClick={() =>
          handleClick(user.id, preview.src, {
            closeModal,
            updateUsersByUser,
            setIsSubmitting,
          })
        }
        className={style.button}
      >
        Actualizar imagen
      </button>
    </div>
  );
};

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_SIZE = 102400;

const handleChange = async (ev, setPreview) => {
  const file = ev.target.files[0];

  if (!file) return setPreview();

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    const formatter = new Intl.ListFormat("es", {
      style: "long",
      type: "disjunction",
    });

    const listFormatted = formatter.format(ALLOWED_MIME_TYPES);

    return setPreview({
      error: `El tipo de archivo no es válido. Debe ser ${listFormatted}`,
    });
  }

  if (file.size > MAX_SIZE)
    return setPreview({
      error: `El tamaño del archivo no es válido. Debe ser menor a ${MAX_SIZE} bytes`,
    });

  try {
    const dataURL = await fileToURL(file);

    setPreview({
      src: dataURL,
      filename: file.name,
    });
  } catch (err) {
    setPreview();
  }
};

const handleClick = async (
  userId,
  picture,
  { closeModal, updateUsersByUser, setIsSubmitting }
) => {
  setIsSubmitting(true);
  const { user, error } = await patchUserPicture(userId, picture);

  if (!error) {
    updateUsersByUser(user);

    closeModal();
  }

  setIsSubmitting(false);
};

export default UserFormEditPicture;
