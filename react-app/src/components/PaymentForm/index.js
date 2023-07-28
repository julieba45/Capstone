import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createPayment } from "../../store/payment";
import { useHistory } from 'react-router-dom';
import { clearCart } from "../../store/cart";
import FinalCart from "../FinalCart";


const PaymentForm = () => {
    const dispatch = useDispatch();
    const [paymentInfo, setPaymentInfo] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const fetchSuggestions = async (input) => {
        const response = await fetch(`/api/auth/autocomplete/${input}`);
        const data = await response.json();
        setSuggestions(data);
    };

    const validateCreditCard = () => {
        const CardPrefix = paymentInfo.slice(0,4);

    }


    const validate = () => {
        const newErrors = {};
        if (!paymentInfo) newErrors.paymentInfo = "Payment info is required";
        if (!paymentAmount) newErrors.paymentAmount = "Payment amount is required";
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validate();

       if(!suggestions.some(suggestion => suggestion.description === location)){
            errors.location = "Please select a valid location from the suggestions"
        }
        if(Object.keys(errors).length > 0){
            setErrors(errors);
            return
        }

        const confirmation = await dispatch(createPayment({
            paymentInfo,
            paymentAmount,
            location
        }))

        if(!confirmation.orderId){
            setErrors({...errors, error: confirmation})
        } else{
            // console.log('------------CONFIRMATION IN ELSE', confirmation)
            // console.log('ORDERID', confirmation.orderId)
            await dispatch(clearCart())
            history.push(`/confirmation/${confirmation.orderId}`)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type = "text"
                value={paymentInfo}
                onChange={(e) => setPaymentInfo(e.target.value)}
                placeholder="Payment Info"
            />
             {errors.paymentInfo && <p>{errors.paymentInfo}</p>}
            <input
                type = "number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Payment Amount"
            />
             {errors.paymentAmount && <p>{errors.paymentAmount}</p>}

            <input
                type = "text"
                value={location}
                onChange={(e) => {
                    setLocation(e.target.value)
                    setShowSuggestions(true)
                }}
                placeholder="Location"
            />
            <div className="location-suggestions">
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

            </div>
            {errors.location && <p>{errors.location}</p>}
            <button type="submit">Submit Payment</button>
            {errors.error && <p>{errors.error}</p>}
        <FinalCart/>
        </form>
    )

}


export default PaymentForm
