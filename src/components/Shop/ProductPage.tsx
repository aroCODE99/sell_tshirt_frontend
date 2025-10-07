import { useRef, useState } from "react";
import NoProducts from "./NoProducts";
import { Link, useParams } from "react-router-dom";
import { useAddToCart, useProducts } from "../../hooks/Queries";
import type { CartProduct, ProductsType, sizeType } from "../../types/ProductsType";
import {
	Heart,
	Share,
	Minus,
	Plus,
	ShoppingCart,
	Check,
	Star,
	Truck,
	Shield,
	ArrowLeft,
	Clock,
	Leaf,
	Award,
	Sparkles
} from "lucide-react";
import ScrollToTop from "../ScrollToTop";
import { useCartContext } from "../../contexts/CartContext";

export const sizings: sizeType[] = ["XSM", "SM", "M", "LG", "XL", "XXL"];

const ProductPage = () => {
	const { data: products } = useProducts();
	const { mutate: addToCart } = useAddToCart();
	const { dispatchCartAction } = useCartContext();
	const { id } = useParams();
	// now we hacking the stuff
	const activeProduct: ProductsType | undefined = Object.values(products ?? {}).find((t) => (
		t.id === Number(id)
	));

	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const [activeImage, setActiveImage] = useState(0);
	const [addedToCart, setAddedToCart] = useState(false);
	const quantityRef = useRef(null);

	// Mock multiple images for demonstration
	const productImages = [
		activeProduct?.imgPath || "../../../public/ArgentinaJerse/argentinaJersey.avif",
	];

	if (!activeProduct) {
		return <NoProducts />;
	}

	const increaseQty = () => setQuantity(q => q + 1);
	const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

	const handleAddToCart = () => {
		if (!selectedSize) { 
			alert("Plz select the size");
			return;
		}
		setAddedToCart(true);
		const cartProduct: CartProduct = { 
			...activeProduct, 
			quantity,
			size: selectedSize
		}
		dispatchCartAction({type: "SET_CART_SIDEBAR_OPEN", payload: true });
		addToCart({product: cartProduct}); // now this active product need the size and quantity
		setTimeout(() => setAddedToCart(false), 2000); 
	};

	// Dummy product rating and reviews
	const rating = 4.5;
	const reviewCount = 128;

	return (
		<>
			<ScrollToTop />
			<div className="min-h-screen bg-white">
				{/* Modern Navigation */}
				<div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
						<Link to={"/shop"}>
							<button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
								<ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
								Continue Shopping
							</button>
						</Link>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
						{/* Left: Images - Modernized */}
						<div className="space-y-6">
							{/* Main Image */}
							<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-square group">
								<img
									src={productImages[activeImage]}
									alt={activeProduct.name}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>

								{/* Premium Badge */}
								<div className="absolute top-4 left-4">
									<div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
										<Sparkles size={14} />
										Premium
									</div>
								</div>

								{/* Image Controls */}
								<div className="absolute top-4 right-4 flex gap-2">
									<button
										onClick={() => setIsFavorite(!isFavorite)}
										className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${isFavorite
											? 'bg-red-500/90 text-white shadow-lg transform scale-110'
											: 'bg-white/80 text-gray-700 hover:bg-white/90 hover:scale-105'
											}`}
									>
										<Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
									</button>
									<button className="p-3 bg-white/80 backdrop-blur-md text-gray-700 rounded-2xl hover:bg-white/90 hover:scale-105 transition-all duration-300">
										<Share size={20} />
									</button>
								</div>

								{/* Hover Overlay */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
							</div>

							{/* Thumbnails - Modernized */}
							<div className="flex gap-4 overflow-auto py-2 px-1">
								{productImages.map((img, idx) => (
									<button
										key={idx}
										onClick={() => setActiveImage(idx)}
										className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${activeImage === idx
											? "border-blue-500 shadow-lg"
											: "border-gray-200 hover:border-gray-300"
											}`}
									>
										<img
											src={img}
											alt={`Thumbnail ${idx + 1}`}
											className="w-full h-full object-cover"
										/>
									</button>
								))}
							</div>

							{/* Trust Indicators */}
							<div className="grid grid-cols-3 gap-4 pt-4">
								<div className="text-center p-4 rounded-2xl bg-blue-50 border border-blue-100">
									<Truck size={24} className="text-blue-600 mx-auto mb-2" />
									<p className="text-sm font-medium text-blue-900">Free Shipping</p>
								</div>
								<div className="text-center p-4 rounded-2xl bg-green-50 border border-green-100">
									<Leaf size={24} className="text-green-600 mx-auto mb-2" />
									<p className="text-sm font-medium text-green-900">Eco-Friendly</p>
								</div>
								<div className="text-center p-4 rounded-2xl bg-purple-50 border border-purple-100">
									<Award size={24} className="text-purple-600 mx-auto mb-2" />
									<p className="text-sm font-medium text-purple-900">Quality Guarantee</p>
								</div>
							</div>
						</div>

						{/* Right: Product Details - Modernized */}
						<div className="flex flex-col justify-between gap-8 py-4">
							<div className="space-y-8">
								{/* Title and Category */}
								<div>
									<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-sm font-medium mb-4">
										<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
										<span className="text-gray-700">{activeProduct.category?.toUpperCase() || "PREMIUM COLLECTION"}</span>
									</div>
									<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
										{activeProduct.name}
									</h1>

									{/* Rating */}
									<div className="flex items-center gap-3 mt-4">
										<div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													size={18}
													className={i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}
												/>
											))}
											<span className="ml-2 text-amber-700 font-semibold">{rating}</span>
										</div>
										<span className="text-gray-600">({reviewCount} reviews)</span>
									</div>
								</div>

								{/* Price */}
								<div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-3xl border border-gray-100">
									<div className="flex items-end gap-3">
										<span className="text-4xl font-bold text-gray-900">₹{activeProduct.discountedPrice}</span>
										{activeProduct.discountedPrice !== activeProduct.price && (
											<span className="text-xl text-gray-500 line-through">₹{activeProduct.price}</span>
										)}
										{activeProduct.discountedPrice !== activeProduct.price && (
											<span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
												Save ₹{activeProduct.price - activeProduct.discountedPrice}
											</span>
										)}
									</div>
									<p className="text-gray-600 mt-2 flex items-center gap-2">
										<Clock size={16} />
										<span>Inclusive of all taxes • Free shipping</span>
									</p>
								</div>

								{/* Description */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
										<span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
										Description
									</h3>
									<p className="text-gray-700 leading-relaxed text-lg">{activeProduct.description}</p>
								</div>

								{/* Color */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
									<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
										<div
											className="w-12 h-12 rounded-2xl border-2 border-white shadow-lg"
											style={{ backgroundColor: activeProduct.color }}
										/>
										<span className="text-gray-700 capitalize font-medium">{activeProduct.color}</span>
									</div>
								</div>

								{/* Size Selector */}
								<div>
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
										<button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
											Size Guide
										</button>
									</div>
									<div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
										{sizings.map((size) => {
											const variant = activeProduct.productVariants.find((p) => p.size === size);
											const isOutOfStock = !variant || variant.quantity <= 0;
											const isSelected = selectedSize === size;

											return (
												<button
													onClick={() => !isOutOfStock && setSelectedSize(size)}
													key={size}
													disabled={isOutOfStock}
													className={`relative py-4 px-2 rounded-2xl text-center transition-all duration-300 transform hover:scale-105
														${isOutOfStock
															? "bg-gray-100 text-gray-400 cursor-not-allowed"
															: isSelected
																? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
																: "bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:shadow-md"
														}`}
												>
													{size}
													{isSelected && (
														<div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
															<Check size={12} className="text-blue-600 font-bold" />
														</div>
													)}
													{isOutOfStock && (
														<div className="absolute inset-0 flex items-center justify-center">
															<div className="w-full h-px bg-gray-400 rotate-45"></div>
														</div>
													)}
												</button>
											);
										})}
									</div>
								</div>

								{/* Quantity Selector */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
									<div ref={quantityRef} className="inline-flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden bg-white">
										<button
											onClick={decreaseQty}
											className="p-4 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105"
										>
											<Minus size={18} />
										</button>
										<span className="px-8 py-4 w-8 text-center font-bold text-lg text-gray-900">{quantity}</span>
										<button
											onClick={increaseQty}
											className="p-4 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105"
										>
											<Plus size={18} />
										</button>
									</div>
								</div>
							</div>

							{/* Action Buttons - Modernized */}
							<div className="space-y-4 sticky bottom-0 bg-white pt-8 border-t border-gray-100">
								<button
									onClick={handleAddToCart}
									className={`w-full py-5 rounded-2xl font-semibold text-lg transition-all duration-300 
								transform hover:scale-[1.02] flex items-center justify-center gap-3 ${addedToCart
											? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
											: 'bg-blue-500 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl'
										}`}
								>
									{addedToCart ? (
										<>
											<Check size={24} />
											Added to Cart!
										</>
									) : (
										<>
											<ShoppingCart size={24} />
											Add to Cart • ₹{activeProduct.discountedPrice * quantity}
										</>
									)}
								</button>

								{/* Trust Badges */}
								<div className="flex justify-center gap-8 py-6">
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
											<Truck size={16} className="text-blue-600" />
										</div>
										<span>Free Shipping</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
											<Shield size={16} className="text-green-600" />
										</div>
										<span>Secure Payment</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Product Details Section - Modernized */}
					<div className="mt-16 border-t border-gray-100 pt-12">
						<h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
							Product Details
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							<div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<Sparkles size={20} className="text-blue-500" />
									Premium Features
								</h3>
								<ul className="space-y-4">
									{[
										"Premium quality materials for exceptional comfort",
										"Designed for all-day wear with perfect fit",
										"Machine washable with color protection",
										"Eco-friendly production process",
										"Wrinkle-resistant fabric technology"
									].map((feature, index) => (
										<li key={index} className="flex items-start">
											<Check size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700">{feature}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-100">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<Award size={20} className="text-purple-500" />
									Specifications
								</h3>
								<dl className="space-y-4">
									{[
										{ term: "Material", detail: "100% Premium Cotton" },
										{ term: "Weight", detail: "0.3 kg (Lightweight)" },
										{ term: "Origin", detail: "Made in India" },
										{ term: "Care", detail: "Machine Wash Cold" },
										{ term: "Fit", detail: "Regular Fit" },
										{ term: "Sustainability", detail: "Eco-Friendly Certified" }
									].map((item, index) => (
										<div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
											<dt className="text-gray-600 font-medium">{item.term}</dt>
											<dd className="text-gray-900 font-semibold">{item.detail}</dd>
										</div>
									))}
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPage;
