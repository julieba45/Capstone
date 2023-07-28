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
	const [errors, setErrors] = useState([]);
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
        return newErrors
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
		const errors = validate();

		if(!suggestions.some(suggestion => suggestion.description === location)){
            errors.location = "Please select a valid location from the suggestions"
        }
		if(Object.keys(errors).length > 0){
            setErrors(errors);
            return
        }
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, username, location, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
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
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
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
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
