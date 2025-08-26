import {Package, Edit, Trash2, MoreVertical} from "lucide-react";
import type {ProductsType} from "../../types/ProductsType";
import {useDeleteProduct} from "../../hooks/Queries";
import {useState} from "react";
import {createPortal} from "react-dom";
import Modal from "../Modal";

type propsType = {
	filteredProducts: ProductsType[] | undefined,
	handleFeaturedClick: (product: ProductsType) => void
}

const ProductsTable = ({filteredProducts, handleFeaturedClick}: propsType) => {
	const { mutate: deleteProduct, isPending } = useDeleteProduct();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [productToDelete, setProductToDelete] = useState<number | undefined>(undefined);

	return (
		<div className="min-h-screen bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="bg-gray-50 text-sm font-medium text-gray-500 uppercase tracking-wider">
							<th className="px-6 py-4">Product</th>
							<th className="px-6 py-4">Price</th>
							<th className="px-6 py-4">Stock</th>
							<th className="px-6 py-4">Featured</th>
							<th className="px-6 py-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{filteredProducts?.map((product: ProductsType) => (
							<tr key={product.id} className="hover:bg-gray-50 transition">
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
											{product.imgPath ? (
												<img
													src={product.imgPath}
													alt={product.name}
													className="w-10 h-10 object-cover rounded-lg"
												/>
											) : (
												<Package size={18} className="text-gray-400" />
											)}
										</div>
										<div>
											<p className="font-medium text-gray-900">{product.name}</p>
											<p className="text-sm text-gray-500">ID: {product.id}</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 font-medium">₹{product.price}</td>
								<td className="px-6 py-4">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										50 in stock
									</span>
								</td>
								<td className="px-6 py-4">
									<button
										onClick={() => handleFeaturedClick(product)}
										className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${product.featured
											? "bg-blue-100 text-blue-800 hover:bg-blue-200"
											: "bg-gray-100 text-gray-800 hover:bg-gray-200"
											}`}
									>
										{product.featured ? "Featured" : "Make Featured"}
									</button>
								</td>
								<td className="px-6 py-4">
									<div className="flex justify-end gap-2">
										<button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
											<Edit size={16} />
										</button>
										<button
											onClick={() => {
												setConfirmDelete(true);
												setProductToDelete(product.id);
											}}
										   	className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
											<Trash2 size={16} />
										</button>
										<button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
											<MoreVertical size={16} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{filteredProducts?.length === 0 && (
				<div className="text-center py-12">
					<Package className="mx-auto text-gray-300" size={48} />
					<p className="mt-3 text-gray-500">No products found</p>
					<p className="text-sm text-gray-400">Try adjusting your search or filter</p>
				</div>
			)}

			{
				createPortal(
					<Modal 
						condition={confirmDelete ? true : false && productToDelete}
						title="Confirm Delete" description="Do you really want to delete this product ?" 
						onClose={() => setConfirmDelete(false)}
						handleMainSubmit={() => {
							if (productToDelete) {
							   	deleteProduct(productToDelete);
							}
						}}
					/>,
				   	document.body
				)
			}
		</div>
	);
};

export default ProductsTable;
