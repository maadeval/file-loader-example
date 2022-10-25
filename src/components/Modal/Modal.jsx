import { useEffect } from "react";
import { createPortal } from "react-dom";

import style from "./Modal.module.css";

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    if (!children) return;

    document.body.classList.add(style.bodyOverflow);

    return () => document.body.classList.remove(style.bodyOverflow);
  });

  if (!children) return null;

  return createPortal(
    <div className={style.wrapper}>
      <section className={style.modal}>
        <button className={style.close} onClick={closeModal}>
          Cerrar
        </button>
        {children}
      </section>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
