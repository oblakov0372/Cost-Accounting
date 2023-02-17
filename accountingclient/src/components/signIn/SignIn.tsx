import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ILoginModel } from "../../types/loginModel";
import { useDispatch } from "react-redux/es/exports";
import { setIsLoged } from "../../redux/slices/user";

const SignIn = ({ isSignUp, setIsSignUp }: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<ILoginModel>({ email: "", password: "" });
  const [isInCorrectPassword, setIsInCorrectPassword] = useState(false);

  async function ClickSignIn() {
    try {
      const response = await axios.post(
        "https://localhost:7131/api/Users/Login",
        data
      );
      localStorage.setItem("jwt", response.data);
      dispatch(setIsLoged(true));
      navigate("/");
    } catch (error) {
      if (error.response.status == 400) {
        setIsInCorrectPassword(true);
      }
    }
  }

  return (
    <div>
      <h1>Welcome back</h1>
      <p>Welcome back! Please enter your details.</p>
      <span>Email</span>
      <br />
      <input
        onChange={(e) =>
          setData((prev) => ({
            email: e.target.value,
            password: prev.password,
          }))
        }
        value={data.email}
        type="emaiil"
        name="email"
        placeholder="Enter your email"
      />
      <br />
      <span>Password</span>
      <br />
      <input
        onChange={(e) =>
          setData((prev) => ({
            email: prev.email,
            password: e.target.value,
          }))
        }
        value={data.password}
        type="password"
        name="password"
        placeholder="•••••••••••••••"
      />
      {isInCorrectPassword && (
        <h2 className="error">Password or email is incorrect</h2>
      )}
      <br />
      <button onClick={() => ClickSignIn()}>Sign in</button>
      <div className="text-center">
        <p>
          Don't have an account?{" "}
          <a onClick={() => setIsSignUp((prev: any) => !prev)}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
