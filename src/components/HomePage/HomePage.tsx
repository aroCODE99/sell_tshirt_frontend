import {Link} from "react-router-dom";
import {useProducts} from "../../hooks/Queries";
import "swiper/css";
import "swiper/css/navigation";
import FeatureProducts from "./FeaturedProducts";
import CategoriesSection from "./CategoriesSection";
import {useState, useEffect} from "react";
import {ChevronLeft, ChevronRight, ArrowRight, Star, Truck, Shield, RefreshCw} from "lucide-react";

const HomePage = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const heroSlides = [
		{
			image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
			title: "Premium Quality Tees",
			subtitle: "Crafted for comfort and style"
		},
		{
			image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
			title: "Summer Collection",
			subtitle: "Fresh designs for warm days"
		},
		{
			image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
			title: "Limited Edition Prints",
			subtitle: "Exclusive designs you won't find elsewhere"
		}
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
	};

	return (
		<div className="w-full min-h-screen bg-white text-black overflow-hidden">
			{/* Hero Carousel Section */}
			<section className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
				{heroSlides.map((slide, index) => (
					<div
						key={index}
						className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
							}`}
					>
						<img
							src={slide.image}
							alt="Hero Background"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/40" />
					</div>
				))}

				<div className="relative z-10 max-w-4xl px-4">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
						<span className="text-white">Elevate Your </span>
						<span className="text-blue-400">Style</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-100">
						Minimalistic, oversized, and street-ready tees — for those who want to stand out.
					</p>
					<Link to={"/shop"}>
						<button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
							Shop Collection <ArrowRight size={20} />
						</button>
					</Link>
				</div>

				{/* Carousel Controls */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
					{heroSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-blue-500" : "bg-white/50"
								}`}
						/>
					))}
				</div>

				<button
					onClick={prevSlide}
					className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 text-white rounded-full backdrop-blur-sm z-10 hover:bg-white/30 transition-all"
				>
					<ChevronLeft size={32} />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 text-white rounded-full backdrop-blur-sm z-10 hover:bg-white/30 transition-all"
				>
					<ChevronRight size={32} />
				</button>
			</section>

			{/* Value Propositions */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
								<Truck size={32} className="text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
							<p className="text-gray-600">On all orders over $50</p>
						</div>

						<div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
								<RefreshCw size={32} className="text-green-600" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
							<p className="text-gray-600">30-day hassle-free returns</p>
						</div>

						<div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
								<Shield size={32} className="text-amber-600" />
							</div>
							<h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
							<p className="text-gray-600">Your data is always protected</p>
						</div>
					</div>
				</div>
			</section>

			<CategoriesSection />

			<FeatureProducts />

			{/* Testimonials */}
			<section className="py-16 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Customers Say</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[1, 2, 3].map((item) => (
							<div key={item} className="bg-gray-800 p-6 rounded-xl">
								<div className="flex justify-center mb-4">
									{[...Array(5)].map((_, i) => (
										<Star key={i} size={20} className="text-amber-400 fill-current" />
									))}
								</div>
								<p className="text-gray-300 italic mb-4">
									"These are the most comfortable t-shirts I've ever owned. The fit is perfect and the fabric quality is outstanding."
								</p>
								<div>
									<p className="font-medium">Alex Johnson</p>
									<p className="text-sm text-gray-400">Verified Customer</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="py-16 bg-blue-50">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
					<p className="text-gray-600 mb-8">
						Subscribe to our newsletter for exclusive deals and new product announcements
					</p>
					<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Your email address"
							className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
							Subscribe
						</button>
					</div>
				</div>
			</section>

		</div>
	);
};

export default HomePage;



