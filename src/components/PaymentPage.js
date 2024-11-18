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
    const [amount] = useState(3400); // Set the amount here
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
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#99EDC3' }}>
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Complete Your Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Full Name" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email Address" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="card-details" className="form-label">Card Details</label>
                        <div id="card-details" className="form-control p-2">
                            <CardElement />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-dark w-100" 
                        disabled={!stripe || isProcessing || succeeded}>
                        {isProcessing ? 'Processing…' : `Pay ₹${amount}`}
                    </button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {succeeded && <div className="alert alert-success mt-3">Payment successful!</div>}
            </div>
        </div>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default PaymentPage;
