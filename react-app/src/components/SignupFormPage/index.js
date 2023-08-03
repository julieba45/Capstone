import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignUpFormPage.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const history = useHistory();

  const fetchSuggestions = async (input) => {
    const response = await fetch(`/api/auth/autocomplete/${input}`);
    const data = await response.json();
    setSuggestions(data);
};

  const validate = () => {
      const newErrors = {};
      if (!location) newErrors.location = "Location is required";
      return newErrors;
  }

  useEffect(() => {
    if(location && !suggestions.includes(location)){
        fetchSuggestions(location)
    } else {
        setSuggestions([])
    }
}, [location])


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
		e.preventDefault();
		let errors = validate();


		if(!suggestions.some(suggestion => suggestion.description === location)){
			errors.location = "Please select a valid location from the suggestions";
        }
		if (password !== confirmPassword) {
			// console.log('-------------PW NOT MATCHING')
			errors.confirmPassword = "Confirm Password field must be the same as the Password field";
		}else {
			const data = await dispatch(signUp(firstName, lastName, username, location, email, password));
			if (data) {
				data.forEach((item) => {
					let parts = item.split(" : ");
					let key = parts[0].trim();
					let value = parts[1].trim();
					errors[key] = value;
				  });
				//['username : Username is already in use.', 'email : Please use valid email address.']
				// setErrors(data);
			} else {
				history.push('/');
			}
		}

		if(Object.keys(errors).length){
			// console.log('--------------ERRORS', errors)
			setErrors(errors);
			return;
		  }
	};

  return (
		<div className="signup-container">
      <div className="signup-inner-container">
        <div className="signup-header">
          <h1>Sign Up</h1>
        </div>
			<form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-div">
          <label>
            <input
              className="signup-inputarea"
              type="text"
              placeholder="FIRST NAME"
              maxLength="50"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>
				{errors.firstName && <div>{errors.firstName}</div>}
        <div className="signup-div">
          <label>
            <input
              className="signup-inputarea"
              type="text"
              placeholder="LAST NAME"
              maxLength="50"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
				{errors.lastName && <div>{errors.lastName}</div>}
        <div className="signup-div">
          <label>
            <input
              className="signup-inputarea"
              type="text"
              value={email}
              maxLength="100"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="YOUR EMAIL"
            />
          </label>
        </div>
				{errors.email && <div>{errors.email}</div>}
        <div className="signup-div">
          <label>
            <input
              className="signup-inputarea"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength="40"
              required
              placeholder="YOUR USERNAME"
            />
          </label>
        </div>
				{errors.username && <div>{errors.username}</div>}
				<label>
					<input
            className="signup-inputarea"
						type="text"
						placeholder="YOUR LOCATION"
						value={location}
						onChange={(e) => {
							setLocation(e.target.value)
							setShowSuggestions(true)
						}}
						required
					/>
					{showSuggestions && suggestions.map((suggestion, index) => (
					<div
						key={index}
						onMouseDown={(e) => {
							e.preventDefault();
							setLocation(suggestion.description);
							setSuggestions([]);
							setShowSuggestions(false);
						}}
					>
						{suggestion.description}
					</div>
					))}
				</label>
				{errors.location && <div>{errors.location}</div>}
        <div className="signup-div">
          <label>
            <input
              className="signup-inputarea"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength="100"
              required
              placeholder="YOUR PASSWORD"
            />
          </label>
        </div>
        <div className="signup-div">
          <label>
            <input
              className="signup-inputarea"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength="100"
              placeholder="CONFIRMED PASSWORD"
              required
            />
          </label>
        </div>
        <div>
        <input
          type="checkbox"
          id="acceptsTerms"
          checked={acceptsTerms}
          onChange={e => setAcceptsTerms(e.target.checked)}
        />
         <label htmlFor="acceptsTerms">I accept the terms and conditions</label>
        </div>
				{errors.confirmPassword && <div>{errors.confirmPassword}</div>}
				<button
            type="submit"
            className={`signup-main-btn ${acceptsTerms ? 'button-accepts-terms' : ''}`}
        >
            Sign Up
        </button>
			</form>
      </div>
		</div>
	);
}


export default SignupFormPage;
