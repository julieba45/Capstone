import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createPayment } from "../../store/payment";
import { useHistory } from 'react-router-dom';
import { clearCart } from "../../store/cart";
import FinalCart from "../FinalCart";
import "./PaymentForm.css"


const PaymentForm = () => {
    const dispatch = useDispatch();
    const [paymentInfo, setPaymentInfo] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cardType, setCardType] = useState('placeholder');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');


    const cart = useSelector(state => state.cart.cart.orderPlants);
    const signuplocation = useSelector(state => state.session.user.location);

    const fetchSuggestions = async (input) => {
        const response = await fetch(`/api/auth/autocomplete/${input}`);
        const data = await response.json();
        setSuggestions(data);
        // console.log('HELLLO---------', signuplocation)
    };

    const validateCreditCard = (currentvalue) => {
        const cardPrefix = currentvalue.slice(0,1);
        // console.log('----------CARD PREFIX', cardPrefix)

        if (!cardPrefix || cardPrefix.length === 0) {
            setCardType('placeholder');
            return 'placeholder';
        }

        if(cardPrefix === "3") {
            setCardType('AMEX');
            return 'AMEX';
        } else if(cardPrefix === "6") {
            setCardType('DISCOVER');
            return 'DISCOVER';
        } else if(cardPrefix.charAt(0) === "4") {
            setCardType('VISA');
            return 'VISA';
        } else if((cardPrefix.slice(0, 1) === "5" || cardPrefix.slice(0, 1) === "5")) {
            setCardType('MASTERCARD');
            return 'MASTERCARD';
        } else {
            setCardType('INVALID');
            return 'INVALID';
        }

    }

    const renderCardIcon = () => {
        switch(cardType) {
            case 'AMEX':
                return<i className="credit-card-icon fa-brands fa-cc-amex" style={{color: "#2e5fb2"}}></i>
            case 'DISCOVER':
                return <i className="credit-card-icon fa-brands fa-cc-discover" style={{color: "#e66d0a"}}></i>
            case 'VISA':
                return <i className="credit-card-icon fa-brands fa-cc-visa" style={{color: "#0c47ac"}}></i>
            case 'MASTERCARD':
                return <i className="credit-card-icon fab fa-cc-mastercard"></i>;
            default:
                return <i className="credit-card-icon fa-regular fa-credit-card"></i>;
        }
    }

    const validate = () => {
        console.log('---------VALIDATING')
        const newErrors = {};
        if (!paymentInfo) newErrors.paymentInfo = "Payment info is required";
        if (!paymentAmount) newErrors.paymentAmount = "Payment amount is required";
        if (!location) newErrors.location = "Location is required";
        if (!expiryDate) {
            newErrors.expiryDate = "Expiry date is required";
        } else {
            const [month, year] = expiryDate.split('/');
            if (!month || !year || month > 12 || month < 1 || year.length !== 2) {
                newErrors.expiryDate = "Invalid expiry date";
            }
        }

        if (!cvc) {
            newErrors.cvc = "CVC is required";
        } else if (cvc.length !== 3) {
            newErrors.cvc = "CVC should be 3 digits";
        }
        return newErrors
    }

    useEffect(() => {
        if(location && !suggestions.includes(location)){
            fetchSuggestions(location)
        } else {
            setSuggestions([])
        }
    }, [location])

    let totalCartCost = 0;
    if (cart) {
        totalCartCost = cart.reduce((acc, plantItem) => acc + (plantItem.quantity * plantItem.plant.price), 0);
    }

    useEffect(() => {
        setPaymentAmount(totalCartCost);
    }, [totalCartCost])

    useEffect(() => {
        if (signuplocation) {
            setLocation(signuplocation);
        }
    }, [signuplocation]);

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
            await dispatch(clearCart())
            history.push(`/confirmation/${confirmation.orderId}`)
        }
    }
    return (
        <div className="payment-page-container">
        <div className="payment-form-container">
            <form className="payment-form"onSubmit={handleSubmit}>
                <h4 className="payment-form-title-review">Delivery Information</h4>
                <p className="payment-form-title">Payment Method</p>
                <div className="credit-card-input-container">
                    {renderCardIcon()}
                    <input
                        className="cc-input"
                        type="text"
                        maxLength="16"
                        placeholder="xxxx xxxx xxxx xxxx"
                        value={paymentInfo}
                        onChange={(e) => {
                            if (e.target.value.match(/^\d*$/)) {
                                setPaymentInfo(e.target.value);
                                validateCreditCard(e.target.value);
                            }
                        }}
                    />
                </div>
                {errors.paymentInfo && <p className="signup-error-message">{errors.paymentInfo}</p>}
                <div className="expiry-cvc-container">
                    <div className="input-wrapper">
                        <input
                            className="expiry-input"
                            type="text"
                            maxLength="5"
                            placeholder="MM/YY"
                            onChange={(e) => {
                                setExpiryDate(e.target.value);
                            }}
                        />
                        {errors.expiryDate && <p className="signup-error-message">{errors.expiryDate}</p>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            className="cvc-input"
                            type="text"
                            maxLength="3"
                            placeholder="CVC"
                            onChange={(e) => {
                                if (e.target.value.match(/^\d{0,3}$/)) {
                                    setCvc(e.target.value);
                                }
                            }}
                        />
                        {errors.cvc && <p className="signup-error-message">{errors.cvc}</p>}
                    </div>
                </div>
                {/* {errors.paymentAmount && <p>{errors.paymentAmount}</p>} */}
                <p className="payment-form-title">Shipping Address</p>
                <input
                    className="payment-input"
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
                {errors.location && <p className="signup-error-message">{errors.location}</p>}
                <button className="general-green-btn"type="submit">Submit Payment</button>
                {errors.error && <p>{errors.error}</p>}
            </form>
        </div>
        <div className="final-cart-container">
            <FinalCart/>
        </div>

        </div>
    )

}


export default PaymentForm
