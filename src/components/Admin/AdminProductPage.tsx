import {useState} from "react";
import {useAdminContext} from "../../contexts/AdminContext";
import {useProducts} from "../../hooks/Queries";
import AdminPageHeader from "./AdminPageHeader";
import ProductsTable from "./ProductsTable";
import type {ProductsType} from "../../types/ProductsType";
import {Filter, Search} from "lucide-react";

const AdminProductPage = () => {
	const {adminState, dispatch} = useAdminContext();
	const activeTab = adminState.activeTab;
	const [searchTerm, setSearchTerm] = useState("");
	const {data: products} = useProducts();
	console.log(products);

	// Filter products based on search term
	const filteredProducts = products
		? Object.values(products).filter(product =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.id.toString().includes(searchTerm)
		)
		: [];

	const handleFeaturedClick = (product: ProductsType) => {
		dispatch({type: "SET_ACTIVE_PRODUCT", payload: product})
		dispatch({type: "SET_SHOW_FEATURED_MODAL", payload: true});
	};

	return (<main className="flex-1 p-6 lg:p-8">
		<div className="space-y-6">

			{/* Header */}
			<AdminPageHeader />

			{/* Search and Filter */}
			<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
				<div className="flex flex-col md:flex-row gap-3">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="text"
							placeholder="Search products by name or ID..."
							className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
						<Filter size={16} /> Filter
					</button>
				</div>
			</div>

			{/* Product Table */}
			{/* this is also fixed i guess */}
			<ProductsTable
				filteredProducts={filteredProducts}
				handleFeaturedClick={handleFeaturedClick}
			/>
		</div>

	</main>
	);
}

export default AdminProductPage;
