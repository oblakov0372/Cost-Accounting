import styles from "./Login.module.scss";
import logoImg from "../../assets/logo.png";
import SignUp from "../../components/signUp/SignUp";
import { useState } from "react";
import SignIn from "../../components/signIn/SignIn";

export const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <div className={styles.form}>
          {isSignUp ? (
            <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          ) : (
            <SignIn isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          )}
        </div>
      </div>
      <div className={styles.right}>
        <img width={250} src={logoImg} alt="icon" />
      </div>
    </div>
  );
};
