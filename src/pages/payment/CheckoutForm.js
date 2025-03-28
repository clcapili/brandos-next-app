import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import config from 'config';

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		const {error} = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: `${config.appDomain}/register/payment-confirmation`,
			}
		});

		if (error) {
			setMessage(error.message);
		}

		setIsProcessing(false);
	}

	return (
	  	<div className="container">
			<div className="row justify-content-center">
		  		<div className="col-md-6 col-lg-5">
					<div className="mt-5">
						<h3 className="text-center">Please enter your billing information</h3>

						{message && <div className="alert alert-danger mb-3">{message}</div>}

						<div className="card mb-3">
				  			<div className="card-body">
								<form onSubmit={(event) => onSubmit(event)}>
									
									<div className="mb-3">
										<PaymentElement options={{layout: "tabs"}} />
									</div>

									<button disabled={isProcessing || !stripe || !elements} className="btn btn-primary">
										{isProcessing ? 'Processing...' : 'Pay now'}
									</button>

								</form>
							</div>
			  			</div>

					</div>
		  		</div>
			</div>
	  	</div>
	);
}

export default CheckoutForm;

