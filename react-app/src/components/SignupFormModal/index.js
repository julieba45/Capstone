import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [location, setLocation] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

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


	const handleSubmit = async (e) => {
		e.preventDefault();
		let errors = validate();


		if(!suggestions.some(suggestion => suggestion.description === location)){
			errors.location = "Please select a valid location from the suggestions";
        }
		if (password !== confirmPassword) {
			console.log('-------------PW NOT MATCHING')
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
				closeModal();
			}
		}

		if(Object.keys(errors).length){
			console.log('--------------ERRORS', errors)
			setErrors(errors);
			return;
		  }
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label>
					First Name
					<input
						type="text"
						placeholder="First Name"
						maxLength="50"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				{errors.firstName && <div>{errors.firstName}</div>}
				<label>
					Last Name
					<input
						type="text"
						placeholder="Last Name"
						maxLength="50"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				{errors.lastName && <div>{errors.lastName}</div>}
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
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						maxLength="40"
						required
					/>
				</label>
				{errors.username && <div>{errors.username}</div>}
				<label>
					Location
					<input
						type="text"
						placeholder="Location"
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
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						maxLength="255"
						required
					/>
				</label>
				{errors.confirmPassword && <div>{errors.confirmPassword}</div>}
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
