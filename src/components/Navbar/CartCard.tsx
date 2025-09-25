import {Link} from "react-router-dom";
import type {CartProduct} from "../../types/ProductsType";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useRemoveFromCart} from "../../hooks/Queries";

const CartCard = ({cp}: {cp: [string, CartProduct]}) => {
	const {mutate: removeMutate} = useRemoveFromCart();
	const product: CartProduct = cp[1];
	const isDeleted = product.deleted; 

	return (
		<div className={`flex items-center gap-5 p-5 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-200 
			${isDeleted ? "border-2 border-red-300 opacity-70 bg-gray-100" : "hover:-translate-y-0.5"}`}>

			{/* Product Image with overlay for deleted items */}
			<div className="relative w-20 h-20 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
				<img
					src={product.imgPath || "../../../public/ArgentinaJerse/argentinaJersey.avif"}
					alt={product.name}
					className="w-full h-full object-cover"
				/>
				{isDeleted && (
					<div className="absolute inset-0 bg-red-400 bg-opacity-40 flex items-center justify-center">
						<span className="text-white font-bold text-xs rotate-[-20deg] bg-red-500 px-2 py-1 rounded">
							DELETED
						</span>
					</div>
				)}
			</div>

			{/* Product Info */}
			<div className="flex flex-col justify-center flex-grow min-w-0">
				<Link
					to={isDeleted ? "#" : `/product/${product.id}`}
					className={`truncate transition-colors ${isDeleted ? "text-gray-500 cursor-not-allowed" : "hover:text-blue-600"}`}
				>
					<span className={`font-medium text-base ${isDeleted ? "line-through text-gray-500" : "text-gray-900"}`}>
						{product.name}
					</span>
				</Link>

				<span className={`text-sm mt-0.5 ${isDeleted ? "text-gray-400" : "text-gray-500"}`}>
					₹ {product.discountedPrice} / <span className="line-through">{product.price}</span>
				</span>

				{/* Size Display */}
				<div className="mt-0.5 text-sm text-gray-500">
					Size:{" "}
					<span className="font-medium text-gray-800">
						{product.size || <span className="italic text-gray-400">Unknown</span>}
					</span>
				</div>

				{/* Deleted product message */}
				{isDeleted && (
					<div className="mt-2 text-xs text-red-500 font-medium">
						This product is no longer available
					</div>
				)}
			</div>

			{/* Quantity + Delete */}
			<div className="flex items-center gap-4">
				{/* Quantity Controls - Disabled for deleted products */}
				<div className={`flex items-center border rounded-lg overflow-hidden ${isDeleted ? "opacity-50" : ""}`}>
					<button
						className={`w-8 h-8 flex items-center justify-center transition ${isDeleted ? "cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"}`}
						disabled={isDeleted}
					>
						<span className="text-lg font-semibold">−</span>
					</button>
					<span className="w-10 h-8 flex items-center justify-center bg-white text-sm font-medium">
						{product.quantity}
					</span>
					<button
						className={`w-8 h-8 flex items-center justify-center transition ${isDeleted ? "cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"}`}
						disabled={isDeleted}
					>
						<span className="text-lg font-semibold">+</span>
					</button>
				</div>

				{/* Delete Button - Always enabled to remove from cart */}
				<button
					onClick={() => removeMutate(Number(cp[0]))}
					className={`text-xl transition-colors ${isDeleted ? "text-gray-400 hover:text-red-500" : "text-gray-400 hover:text-red-500"}`}
					title={isDeleted ? "Remove unavailable product from cart" : "Remove from cart"}
				>
					<RiDeleteBin6Line />
				</button>
			</div>
		</div>
	);
};

export default CartCard;
