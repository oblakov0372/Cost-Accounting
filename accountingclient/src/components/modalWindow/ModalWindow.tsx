import { useState } from "react";
import styles from "./ModalWindow.module.scss";
import closePng from "../../assets/close.png";

const ModalWindow = ({ children, setIsVisibleModalWindow }) => {
  const onClickButton = () => {
    setIsVisibleModalWindow((prev: any) => !prev);
  };

  return (
    <>
      <div className={styles.dark}></div>
      <div className={styles.content}>
        <img
          className={styles.close}
          src={closePng}
          width={30}
          alt="close"
          onClick={() => setIsVisibleModalWindow((prev: any) => !prev)}
        />
        <div>{children}</div>
      </div>
    </>
  );
};

export default ModalWindow;
