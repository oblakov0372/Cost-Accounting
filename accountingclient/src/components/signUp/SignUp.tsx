import { FC, useState } from "react";
import { IRegisterModel } from "../../types/loginModel";
const SignUp: FC = ({ isSignUp, setIsSignUp }: any) => {
  const [data, setData] = useState<IRegisterModel>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome! Please enter your details.</p>
      <span>Email</span>
      <br />
      <input
        onChange={(e) =>
          setData((prev) => ({
            email: e.target.value,
            password: prev.password,
            repeatPassword: prev.repeatPassword,
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
            repeatPassword: prev.repeatPassword,
          }))
        }
        value={data.password}
        type="text"
        name="password"
        placeholder="•••••••••••••••"
      />
      <br />
      <span>Repeat Password</span>
      <br />
      <input
        onChange={(e) =>
          setData((prev) => ({
            email: prev.email,
            password: prev.password,
            repeatPassword: e.target.value,
          }))
        }
        value={data.password}
        type="text"
        name="repeatPassword"
        placeholder="•••••••••••••••"
      />
      <br />
      <button>Sign up</button>
      <div className="text-center">
        <p>
          Already have account?{" "}
          <a onClick={() => setIsSignUp((prev: any) => !prev)}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
