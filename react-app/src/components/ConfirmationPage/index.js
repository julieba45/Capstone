import React from "react";
import { NavLink } from "react-router-dom";

const ConfirmationPage = () => {
    return (
        <div>
            <h1>Thank you for your payment!</h1>
            <p>You order has been confirmed and will be processed soon.</p>
            <NavLink to='/'>Return to Home</NavLink>
        </div>
    )
}

export default ConfirmationPage;
