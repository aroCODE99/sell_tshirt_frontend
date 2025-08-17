import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { ProductsType, ProductWithQuantity, sizeType } from "../../types/ProductsType";
import { useLoginContext } from "../../contexts/LoginContext";
import { useAddToCart } from "../../hooks/Queries";
import SizeModal from "./SizeModal";
import {createPortal} from "react-dom";

const ProductCard = ({ product }: { product: ProductsType }) => {
	const { auth } = useAuth();
	const { setShowLoginForm } = useLoginContext();
	const { isPending } = useAddToCart();

	// Modal state
	const [showSizeModal, setShowSizeModal] = useState(false);
	const [selectedSize, setSelectedSize] = useState<string>("");

	useEffect(() => {
		if (showSizeModal) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";
	})

	const handleAddToCartClick = () => {
		if (!auth.isAuthenticated) {
			setShowLoginForm(true);
			return;
		}
		setShowSizeModal(true); // open size modal
	};

	return (
		<>
			<div className="min-w-[350px] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden border border-gray-200 h-[460px] flex flex-col justify-between">
				{/* Image */}
				<div className="w-full h-[240px] bg-gray-100 flex items-center justify-center">
					<img
						src={product.imgPath}
						alt={product.name}
						className="h-full object-cover"
					/>
				</div>

				{/* Card Details */}
				<div className="p-4 flex-grow space-y-2">
					<Link to={`/product/${product.id}`}>
						<p className="text-xl font-semibold text-gray-800 hover:underline cursor-pointer">
							{product.name}
						</p>
					</Link>
					<p className="text-lg text-slate-600 font-extrabold">₹{product.price}</p>
					<p className="text-sm text-gray-500">Category: {product.category.type}</p>
					<p className="text-sm text-gray-500">Color: {product.color}</p>
				</div>

				{/* Buttons */}
				<div className="px-4 pb-4 flex gap-4">
					<button
						onClick={handleAddToCartClick}
						className="w-full px-4 py-2 text-white bg-black hover:bg-slate-700 transition-all rounded-lg font-medium text-lg"
						disabled={isPending}
					>
						Add to Cart
					</button>

					{auth.isAdmin && (
						<button className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition-all rounded-lg font-medium text-lg">
							Edit
						</button>
					)}
				</div>
			</div>

			{/* Size Modal */}
			{
				showSizeModal && 
					createPortal(
						<SizeModal product={product} selectedSize={selectedSize} setSelectedSize={setSelectedSize} setShowSizeModal={setShowSizeModal} />,
							document.body)
			}
		</>
	);
};

export default ProductCard;

