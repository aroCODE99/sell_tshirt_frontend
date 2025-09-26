import {ShoppingCart} from "lucide-react";
import {useGetAllOrders} from "../../hooks/Queries";
import type {ordersType} from "../../types/OrdersType";
import {useState} from "react";
import {ClipLoader} from "react-spinners";
import {QueryClient} from "@tanstack/react-query";

// TODO: do the prefetching here of the next page 
const ShowOrders = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const {data: orders, isLoading, isError} = useGetAllOrders(currentPage);

	// Format date to readable format
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// TODO: make the seperate routes for the admin/products admin/orders
	// Calculate total items in order
	const getTotalItems = (orderProducts: any[]) => {
		return orderProducts.reduce((total, product) => total + product.quantity, 0);
	};

	// Get status from tracking details
	const getOrderStatus = (trackingDetails: any) => {
		return trackingDetails?.status || 'Pending';
	};

	const handlePageChange = (pageNum: number) => {
		setCurrentPage(pageNum);
	}

	// TODO: add the searchBar and filtering for orders
	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center bg-white">
				<ClipLoader size={40} color="#3B82F6" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">Orders</h2>
				<p className="text-gray-600 mb-6">Manage and track customer orders</p>
				<div className="text-center py-12">
					<p className="text-red-500">Error loading orders. Please try again.</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">Orders</h2>
				<p className="text-gray-600 mb-6">Manage and track customer orders</p>

				{/* Orders List */}
				{orders?.content && orders.content.length > 0 ? (
					<div className="space-y-4">
						{orders.content.map((order: ordersType) => (
							<div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
								<div className="flex justify-between items-start mb-3">
									<div>
										<h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
										<p className="text-sm text-gray-500">
											Placed on {formatDate(order.orderDate)}
										</p>
									</div>
									<div className="text-right">
										<p className="font-bold text-lg text-gray-900">
											₹{order.totalAmount}
										</p>
										<span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getOrderStatus(order.trackingDetails) === 'Delivered'
											? 'bg-green-100 text-green-800'
											: getOrderStatus(order.trackingDetails) === 'Shipped'
												? 'bg-blue-100 text-blue-800'
												: getOrderStatus(order.trackingDetails) === 'Cancelled'
													? 'bg-red-100 text-red-800'
													: 'bg-yellow-100 text-yellow-800'
											}`}>
											{getOrderStatus(order.trackingDetails)}
										</span>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
									<div>
										<p className="font-medium">Items: {getTotalItems(order.orderProducts)}</p>
										<p className="text-xs text-gray-500">
											{order.orderProducts.length} product(s) in order
										</p>
									</div>
									<div>
										<p className="font-medium">Last Updated</p>
										<p className="text-xs text-gray-500">
											{formatDate(order.updatedAt)}
										</p>
									</div>
								</div>

								{/* Order Products Preview */}
								<div className="mt-3 pt-3 border-t border-gray-100">
									<h4 className="font-medium text-sm text-gray-700 mb-2">Products:</h4>
									<div className="flex flex-wrap gap-2">
										{order.orderProducts.slice(0, 3).map((product, index) => (
											<span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
												{product.product.name} × {product.quantity}
											</span>
										))}
										{order.orderProducts.length > 3 && (
											<span className="bg-gray-100 px-2 py-1 rounded text-xs">
												+{order.orderProducts.length - 3} more
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<ShoppingCart className="mx-auto text-gray-300" size={48} />
						<p className="mt-3 text-gray-500">No orders yet</p>
						<p className="text-sm text-gray-400">
							Orders will appear here once customers start purchasing
						</p>
					</div>
				)}

				{/* Pagination */}
				{orders && orders.totalPages > 1 && (
					<div className="flex justify-center items-center mt-6 pt-4 border-t border-gray-200">
						{/* what is this doing i am not even getting what is this doing */}
						<div className="flex items-center gap-2">
							{Array.from({length: Math.min(5, orders.totalPages)}, (_, i) => {
								let pageNum;
								if (orders.totalPages <= 5) {
									pageNum = i;
								} else if (currentPage <= 2) {
									pageNum = i;
								} else if (currentPage >= orders.totalPages - 3) {
									pageNum = orders.totalPages - 5 + i;
								} else {
									pageNum = currentPage - 2 + i;
								}

								return (
									<button
										key={pageNum}
										onClick={() => handlePageChange(pageNum)}
										className={`w-8 h-8 rounded-full text-sm font-medium ${currentPage === pageNum
											? 'bg-blue-600 text-white'
											: 'text-gray-600 hover:bg-gray-100'
											}`}
									>
										{pageNum + 1}
									</button>
								);
							})}

							{orders.totalPages > 5 && (
								<span className="text-gray-400 mx-1">...</span>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShowOrders;
