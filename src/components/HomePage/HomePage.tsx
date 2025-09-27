import {Link} from "react-router-dom";
import {useProducts} from "../../hooks/Queries";
import "swiper/css";
import "swiper/css/navigation";
import FeatureProducts from "./FeaturedProducts";
import CategoriesSection from "./CategoriesSection";
import {useState, useEffect, useRef} from "react";
import {ChevronLeft, ChevronRight, ArrowRight, Star, Truck, Shield, RefreshCw, Zap, Award, Heart} from "lucide-react";

const HomePage = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const heroRef = useRef(null);

	const heroSlides = [
		{
			image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
			title: "Premium Quality Tees",
			subtitle: "Crafted for comfort and style",
			accent: "from-blue-500/90 to-purple-600/90"
		},
		{
			image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
			title: "Summer Collection",
			subtitle: "Fresh designs for warm days",
			accent: "from-green-500/90 to-cyan-600/90"
		},
		{
			image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
			title: "Limited Edition Prints",
			subtitle: "Exclusive designs you won't find elsewhere",
			accent: "from-rose-500/90 to-orange-600/90"
		}
	];

	useEffect(() => {
		setIsVisible(true);
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
			{/* Hero Carousel Section - Modernized */}
			<section
				ref={heroRef}
				className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden"
			>
				{heroSlides.map((slide, index) => (
					<div
						key={index}
						className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentSlide
								? "opacity-100 scale-100"
								: "opacity-0 scale-105"
							}`}
					>
						<div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} mix-blend-multiply`} />
						<img
							src={slide.image}
							alt="Hero Background"
							className="w-full h-full object-cover object-center"
						/>
					</div>
				))}

				<div className={`relative z-10 max-w-4xl px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
					}`}>
					<div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
						<Zap size={16} className="text-yellow-400" />
						<span className="text-sm font-medium text-white">New Collection Just Dropped</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
						<span className="text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
							Elevate Your{" "}
						</span>
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Style
						</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-100 font-light">
						Minimalistic, oversized, and street-ready tees — for those who want to stand out.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link to={"/shop"} className="group">
							<button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group-hover:gap-3">
								Shop Collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
							</button>
						</Link>
						<Link to={"/about"} className="group">
							<button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-lg font-medium rounded-2xl border border-white/20 transition-all duration-300 transform hover:scale-105">
								Our Story
							</button>
						</Link>
					</div>
				</div>

				{/* Modern Carousel Controls */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
					{heroSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-12 h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${index === currentSlide ? "bg-white" : "bg-white/30"
								}`}
						>
							{index === currentSlide && (
								<div className="absolute top-0 left-0 h-full bg-white animate-progress" />
							)}
						</button>
					))}
				</div>

				<button
					onClick={prevSlide}
					className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-2xl backdrop-blur-md z-10 hover:bg-white/20 transition-all duration-300 group"
				>
					<ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-2xl backdrop-blur-md z-10 hover:bg-white/20 transition-all duration-300 group"
				>
					<ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
				</button>

				{/* Scroll Indicator */}
				<div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 text-white/60">
					<span className="text-sm font-medium">Scroll</span>
					<div className="w-px h-8 bg-white/30 animate-bounce" />
				</div>
			</section>

			{/* Value Propositions - Modernized */}
			<section className="py-20 bg-gradient-to-br from-gray-50 to-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
							Why Choose Us
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							We're committed to delivering exceptional quality and service
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{icon: Truck, title: "Free Shipping", desc: "On all orders over $50", color: "blue"},
							{icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns", color: "green"},
							{icon: Shield, title: "Secure Payment", desc: "Your data is always protected", color: "amber"},
							{icon: Award, title: "Premium Quality", desc: "Certified premium materials", color: "purple"},
							{icon: Heart, title: "Ethical Made", desc: "Sustainable and ethical production", color: "rose"},
							{icon: Zap, title: "Fast Delivery", desc: "Same day shipping available", color: "yellow"}
						].map((item, index) => (
							<div
								key={index}
								className="group text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
							>
								<div className={`inline-flex items-center justify-center w-20 h-20 bg-${item.color}-50 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
									<item.icon size={36} className={`text-${item.color}-600`} />
								</div>
								<h3 className="text-2xl font-semibold mb-3 text-gray-900">{item.title}</h3>
								<p className="text-gray-600 leading-relaxed">{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<CategoriesSection />

			<FeatureProducts />

			{/* Testimonials - Modernized */}
			<section className="py-20 bg-gradient-to-br from-gray-900 to-black">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
							Trusted by Thousands
						</h2>
						<p className="text-xl text-gray-400">Join our community of satisfied customers</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<div
								key={item}
								className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group hover:transform hover:-translate-y-1"
							>
								<div className="flex justify-between items-start mb-6">
									<div className="flex justify-center mb-4">
										{[...Array(5)].map((_, i) => (
											<Star key={i} size={20} className="text-amber-400 fill-current mx-0.5" />
										))}
									</div>
									<div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">"</div>
								</div>
								<p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
									"These are the most comfortable t-shirts I've ever owned. The fit is perfect and the fabric quality is outstanding."
								</p>
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
									<div>
										<p className="font-semibold text-white">Alex Johnson</p>
										<p className="text-sm text-gray-400">Verified Customer</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter - Modernized */}
			<section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
							Join the Movement
						</h2>
						<p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
							Get exclusive access to new drops, special offers, and style tips delivered straight to your inbox.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Your email address"
								className="flex-1 px-6 py-4 rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all"
							/>
							<button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
								Subscribe
							</button>
						</div>
						<p className="text-blue-200 text-sm mt-4">
							No spam, unsubscribe at any time
						</p>
					</div>
				</div>
			</section>

			<style jsx>{`
				@keyframes progress {
					from { width: 0%; }
					to { width: 100%; }
				}
				.animate-progress {
					animation: progress 5s linear forwards;
				}
			`}</style>
		</div>
	);
};

export default HomePage;
