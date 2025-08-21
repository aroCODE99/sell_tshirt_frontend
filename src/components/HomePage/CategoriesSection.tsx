import {Link} from "react-router-dom";
import {useFilters} from "../../contexts/FilterContext";
import {useCategories} from "../../hooks/Queries";

const CategoriesSection = () => {
	const { dispatchFilters } = useFilters();

	const categories = [
		{ name: "Oversized", img: "/oversizetee.jpg" },
		{ name: "Streetwear", img: "/streetware.jpg" },
		{ name: "Graphic Tees", img: "/graphictee.jpg" },
	]

	return (
		<section className="py-20 px-6 bg-white text-black">
			<h2 className="text-4xl font-bold text-center mb-12 text-black">
				Shop by <span className="text-blue-500">Category</span>
			</h2>
			<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{categories.map((cat) => (
					<Link 
						onClick={() => dispatchFilters({ type: "SORT_BY_CATEGORY", payload: cat.name.toLowerCase() })}
						key={cat.name} to="/shop">
						<div className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer">
							<img
								src={cat.img}
								alt={cat.name}
								className="w-full h-72 object-cover group-hover:scale-110 transition"
							/>
							<div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/80 transition">
								<p className="text-2xl font-bold text-white">{cat.name}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}

export default CategoriesSection;
