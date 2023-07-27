import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e, demoEmail, demoPassword) => {
    e.preventDefault();

    const user_email = demoEmail || email
    const user_password = demoPassword || password

    const data = await dispatch(login(user_email, user_password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    handleSubmit(e,'demo@aa.io', 'password')
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleDemoLogin}>Demo Login</button>
    </>
  );
}

export default LoginFormModal;
