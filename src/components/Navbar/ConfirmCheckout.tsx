import { useNavigate } from "react-router-dom";
import { usePlaceOrder, useRecentOrder } from "../../hooks/Queries";
import { toast } from "react-toastify";
import type { ModalActions } from "../../types/ModalActions";

const ConfirmCheckout = ({
	setConfirmCheckout,
	action 
}: { setConfirmCheckout: React.Dispatch<React.SetStateAction<boolean>>, action: ModalActions }) => {
	const { mutate: placeOrder } = usePlaceOrder();
	const { refetch } = useRecentOrder();
	const navigate = useNavigate();

	const handlePlaceOrder = async () => {
		try {
			setConfirmCheckout(false);
			placeOrder();
			await refetch();
			navigate("/shop/checkout");
			toast.success("Order placed successfully!");
		} catch (e) {
			console.error(e);
			toast.error("Failed to place order.");
		}
	};

	return (
		<div className="fixed inset-0 z-[99] flex items-center justify-center">
			{/* Overlay */}
			<div
				onClick={() => setConfirmCheckout(false)}
				className="absolute inset-0 bg-black opacity-35"
			></div>

			{/* Modal */}
			<div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all animate-fadeIn">
				<h1 className="text-xl font-semibold text-gray-900 mb-3">
					Confirm {action}
				</h1>
				<p className="text-gray-600 mb-6">
					{action === "checkout" ? "Are you sure you want to place this order?" : 
						"Are you sure you want to remove from cart?"}
				</p>
				<div className="flex justify-end gap-3">
					<button
						onClick={() => setConfirmCheckout(false)}
						className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
					>
						Cancel
					</button>
					<button
						onClick={handlePlaceOrder}
						className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
					>
						Confirm
					</button>
				</div>
			</div>

			<style>
				{`
					@keyframes fadeIn {
						from {
							opacity: 0;
							transform: translateY(-10px) scale(0.95);
						}
						to {
							opacity: 1;
							transform: translateY(0) scale(1);
						}
					}
					.animate-fadeIn {
						animation: fadeIn 0.25s ease-out forwards;
					}
					`}
			</style>
		</div>
	);
};

export default ConfirmCheckout;

