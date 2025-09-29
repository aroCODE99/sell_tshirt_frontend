import {ShoppingCart, Search, Filter, Download, MoreVertical, Eye, Truck, Clock, CheckCircle, XCircle} from "lucide-react";
import {useGetAllOrders} from "../../hooks/Queries";
import type {ordersType} from "../../types/OrdersType";
import {useState} from "react";
import {ClipLoader} from "react-spinners";
import {Link} from "react-router-dom";

const ShowOrders = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
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

	const getTotalItems = (orderProducts: any[]) => {
		return orderProducts.reduce((total, product) => total + product.quantity, 0);
	};

	const getOrderStatus = (trackingDetails: any) => {
		return trackingDetails?.status || 'Pending';
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
			case 'shipped': return <Truck size={16} className="text-blue-500" />;
			case 'cancelled': return <XCircle size={16} className="text-red-500" />;
			default: return <Clock size={16} className="text-yellow-500" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'delivered': return "bg-green-50 text-green-700 border-green-200";
			case 'shipped': return "bg-blue-50 text-blue-700 border-blue-200";
			case 'cancelled': return "bg-red-50 text-red-700 border-red-200";
			default: return "bg-yellow-50 text-yellow-700 border-yellow-200";
		}
	};

	const handlePageChange = (pageNum: number) => {
		setCurrentPage(pageNum);
	};

	// Filter orders based on search and status
	const filteredOrders = orders?.content?.filter((order: ordersType) => {
		const matchesSearch = order.id.toString().includes(searchTerm.toLowerCase()) ||
			order.orderProducts.some((product: any) =>
				product.product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		const matchesStatus = statusFilter === "all" ||
			getOrderStatus(order.trackingDetails).toLowerCase() === statusFilter;

		return matchesSearch && matchesStatus;
	}) || [];

	if (isLoading) {
		return (
			<div className="h-screen flex flex-1 justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100">
				<div className="text-center">
					<ClipLoader size={50} color="#3B82F6" />
					<p className="mt-4 text-slate-600 font-medium">Loading orders...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
				<div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center max-w-md">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<XCircle className="text-red-500" size={32} />
					</div>
					<h2 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Orders</h2>
					<p className="text-slate-600 mb-6">Please check your connection and try again.</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<div className="mb-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
								Order Management
							</h1>
							<p className="text-slate-600 mt-2">Manage and track customer orders efficiently</p>
						</div>
					</div>

					{/* Search and Filter Bar */}
					<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{/* Search Input */}
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
								<input
									type="text"
									placeholder="Search orders or products..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							{/* Status Filter */}
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="all">All Status</option>
								<option value="pending">Pending</option>
								<option value="shipped">Shipped</option>
								<option value="delivered">Delivered</option>
								<option value="cancelled">Cancelled</option>
							</select>

						</div>
					</div>
				</div>

				{/* Orders Grid */}
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
					{filteredOrders.length > 0 ? (
						filteredOrders.map((order: ordersType) => (
							<div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
								<div className="p-6">
									{/* Order Header */}
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
												<ShoppingCart size={20} className="text-white" />
											</div>
											<div>
												<h3 className="font-bold text-slate-900">Order #{order.id}</h3>
												<p className="text-sm text-slate-500">
													{formatDate(order.orderDate)}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(getOrderStatus(order.trackingDetails))}`}>
												{getStatusIcon(getOrderStatus(order.trackingDetails))}
												{getOrderStatus(order.trackingDetails)}
											</span>
											<button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
												<MoreVertical size={16} className="text-slate-400" />
											</button>
										</div>
									</div>

									{/* Order Details */}
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div className="text-center p-3 bg-slate-50 rounded-lg">
											<div className="text-2xl font-bold text-slate-900">{getTotalItems(order.orderProducts)}</div>
											<div className="text-xs text-slate-500">Total Items</div>
										</div>
										<div className="text-center p-3 bg-slate-50 rounded-lg">
											<div className="text-2xl font-bold text-slate-900">₹{order.totalAmount}</div>
											<div className="text-xs text-slate-500">Total Amount</div>
										</div>
									</div>

									{/* Products Preview */}
									<div className="mb-4">
										<h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
											Products
											<span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
												{order.orderProducts.length} items
											</span>
										</h4>
										<div className="flex flex-wrap gap-2">
											{order.orderProducts.slice(0, 3).map((product, index) => (
												<span key={index} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">
													{product.product.name} × {product.quantity}
												</span>
											))}
											{order.orderProducts.length > 3 && (
												<span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm">
													+{order.orderProducts.length - 3} more
												</span>
											)}
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex items-center justify-between pt-4 border-t border-slate-100">
										<span className="text-sm text-slate-500">
											Updated {formatDate(order.updatedAt)}
										</span>
										<Link to={`/orders/track/${order.id}`}>
											<button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
												<Eye size={16} />
												View Details
											</button>
										</Link>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
							<div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<ShoppingCart className="text-slate-300" size={40} />
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
							<p className="text-slate-600 mb-6">
								{searchTerm || statusFilter !== "all"
									? "Try adjusting your search or filter criteria"
									: "Orders will appear here once customers start purchasing"
								}
							</p>
							{(searchTerm || statusFilter !== "all") && (
								<button
									onClick={() => {setSearchTerm(""); setStatusFilter("all");}}
									className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
								>
									Clear filters
								</button>
							)}
						</div>
					)}
				</div>

				{/* Pagination */}
				{orders && orders.totalPages > 1 && (
					<div className="flex justify-center items-center mt-8 pt-6 border-t border-slate-200">
						<div className="flex items-center gap-1 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
							{/* Previous Button */}
							<button
								onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
								disabled={currentPage === 0}
								className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
							>
								←
							</button>

							{/* Page Numbers */}
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
										className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === pageNum
											? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
											: 'text-slate-600 hover:bg-slate-100'
											}`}
									>
										{pageNum + 1}
									</button>
								);
							})}

							{/* Next Button */}
							<button
								onClick={() => handlePageChange(Math.min(orders.totalPages - 1, currentPage + 1))}
								disabled={currentPage === orders.totalPages - 1}
								className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
							>
								→
							</button>
						</div>
					</div>
				)}

				{/* Stats Footer */}
				{filteredOrders.length > 0 && (
					<div className="mt-6 text-center">
						<p className="text-slate-500 text-sm">
							Showing {filteredOrders.length} of {orders?.totalElements || 0} orders
						</p>
					</div>
				)}
			</div>
		</div >
	);
};

export default ShowOrders;
