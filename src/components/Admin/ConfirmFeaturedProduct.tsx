import type { Dispatch, SetStateAction } from "react";
import type { ProductsType } from "../../types/ProductsType";

type PropsType = {
	selectedProduct: ProductsType | null;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	confirmFeaturedChange: () => void;
};

const ConfirmFeaturedProduct = ({
	selectedProduct,
	setShowModal,
	confirmFeaturedChange,
}: PropsType) => {
	return (
		<div className="fixed inset-0 z-99 flex items-center justify-center">

			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
			></div>

			<div className="relative bg-white rounded-2xl p-6 w-96 shadow-2xl transform transition-all duration-200 animate-fadeIn">
				<h2 className="text-lg font-bold mb-4 text-gray-900 border-b pb-2">
					Change Featured Status
				</h2>

				<p className="mb-6 text-gray-700">
					Do you want to{" "}
					<span className="font-semibold">
						{selectedProduct?.featured ? "remove" : "mark"}
					</span>{" "}
					<span className="font-semibold">{selectedProduct?.name}</span> as a
					Featured Product?
				</p>

				<div className="flex justify-end gap-3">
					<button
						onClick={() => setShowModal(false)}
						className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
					>
						Cancel
					</button>
					<button
						onClick={confirmFeaturedChange}
						className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
					>
						Confirm
					</button>
				</div>
			</div>

			<style>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: scale(0.95);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.2s ease-out forwards;
				}
				`}</style>
		</div>
	);
};

export default ConfirmFeaturedProduct;

