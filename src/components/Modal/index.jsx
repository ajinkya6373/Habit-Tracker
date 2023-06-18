import { useEffect, useRef } from "react";
import { ModalWrapper, ModalContainer } from "./style/modal";
export default function Modal({ closeModal, children }) {
  const modalWrapperRef = useRef();

  const handleOutsideClick = (event) => {
    if (
      modalWrapperRef.current &&
      event.target !== modalWrapperRef.current &&
      !modalWrapperRef.current.contains(event.target)
    ) {
      closeModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <ModalWrapper>
      <ModalContainer ref={modalWrapperRef}>{children}</ModalContainer>
    </ModalWrapper>
  );
}
