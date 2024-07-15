import { useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import styles from "./LoginForm.module.css";
import { getAllCartItemsThunk } from "../../../redux/cart";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      dispatch(getAllCartItemsThunk());
      closeModal();
    }
  };

  const handleDemoUser = () => {
    const user = {
      email: "demo@aa.io",
      password: "password",
    };

    dispatch(thunkLogin(user)).then(() => {
      closeModal();
    });
  };

  const handleAdminUser = () => {
    const user = {
      email: "admin@aa.io",
      password: "admin",
    };

    dispatch(thunkLogin(user)).then(() => {
      closeModal();
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.title}>Please Login</div>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
      </div>
      <form name="login" className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.email}
          type="text"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.errors}>{errors.email && errors.email}</div>
        <input
          className={styles.password}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.errors}>
          {errors.password && errors.password}
        </div>
        <button className={styles.login} type="submit">
          Log In
        </button>
        <button className={styles.demoLogin} onClick={handleDemoUser}>
          Demo Login
        </button>
        <button className={styles.adminLogin} onClick={handleAdminUser}>
          Admin Login
        </button>
      </form>
    </main>
  );
}

export default LoginFormModal;
