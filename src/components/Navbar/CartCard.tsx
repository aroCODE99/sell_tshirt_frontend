import { Link } from "react-router-dom";
import type { CartProduct } from "../../types/ProductsType";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRemoveFromCart } from "../../hooks/Queries";

const CartCard = ({ cp }: { cp: [string, CartProduct] }) => {
	const { mutate: removeMutate } = useRemoveFromCart();
	const product: CartProduct = cp[1];

	return (
		<div className="flex items-center gap-5 p-5 rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">

			{/* Product Image */}
			<div className="w-20 h-20 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
				<img
					src={product.imgPath || "../../../public/ArgentinaJerse/argentinaJersey.avif"}
					alt={product.name}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Product Info */}
			<div className="flex flex-col justify-center flex-grow min-w-0">
				<Link to={`/product/${product.id}`} className="truncate hover:text-blue-600 transition-colors">
					<span className="font-medium text-gray-900 text-base">{product.name}</span>
				</Link>

				<span className="text-sm text-gray-500 mt-0.5">₹ {product.price}</span>

				{/* Size Display */}
				<div className="mt-0.5 text-sm text-gray-500">
					Size:{" "}
					<span className="font-medium text-gray-800">
						{product.size || <span className="italic text-gray-400">Unknown</span>}
					</span>
				</div>
			</div>

			{/* Quantity + Delete */}
			<div className="flex items-center gap-4">

				{/* Quantity Controls */}
				<div className="flex items-center border rounded-lg overflow-hidden">
					<button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
						<span className="text-lg font-semibold">−</span>
					</button>
					<span className="w-10 h-8 flex items-center justify-center bg-white text-sm font-medium">
						{product.quantity}
					</span>
					<button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
						<span className="text-lg font-semibold">+</span>
					</button>
				</div>

				{/* Delete Button */}
				<button
					onClick={() => removeMutate(Number(cp[0]))}
					className="text-xl text-gray-400 hover:text-red-500 transition-colors"
					title="Remove from cart"
				>
					<RiDeleteBin6Line />
				</button>
			</div>
		</div>
	);
};

export default CartCard;

