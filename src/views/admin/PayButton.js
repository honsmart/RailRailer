import React from 'react';
import { PaystackButton } from 'react-paystack';

const PayButton = ({ amount, email }) => {
    const publicKey = "pk_test_4b88b26288b9e90a9487236bc1c2493e33e98cff";

    const handlePaystackSuccessAction = (reference) => {
        // Handle payment success here
        console.log('Payment successful. Reference:', reference);
    }

    const componentProps = {
        email,
        amount: amount * 100, // Convert amount to kobo or pesewas
        publicKey,
        text: 'Pay Now',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: () => alert('Payment canceled by user.'),
    };

    return <PaystackButton {...componentProps} />;
};

export default PayButton;
