// Razorpay payment options
const options = {
	key: "rzp_test_rTaOUyjCmi7198", // Replace with your Razorpay key
	amount: order.amount,
	currency: "INR",
	name: "Devraj's Kitchen",
	description: "In-Restaurant Order",
	order_id: order.id,
	handler: async function (response) {
		// Confirm payment on backend
		const data = {
			orderCreationId: order.id,
			razorpayPaymentId: response.razorpay_payment_id,
			razorpayOrderId:   response.razorpay_order_id,
			razorpaySignature: response.razorpay_signature,
		};

		const res = await fetch(`${BASE_URL}/restaurant/payment/success`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await res.json();

		if (result.success) {
			// saving final paid order too in redux store
			const response3 = await fetch(
				`${BASE_URL}/restaurant/orders/${user._id}`
			);
			const allOrders2 = await response3.json();
			dispatch(orderSliceActions.setOrders(allOrders2.orders));

			navigate("/restaurant/user/current-order");
			dispatch(
				flashMessageActions.setFlashMessage({
					message: "your order placed successfully",
					type: "success",
				})
			);
		}
	},
	prefill: {
		name: data.name,
		contact: data.phone,
	},
	theme: { color: "#ff5722" },
	modal: {
		// this is the key part
		ondismiss: function () {
			// navigate to current order page even if payment wasn't successful
			navigate("/restaurant/user/current-order");
			dispatch(
				flashMessageActions.setFlashMessage({
					message: "Payment was not completed. You can try again!",
					type: "error",
				})
			);
		},
	},
};
