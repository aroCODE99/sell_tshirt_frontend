import type { SetStateAction } from "react";
import type { ProductsType, CartProduct } from "../../types/ProductsType";
import { useAddToCart } from "../../hooks/Queries";
import { toast } from "react-toastify";
import { sizings } from "./ProductPage";
import {useCartContext} from "../../contexts/CartContext";

type SizeModalType = {
	product: ProductsType;
	selectedSize: string;
	setSelectedSize: React.Dispatch<SetStateAction<string>>;
	setShowSizeModal: React.Dispatch<SetStateAction<boolean>>;
};

const SizeModal = ({
	product,
	selectedSize,
	setSelectedSize,
	setShowSizeModal,
}: SizeModalType) => {
	const { mutate } = useAddToCart();
	const { dispatchCartAction } = useCartContext();

	const confirmAddToCart = () => {
		if (!selectedSize) {
			toast.error("Select size first");
			return;
		}

		try {
			const productWithQuantity: CartProduct = {
				...product,
				quantity: 1,
				size: selectedSize,
			};

			mutate({ product: productWithQuantity });
			dispatchCartAction({ type: "SET_CART_SIDEBAR_OPEN", payload: true });
			setShowSizeModal(false);
			setSelectedSize("");
		} catch (e: any) {
			toast.error(e.message);
			return;
		}
	};

	return (
		<div className="fixed inset-0 z-99 flex items-center justify-center">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
				onClick={() => {
					setShowSizeModal(false);
					setSelectedSize("");
				}}
			></div>

			{/* Modal */}
			<div className="relative bg-white rounded-2xl p-6 w-80 shadow-2xl transform transition-all duration-200 scale-100 animate-fadeIn">
				<h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
					Select Size
				</h2>

				<div className="flex gap-3 mb-6 flex-wrap">
					{sizings.map((s) => {
						const variant = product.productVariants.find((p) => p.size === s);
						const isOutOfStock = !variant || variant.quantity <= 0;

						return (
							<button
								key={s}
								onClick={() => setSelectedSize(variant?.size ?? "")}
								disabled={isOutOfStock}
								className={`px-5 py-2 rounded-full border font-medium transition-all duration-200
									${isOutOfStock
										? "opacity-30 cursor-not-allowed border-gray-300"
										: selectedSize === variant?.size
											? "bg-black text-white border-slate-500 shadow-md"
											: "bg-white text-gray-800 border-gray-400 hover:border-slate-500 hover:bg-slate-50"
									}
									`}
							>
								{s}
							</button>
						);
					})}
				</div>

				<div className="flex justify-end gap-3">
					<button
						onClick={() => {
							setShowSizeModal(false);
							setSelectedSize("");
						}}
						className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
					>
						Cancel
					</button>
					<button
						onClick={confirmAddToCart}
						className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={!selectedSize}
					>
						Confirm
					</button>
				</div>
			</div>

			<style >{`
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

export default SizeModal;

