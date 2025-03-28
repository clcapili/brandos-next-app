import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_DX6pLeKIVWsCTeN8hrRlz4rs00MDNP8Xew");

function PaymentConfirmation() {
	return (
		<Elements stripe={stripePromise}>
			<Response></Response>
		</Elements>
	)
}

function Response() {
	const stripe = useStripe();
	const [message, setMessage] = useState(null);
	const [buttonText, setButtonText] = useState(null);

	useEffect(() => {
		if (!stripe) {
			return;
		}
	
		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);
	
		if (!clientSecret) {
			return;
		}
	
		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					setButtonText('Continue');
					break;
				case "processing":
					setMessage("Your payment is processing.");
					setButtonText('Processing...');
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					setButtonText('Try Again');
					break;
				default:
					setMessage("Something went wrong.");
					setButtonText('Try Again');
					break;
			}
		});
	  }, [stripe]);

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card my-5">
						<div className="card-body">
							<h2 className="card-title">{message}</h2>
							<a href="/" className="btn btn-primary">{buttonText}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PaymentConfirmation