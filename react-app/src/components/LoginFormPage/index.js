import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // if (sessionUser) return <Redirect to="/" />;
  if (sessionUser){
    return <Redirect to={from}/>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data) {
      history.replace(from);
    }else {
      setErrors(data);
    }
  };

  return (
    <div className="signup-container">
       <div className="signup-inner-container">
       <div className="signup-header">
        <h1>Log In</h1>
        </div>
      <form  className="signup-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="signup-div">
        <label>
          <input
            className="signup-inputarea"
            type="text"
            value={email}
            maxLength="255"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            required
          />
        </label>
        </div>
        <div className="signup-div">
        <label>
          <input
            className="signup-inputarea"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength="255"
            placeholder="PASSWORD"
            required
          />
        </label>
        </div>
        <button className="signup-main-btn" type="submit">Log In</button>
      </form>
    </div>
    </div>
  );
}

export default LoginFormPage;
