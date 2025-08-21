import {Plus, Package, BarChart3} from "lucide-react";
import type {ProductsType} from "../../types/ProductsType";

type PropsType = {
	products: Record<number, ProductsType> | undefined,
	setShowCreateProductModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminPageHeader = ({products, setShowCreateProductModal}: PropsType) => {
	return (
		<>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900">Product Management</h2>
					<p className="text-gray-600 mt-1">Manage your product inventory and features</p>
				</div>
				<button
					onClick={() => setShowCreateProductModal(true)}
					className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
				>
					<Plus size={18} /> Add Product
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
					<div className="flex justify-between items-start">
						<div>
							<p className="text-sm font-medium text-gray-600">Total Products</p>
							<h3 className="text-2xl font-bold mt-1">{Object.values(products ?? {}).length}</h3>
						</div>
						<div className="p-3 bg-blue-100 rounded-lg">
							<Package className="text-blue-600" size={20} />
						</div>
					</div>
				</div>

				<div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
					<div className="flex justify-between items-start">
						<div>
							<p className="text-sm font-medium text-gray-600">Featured Products</p>
							<h3 className="text-2xl font-bold mt-1">
								{Object.values(products ?? {}).filter(p => p.featured).length}
							</h3>
						</div>
						<div className="p-3 bg-green-100 rounded-lg">
							<BarChart3 className="text-green-600" size={20} />
						</div>
					</div>
				</div>

				<div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
					<div className="flex justify-between items-start">
						<div>
							<p className="text-sm font-medium text-gray-600">Low Stock</p>
							<h3 className="text-2xl font-bold mt-1">3</h3>
						</div>
						<div className="p-3 bg-amber-100 rounded-lg">
							<Package className="text-amber-600" size={20} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminPageHeader;
