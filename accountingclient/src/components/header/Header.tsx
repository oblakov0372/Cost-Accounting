import logoImg from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setIsLoged } from "../../redux/slices/user";

const Header = () => {
  const isLogedUser = useSelector((state: RootState) => state.user.isLoged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(setIsLoged(false));
    localStorage.removeItem("jwt");
    navigate("/login");
  };
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <ul>
          <li>
            <Link to={"/"}>
              <div className={styles.logo}>
                <img width={30} src={logoImg} alt="icon" />
                <h1>1Money</h1>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.header__right}>
        <ul>
          {!isLogedUser ? (
            <li className={styles.signIn}>
              <Link to={"/login"}>Sign in</Link>
            </li>
          ) : (
            <li className={styles.signIn} onClick={() => logout()}>
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
