import {useState} from "react";
import {Search, Filter} from "lucide-react";
import {useCreateProduct, useMakeFeatureProduct, useProducts, useUpdateProduct} from "../../hooks/Queries";
import {createPortal} from "react-dom";
import type {ProductsType} from "../../types/ProductsType";
import CreateProductModal from "./CreateProductModal";
import AdminSidebar from "./AdminSidebar";
import {ClipLoader} from "react-spinners";
import AdminPageHeader from "./AdminPageHeader";
import ProductsTable from "./ProductsTable";
import Modal from "../Modal";
import {useAdminContext} from "../../contexts/AdminContext";

const AdminPage = () => {
	const {data: products, isLoading} = useProducts();
	const {mutate: makeFeatureProduct} = useMakeFeatureProduct();
	const {mutate: createProduct, isPending} = useCreateProduct();
	const {mutate: updateProduct} = useUpdateProduct();

	const [showModal, setShowModal] = useState(false);

	// i think this is ok here no move to the context
	const [selectedProduct, setSelectedProduct] = useState<ProductsType | null>( 
		null
	);
	const [showCreateProductModal, setShowCreateProductModal] = useState(true);
	const [searchTerm, setSearchTerm] = useState(""); 

	const { adminState, dispatch, clearForm } = useAdminContext();
	const activeTab = adminState.activeTab;
	const form = adminState.form;

	const handleFeaturedClick = (product: ProductsType) => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const confirmFeaturedChange = () => {
		if (selectedProduct) {
			makeFeatureProduct(selectedProduct.id);
		}
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

	const handleUpdateProduct = (formData: any) => {
		updateProduct(formData);
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
			{/* Fixed this */}
			<AdminSidebar />

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
						{/* this is also fixed i guess */}
						<ProductsTable
							filteredProducts={filteredProducts}
							handleFeaturedClick={handleFeaturedClick}
							setShowCreateProductModal={setShowCreateProductModal}
						/>
					</div>
				)}

			</main>

			{/* Confirm Modal */}
			{createPortal(
				<Modal
					condition={showModal}
					title="Change Featured Status"
					description={`Do you want to ${selectedProduct?.featured ? "remove" : "mark"} ${selectedProduct?.name} as a Featured Product?`}
					onClose={() => {
						setShowModal(false)
					}}
					handleMainSubmit={confirmFeaturedChange}
				/>,
				document.body
			)}

			{/* now this has to be fixed */}
			{createPortal(
				<CreateProductModal
					showCreateProductModal={showCreateProductModal}
					onClose={() => {
						if (form.editMode) clearForm();
						setShowCreateProductModal(false)
					}}
					onSubmit={(form: any) => handleAddProduct(form)}
					onUpdate={(form: any) => handleUpdateProduct(form)}
				/>, document.body)}

		</div>
	);
};

export default AdminPage;
