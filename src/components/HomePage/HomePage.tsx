import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="w-full min-h-screen bg-white text-gray-800">
			{/* Hero Section */}
			<section className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center px-4">
				<img
					src="https://images.unsplash.com/photo-1618354691310-7e5f3a24b078?auto=format&fit=crop&w=1600&q=80"
					alt="Hero Background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black opacity-50" />
				<div className="relative z-10 text-white">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
						Express Yourself with{" "}
						<span className="text-blue-400">Custom Tees</span>
					</h1>
					<p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
						Streetwear, oversized, and premium printed T-shirts — made for every vibe.  
					</p>
					<Link to={"/shop"}>
						<button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-lg font-semibold rounded-xl shadow-lg transition transform hover:scale-105">
							Explore Collection
						</button>
					</Link>
				</div>
			</section>

			{/* Featured Categories */}
			<section className="py-20 px-6 bg-gray-50">
				<h2 className="text-3xl font-bold text-center mb-12">
					Shop by <span className="text-blue-500">Category</span>
				</h2>
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{[
						{ name: "Oversized", img: "../../../public/oversizetee.jpg" },
						{ name: "Streetwear", img: "../../../public/streetware.jpg" },
						{ name: "Graphic Tees", img: "../../../public/graphictee.jpg" },
					].map((cat) => (
						<Link key={cat.name} to="/shop">
							<div className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer">
								<img src={cat.img} alt={cat.name} className="w-full h-72 object-cover group-hover:scale-110 transition" />
								<div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center group-hover:opacity-60 transition">
									<p className="text-2xl font-bold text-white">{cat.name}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-20 px-6 text-center bg-white">
				<h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
				<div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
					<div className="p-6 rounded-xl shadow hover:shadow-lg transition">
						<h3 className="text-xl font-semibold text-blue-500 mb-2">Premium Quality</h3>
						<p className="text-gray-600">Ultra-soft fabrics designed for comfort and built to last.</p>
					</div>
					<div className="p-6 rounded-xl shadow hover:shadow-lg transition">
						<h3 className="text-xl font-semibold text-blue-500 mb-2">Affordable Pricing</h3>
						<p className="text-gray-600">Stay trendy without breaking the bank — under ₹1000!</p>
					</div>
					<div className="p-6 rounded-xl shadow hover:shadow-lg transition">
						<h3 className="text-xl font-semibold text-blue-500 mb-2">Fast Shipping</h3>
						<p className="text-gray-600">Pan-India shipping with COD & easy returns.</p>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-6 bg-gray-50">
				<h2 className="text-3xl font-bold text-center mb-12">Loved by Our Customers</h2>
				<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
					<div className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition">
						<div className="flex items-center gap-3 mb-4">
							<img src="https://i.pravatar.cc/50?img=1" alt="Aman" className="w-12 h-12 rounded-full" />
							<div>
								<p className="font-semibold">Aman K.</p>
								<p className="text-sm text-gray-500">Mumbai</p>
							</div>
						</div>
						<p className="italic">"Best T-shirts I’ve bought online. Quality is 🔥 and the prints are dope!"</p>
					</div>
					<div className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition">
						<div className="flex items-center gap-3 mb-4">
							<img src="https://i.pravatar.cc/50?img=2" alt="Sneha" className="w-12 h-12 rounded-full" />
							<div>
								<p className="font-semibold">Sneha R.</p>
								<p className="text-sm text-gray-500">Pune</p>
							</div>
						</div>
						<p className="italic">"I wore their oversized tee to college — got so many compliments!"</p>
					</div>
				</div>
			</section>

			{/* Featured T-Shirts */}
			<section className="py-20 px-6 bg-white">
				<h2 className="text-3xl font-bold text-center mb-10">Featured T-Shirts</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="border rounded-xl p-4 shadow hover:shadow-lg transition group"
						>
							<img
								src={`https://via.placeholder.com/400x400?text=Tee+${item}`}
								alt="T-shirt"
								className="rounded-md mb-4 group-hover:scale-105 transition"
							/>
							<h4 className="text-xl font-semibold">Drip Logo Tee {item}</h4>
							<p className="text-gray-500">₹799</p>
							<button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
								Add to Cart
							</button>
						</div>
					))}
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-blue-600 text-white text-center px-4">
				<h2 className="text-4xl font-bold mb-4">Ready to Drip?</h2>
				<p className="text-lg mb-6">Don’t miss out — limited stock, fast-moving designs!</p>
				<Link to={"/shop"}>
					<button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
						Start Shopping
					</button>
				</Link>
			</section>
		</div>
	);
};

export default HomePage;

