const Footer = () => {
	return (
		<footer className="bg-black text-white py-12 px-6">
			<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
				{/* Brand Info */}
				<div>
					<h2 className="text-2xl font-bold mb-4 text-white tracking-wide">DripWear</h2>
					<p className="text-gray-400">
						Style that speaks. Shop the best T-shirts online with fast shipping across India.
					</p>
				</div>

				{/* Quick Links */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">Quick Links</h3>
					<ul className="space-y-2">
						<li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
						<li><a href="/shop" className="text-gray-400 hover:text-white transition">Shop</a></li>
						<li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
						<li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
					</ul>
				</div>

				{/* Contact Info */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">Contact</h3>
					<p className="text-gray-400">
						Email: <a href="mailto:support@dripwear.in" className="hover:text-white">support@dripwear.in</a>
					</p>
					<p className="text-gray-400">Phone: +91 93244 00358</p>
					<p className="text-gray-400 mt-3">Follow us:</p>
					<div className="flex space-x-4 mt-2">
						<a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
						<a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="text-center mt-10 text-gray-500 text-xs border-t border-gray-800 pt-6">
				&copy; {new Date().getFullYear()} DripWear. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;

