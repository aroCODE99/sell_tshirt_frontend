import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import type {ProductsType, sizeType} from "../../types/ProductsType";
import {useLoginContext} from "../../contexts/LoginContext";
import {useAddToCart} from "../../hooks/Queries";
import SizeModal from "./SizeModal";
import {createPortal} from "react-dom";
import {Heart, ShoppingCart, Edit2, Eye, Star} from "lucide-react";

const ProductCard = ({product}: {product: ProductsType}) => {
	const {auth} = useAuth();
	const {setShowLoginForm} = useLoginContext();
	const {isPending} = useAddToCart();

	// Modal state
	const [showSizeModal, setShowSizeModal] = useState(false);
	const [selectedSize, setSelectedSize] = useState<string>("");
	const [isHovered, setIsHovered] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);

	useEffect(() => {
		if (showSizeModal) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";
	}, [showSizeModal]);

	const handleAddToCartClick = () => {
		if (!auth.isAuthenticated) {
			setShowLoginForm(true);
			return;
		}
		setShowSizeModal(true);
	};

	const handleWishlistClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsWishlisted(!isWishlisted);
		// Add your wishlist logic here
	};

	// Mock rating data
	const rating = 4.5;
	const reviewCount = 24;

	return (
		<>
			<div
				className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Image Container */}
				<div className="relative w-full h-60 bg-gray-100 overflow-hidden">
					<img
						src={product.imgPath}
						alt={product.name}
						className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"
							}`}
					/>

					{/* Hover Actions */}
					<div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
						}`}>
						<button
							onClick={handleWishlistClick}
							className={`p-2 rounded-full shadow-md backdrop-blur-sm ${isWishlisted
									? "bg-red-500 text-white"
									: "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
								} transition-colors`}
						>
							<Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
						</button>

						<Link to={`/product/${product.id}`}>
							<button className="p-2 bg-white/90 text-gray-700 rounded-full shadow-md backdrop-blur-sm hover:bg-black hover:text-white transition-colors">
								<Eye size={18} />
							</button>
						</Link>
					</div>

					{/* Admin Edit Button */}
					{auth.isAdmin && (
						<div className="absolute top-3 left-3">
							<button className="p-2 bg-white/90 text-gray-700 rounded-full shadow-md backdrop-blur-sm hover:bg-blue-500 hover:text-white transition-colors">
								<Edit2 size={18} />
							</button>
						</div>
					)}

					{/* Product Status Badge */}
					{product.featured && (
						<div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
							Featured
						</div>
					)}
				</div>

				{/* Card Details */}
				<div className="p-4 flex-grow space-y-2">
					<Link to={`/product/${product.id}`}>
						<h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
							{product.name}
						</h3>
					</Link>

					{/* Rating */}
					<div className="flex items-center gap-1">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={14}
									className={i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}
								/>
							))}
						</div>
						<span className="text-xs text-gray-500">({reviewCount})</span>
					</div>

					<div className="flex items-center gap-2">
						<p className="text-lg font-bold text-gray-900">₹{product.discountedPrice !== 0 ? product.discountedPrice : product.price}</p>/
						{product.price && (
							<p className="text-sm text-gray-500 line-through">₹{product.price}</p>
						)}
					</div>

					<div className="flex flex-wrap gap-1">
						<span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
							{product.category ? product.category : "SOMETHING"}
						</span>
						<span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
							{product.color}
						</span>
					</div>
				</div>

				{/* Action Button */}
				<div className="p-4 pt-0">
					<button
						onClick={handleAddToCartClick}
						disabled={isPending}
						className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors font-medium"
					>
						{isPending ? (
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
						) : (
							<>
								<ShoppingCart size={18} />
								Add to Cart
							</>
						)}
					</button>
				</div>
			</div>

			{/* Size Modal */}
			{showSizeModal && createPortal(
				<SizeModal
					product={product}
					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
					setShowSizeModal={setShowSizeModal}
				/>,
				document.body
			)}
		</>
	);
};

export default ProductCard;
