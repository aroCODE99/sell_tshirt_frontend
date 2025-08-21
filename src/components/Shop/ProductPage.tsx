import {useRef, useState} from "react";
import NoProducts from "./NoProducts";
import {Link, useParams} from "react-router-dom";
import {useProducts} from "../../hooks/Queries";
import type {ProductsType, sizeType} from "../../types/ProductsType";
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
	ArrowLeft
} from "lucide-react";
import ScrollToTop from "../ScrollToTop";

export const sizings: sizeType[] = ["XSM", "SM", "M", "LG", "XL", "XXL"];

const ProductPage = () => {
	const {data: products} = useProducts();
	const {id} = useParams();
	const activeProduct: ProductsType | undefined = Object.values(products ?? {}).find((t) => (
		t.id === Number(id)
	));

	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const [activeImage, setActiveImage] = useState(0);
	const quantityRef = useRef(null);

	// Mock multiple images for demonstration
	const productImages = [
		activeProduct?.imgPath || "../../../public/ArgentinaJerse/argentinaJersey.avif",
		"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
		"https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
	];

	if (!activeProduct) {
		return <NoProducts />;
	}

	const increaseQty = () => setQuantity(q => q + 1);
	const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

	// Dummy product rating and reviews
	const rating = 4.5;
	const reviewCount = 128;

	return (
		<>
			<ScrollToTop />
			<div className="min-h-screen bg-white">
				{/* Navigation */}
				<div className="border-b border-gray-100">
					<div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
						<Link to={"/shop"}><button className="flex items-center text-gray-600 hover:text-gray-900">
							<ArrowLeft size={20} className="mr-2" />
							Continue Shopping
						</button>
						</Link>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Left: Images */}
						<div className="space-y-4">
							{/* Main Image */}
							<div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
								<img
									src={productImages[activeImage]}
									alt={activeProduct.name}
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
								/>
								<div className="absolute top-4 right-4 flex gap-2">
									<button
										onClick={() => setIsFavorite(!isFavorite)}
										className={`p-2 rounded-full shadow-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
									>
										<Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
									</button>
									<button className="p-2 bg-white text-gray-700 rounded-full shadow-md">
										<Share size={20} />
									</button>
								</div>
							</div>

							{/* Thumbnails */}
							<div className="flex gap-3 overflow-auto py-2">
								{productImages.map((img, idx) => (
									<button
										key={idx}
										onClick={() => setActiveImage(idx)}
										className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-blue-500" : "border-gray-200"
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
						</div>

						{/* Right: Product Details */}
						<div className="flex flex-col justify-between gap-8 py-4">
							<div className="space-y-6">
								{/* Title and Category */}
								<div>
									<span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
										{activeProduct.category ?? "something".toUpperCase()}
									</span>
									<h1 className="text-3xl md:text-4xl font-bold text-gray-900">{activeProduct.name}</h1>

									{/* Rating */}
									<div className="flex items-center gap-2 mt-3">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													size={16}
													className={i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}
												/>
											))}
										</div>
										<span className="text-sm text-gray-600">{rating} ({reviewCount} reviews)</span>
									</div>
								</div>

								{/* Price */}
								<div>
									<div className="text-3xl font-bold text-gray-900">₹{activeProduct.price}</div>
									<p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
								</div>

								{/* Description */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
									<p className="text-gray-700 leading-relaxed">{activeProduct.description}</p>
								</div>

								{/* Color */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full border-2 border-gray-200" style={{backgroundColor: activeProduct.color}} />
										<span className="text-gray-700 capitalize">{activeProduct.color}</span>
									</div>
								</div>

								{/* Size Selector */}
								<div>
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
										<button className="text-sm text-blue-600 font-medium">Size Guide</button>
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
													className={`relative py-3 px-2 rounded-xl text-center transition-all
														${isOutOfStock
															? "bg-gray-100 text-gray-400 cursor-not-allowed"
															: isSelected
																? "border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium"
																: "border border-gray-200 hover:border-blue-300 text-gray-700"
														}`}
												>
													{size}
													{isSelected && (
														<div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
															<Check size={10} className="text-white" />
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
									<div ref={quantityRef} className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">
										<button
											onClick={decreaseQty}
											className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
										>
											<Minus size={16} />
										</button>
										<span className="px-6 py-3 w-12 text-center font-medium">{quantity}</span>
										<button
											onClick={increaseQty}
											className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
										>
											<Plus size={16} />
										</button>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="space-y-4 sticky bottom-0 bg-white pt-6 border-t border-gray-100">
								<div className="flex gap-4">
									<button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
										<ShoppingCart size={20} />
										Add to Cart
									</button>
									<button className="flex-1 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-colors">
										Buy Now
									</button>
								</div>

								{/* Trust Badges */}
								<div className="flex justify-center gap-6 py-4">
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Truck size={16} />
										<span>Free Shipping</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Shield size={16} />
										<span>Secure Payment</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Product Details Section */}
					<div className="mt-16 border-t border-gray-100 pt-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
								<ul className="space-y-2 text-gray-700">
									<li className="flex items-start">
										<Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
										<span>Premium quality materials</span>
									</li>
									<li className="flex items-start">
										<Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
										<span>Comfortable fit for all-day wear</span>
									</li>
									<li className="flex items-start">
										<Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
										<span>Machine washable</span>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
								<dl className="space-y-3">
									<div className="flex justify-between">
										<dt className="text-gray-600">Material</dt>
										<dd className="text-gray-900">100% Cotton</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-gray-600">Weight</dt>
										<dd className="text-gray-900">0.3 kg</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-gray-600">Country of Origin</dt>
										<dd className="text-gray-900">India</dd>
									</div>
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
