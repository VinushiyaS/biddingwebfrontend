import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51QBtqRDVaxzZr2tTLGJoEtp6DLvscZPUmcUnE1ygGSieZQ3Dfn36HLZYY8uVmIAYJcvgewGetG8PxXpwpecNnyV200M4Kn2Jku');

const CheckoutForm = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount] = useState(1000); // Set the amount here
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);
        setError(null);

        if (!name || !email) {
            setError('Please fill in all the fields.');
            setIsProcessing(false);
            return;
        }

        try {
            // Fetch client secret from the backend with required parameters
            const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
                name,
                email,
                amount,
            });
            const { clientSecret } = data;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name, email },
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                navigate('/leader-dashboard', { state: { email, message: 'Payment successful!' } });
            }
        } catch (error) {
            setError('Failed to process payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="payment-page">
            <h2>Complete Your Payment</h2>
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Full Name" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email Address" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Card Details</label>
                    <div className="card-element">
                        <CardElement />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="pay-button" 
                    disabled={!stripe || isProcessing || succeeded}>
                    {isProcessing ? 'Processing…' : 'Pay ₹2750'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {succeeded && <div className="success-message">Payment successful!</div>}
        </div>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;
