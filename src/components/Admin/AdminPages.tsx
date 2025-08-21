import {useState} from "react";
import {Plus, Edit, Trash2, Package, ShoppingCart, Users, BarChart3, Settings, Search, Filter, MoreVertical} from "lucide-react";
import {useCreateProduct, useMakeFeatureProduct, useProducts} from "../../hooks/Queries";
import ConfirmFeaturedProduct from "./ConfirmFeaturedProduct";
import {createPortal} from "react-dom";
import type {ProductsType} from "../../types/ProductsType";
import CreateProductModal from "./CreateProductModal";
import AdminSidebar from "./AdminSidebar";
import {ClipLoader} from "react-spinners";
import AdminPageHeader from "./AdminPageHeader";
import ProductsTable from "./ProductsTable";

const AdminPage = () => {
	const {data: products, isLoading} = useProducts();
	const [activeTab, setActiveTab] = useState("products");
	const {mutate: makeFeatureProduct} = useMakeFeatureProduct();
	const {mutate: createProduct, isPending} = useCreateProduct();

	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductsType | null>(
		null
	);
	const [showCreateProductModal, setShowCreateProductModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [form, setForm] = useState({
		name: "",
		price: "",
		description: "",
		categoryType: "",
		color: "",
		sizes: [] as string[],
	});
	const [file, setFile] = useState<File | null>(null);

	const handleFeaturedClick = (product: ProductsType) => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const confirmFeaturedChange = () => {
		if (selectedProduct) {
			makeFeatureProduct(selectedProduct.id);
			console.log(`Toggling featured status for: ${selectedProduct.name}`);
		}
		setShowModal(false);
		setSelectedProduct(null);
	};

	// Filter products based on search term
	const filteredProducts = products
		? Object.values(products).filter(product =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.id.toString().includes(searchTerm)
		)
		: [];

	const handleAddProduct = (formData: any) => {
		createProduct(formData);
	}

	if (isLoading || isPending)
		return (
			<div className="h-screen flex justify-center items-center bg-gray-50">
				<ClipLoader size={40} color="#3B82F6" />
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800 flex">
			{/* Sidebar */}
			<AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

			{/* Main Content */}
			<main className="flex-1 p-6 lg:p-8">
				{activeTab === "products" && (
					<div className="space-y-6">

						{/* Header */}
						<AdminPageHeader products={products} setShowCreateProductModal={setShowCreateProductModal} />

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
						<ProductsTable filteredProducts={filteredProducts} handleFeaturedClick={handleFeaturedClick} />
					</div>
				)}

				{activeTab === "orders" && (
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<h2 className="text-2xl font-bold text-gray-900 mb-2">Orders</h2>
						<p className="text-gray-600 mb-6">Manage and track customer orders</p>
						<div className="text-center py-12">
							<ShoppingCart className="mx-auto text-gray-300" size={48} />
							<p className="mt-3 text-gray-500">No orders yet</p>
							<p className="text-sm text-gray-400">Orders will appear here once customers start purchasing</p>
						</div>
					</div>
				)}

				{activeTab === "users" && (
					<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<h2 className="text-2xl font-bold text-gray-900 mb-2">Users</h2>
						<p className="text-gray-600 mb-6">Manage customer accounts and permissions</p>
						<div className="text-center py-12">
							<Users className="mx-auto text-gray-300" size={48} />
							<p className="mt-3 text-gray-500">No users found</p>
							<p className="text-sm text-gray-400">User accounts will appear here</p>
						</div>
					</div>
				)}
			</main>

			{/* Confirm Modal */}
			{showModal &&
				createPortal(
					<ConfirmFeaturedProduct
						selectedProduct={selectedProduct}
						setShowModal={setShowModal}
						confirmFeaturedChange={confirmFeaturedChange}
					/>,
					document.body
				)}

			{showCreateProductModal &&
				createPortal(
					<CreateProductModal
						showCreateProductModal={showCreateProductModal}
						onClose={() => setShowCreateProductModal(false)}
						onSubmit={(form: any) => handleAddProduct(form)}
						form={form}
						setForm={setForm}
						file={file}
						setFile={setFile}
					/>,
					document.body
				)}
		</div>
	);
};

export default AdminPage;
