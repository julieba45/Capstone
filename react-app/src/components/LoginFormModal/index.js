import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e, demoEmail, demoPassword) => {
    e.preventDefault();

    const user_email = demoEmail || email
    const user_password = demoPassword || password

    let tempErrors = {...errors};

    const data = await dispatch(login(user_email, user_password));
    if (data) {
      data.forEach((item) => {
        let parts = item.split(" : ");
        let key = parts[0].trim();
        let value = parts[1].trim();
        tempErrors[key] = value;
        });
    } else {
        closeModal()
        return
    }

    if(Object.keys(tempErrors).length){
			// console.log('--------------ERRORS', errors)
			setErrors(tempErrors);
			return;
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
        <label>
          Email
          <input
            type="text"
            value={email}
            maxLength="255"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <div>{errors.email}</div>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength="255"
            required
          />
        </label>
        {errors.password && <div>{errors.password}</div>}
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleDemoLogin}>Demo Login</button>
    </>
  );
}

export default LoginFormModal;
