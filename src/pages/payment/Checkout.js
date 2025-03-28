import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import { PaymentData } from "../../data";
import { Loader } from '../../components';

const stripePromise = loadStripe("pk_test_DX6pLeKIVWsCTeN8hrRlz4rs00MDNP8Xew");

function Checkout({accountId}) {

    const { data: checkoutSession, error, loading } = PaymentData.createCheckoutSession(accountId);

    const options = {
        clientSecret: (checkoutSession ? checkoutSession.clientSecret : null)
    };

    return (
        <>

            {loading && <Loader></Loader>}

            {error && (
                <div>{`There is a problem fetching the data - ${error}`}</div>
            )}

            {checkoutSession && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            )}
        </>   
    )
}

export default Checkout;