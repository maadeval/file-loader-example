import { useState } from "react";
import Modal from "../../Modal/Modal";
import UserFormEditPicture from "../../users-form/UserFormEditPicture";

import style from "./UsersListRows.module.css";

const UsersListRows = ({ users, loading, error }) => {
  const { contentModal, openEditPicModal, closeModal } = useModal();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;
  if (!users.length) return <p>No hay usuarios</p>;

  return (
    <section className={style.wrapper}>
      {users.map((user) => (
        <article className={style.article} key={user.id}>
          <div className={style.pictureBox}>
            <img
              className={style.picture}
              src={user.picture || "/user-picture.svg"}
              alt={`Imagen de ${user.name}`}
            />
            <button
              onClick={() => openEditPicModal(user)}
              className={style.button}
            >
              Editar
            </button>
          </div>
          <p className={style.name}>{user.name}</p>
          <span className={style.username}>@{user.username}</span>
          {user.active ? (
            <span className={`${style.badge} ${style.validate}`}>
              Verificado
            </span>
          ) : (
            <span className={`${style.badge} ${style.invalidate}`}>
              Pendiente
            </span>
          )}
        </article>
      ))}
      <Modal closeModal={closeModal}>{contentModal}</Modal>
    </section>
  );
};

const useModal = () => {
  const [contentModal, setContentModal] = useState();

  const closeModal = () => setContentModal();

  const openEditPicModal = (user) =>
    setContentModal(
      <UserFormEditPicture user={user} closeModal={closeModal} />
    );

  return {
    contentModal,
    closeModal,
    openEditPicModal,
  };
};

export default UsersListRows;
