import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
			<div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
				<CheckCircle2 className="mx-auto text-green-500" size={72} />
				<h1 className="text-2xl font-bold mt-4 text-gray-800">
					Payment Successful 🎉
				</h1>
				<p className="text-gray-600 mt-2">
					Thank you for your purchase! Your order has been confirmed and will be processed shortly.
				</p>

				<div className="mt-6 flex flex-col gap-3">
					<Link
						to="/orders"
						className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition"
					>
						View Order
					</Link>
					<Link
						to="/"
						className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;

