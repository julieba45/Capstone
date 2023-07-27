import { useState } from "react";
import { useDispatch } from "react-redux"
import { createPayment } from "../../store/payment";
import { useHistory } from 'react-router-dom';
import { clearCart } from "../../store/cart";


const PaymentForm = () => {
    const dispatch = useDispatch();
    const [paymentInfo, setPaymentInfo] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();


    const validate = () => {
        const newErrors = {};
        if (!paymentInfo) newErrors.paymentInfo = "Payment info is required";
        if (!paymentAmount) newErrors.paymentAmount = "Payment amount is required";
        if (!location) newErrors.location = "Location is required";
        return newErrors
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validate();
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
            console.log('-----------CONFIRMATION IN IF', confirmation)
            setErrors({...errors, error: confirmation})
        } else{
            console.log('------------CONFIRMATION IN ELSE', confirmation)
            console.log('ORDERID', confirmation.orderId)
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
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
            />
            {errors.location && <p>{errors.location}</p>}
            <button type="submit">Submit Payment</button>
            {errors.error && <p>{errors.error}</p>}

        </form>
    )

}


export default PaymentForm
