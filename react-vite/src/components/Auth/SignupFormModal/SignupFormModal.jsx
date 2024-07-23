import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkSignup } from "../../../redux/session";
import styles from "./SignupForm.module.css";
import LoginFormModal from "../LoginFormModal"; // Make sure the path is correct

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return setErrors({ email: "Please enter a valid email address" });
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const switchToLogin = () => {
    closeModal();
    setModalContent(<LoginFormModal />);
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>Sign Up</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.email}
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.errors}>{errors.email && errors.email}</div>
        <input
          className={styles.user_name}
          type="text"
          placeholder="Enter a user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className={styles.errors}>{errors.username && errors.username}</div>
        <input
          className={styles.password}
          type="password"
          placeholder="Enter a secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.errors}>{errors.password && errors.password}</div>
        <input
          className={styles.confirm_password}
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className={styles.errors}>
          {errors.confirmPassword && errors.confirmPassword}
        </div>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className={styles.switchModal}>
        Already registered?{" "}
        <button className={styles.switchButton} onClick={switchToLogin}>
          Login
        </button>
      </div>
    </main>
  );
}

export default SignupFormModal;
