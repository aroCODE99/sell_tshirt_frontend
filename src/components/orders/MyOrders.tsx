import {useMemo, useState} from "react";
import {ClipLoader} from "react-spinners";
import {useGetOrders} from "../../hooks/Queries";
import dayjs from "dayjs";
import type {orderProductType, ordersType} from "../../types/OrdersType";
import OrderSidebar from "./OrderSidebar";
import { GiConfirmed } from "react-icons/gi";
import {
	Calendar,
	ChevronRight,
	Search,
	Truck,
	CheckCircle,
	Clock,
	AlertCircle
} from "lucide-react";
import NoOrders from "./NoOrders";

const MyOrders = () => {
	let {data: orders, isLoading} = useGetOrders();
	const [selectedOrder, setSelectedOrder] = useState<ordersType | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	orders = useMemo(() => {
		if (orders) {
			return orders.sort((a, b) => b.id - a.id)
		}
	}, [orders])

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex-1">
				<div className="text-center">
					<ClipLoader size={40} color="#3B82F6" />
					<p className="mt-4 text-gray-600">Loading your orders...</p>
				</div>
			</div>
		);
	}

	if (!orders?.length) {
		return <NoOrders />
	}

	// Filter orders based on search and status
	const filteredOrders = orders.filter((order: ordersType) => {
		const matchesSearch = order.id.toString().includes(searchTerm) ||
			order.orderProducts.some(op =>
				op.product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);

		const matchesStatus = statusFilter === "all" ||
			order.trackingDetails?.status?.toLowerCase() === statusFilter.toLowerCase();

		return matchesSearch && matchesStatus;
	});

	// Get status count for filter options
	const statusCounts = {
		all: orders.length,
		placed: orders.filter(order => order.trackingDetails?.status?.toLowerCase() === "placed").length,
		pending: orders.filter(order => order.trackingDetails?.status?.toLowerCase() === "pending").length,
		shipped: orders.filter(order => order.trackingDetails?.status?.toLowerCase() === "shipped").length,
		delivered: orders.filter(order => order.trackingDetails?.status?.toLowerCase() === "delivered").length,
	};

	// Status icon and color mapping
	const getStatusDetails = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'delivered':
				return {icon: CheckCircle, color: 'bg-green-100 text-green-800', border: 'border-green-200'};
			case 'shipped':
				return {icon: Truck, color: 'bg-blue-100 text-blue-800', border: 'border-blue-200'};
			case 'order_confirmed':
				return {icon: GiConfirmed, color: 'bg-green-100 text-green-800', border: 'border-blue-200'};
			case 'pending':
				return {icon: Clock, color: 'bg-amber-100 text-amber-800', border: 'border-amber-200'};
			default:
				return {icon: AlertCircle, color: 'bg-gray-100 text-gray-800', border: 'border-gray-200'};
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
					<p className="text-gray-600">View and manage your order history</p>
				</div>

				{/* Search and Filter */}
				<div className="bg-white rounded-xl shadow-sm p-5 mb-6">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
							<input
								type="text"
								placeholder="Search by order ID or product name..."
								className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							{Object.entries(statusCounts).map(([status, count]) => (
								<button
									key={status}
									onClick={() => setStatusFilter(status)}
									className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === status
										? 'bg-blue-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
										}`}
								>
									{status.charAt(0).toUpperCase() + status.slice(1)} ({count})
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Orders List */}
				<div className="space-y-4">
					{filteredOrders.length === 0 ? (
						<div className="bg-white rounded-xl shadow-sm p-8 text-center">
							<Search className="mx-auto text-gray-400 h-12 w-12 mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
							<p className="text-gray-600">Try adjusting your search or filter criteria</p>
						</div>
					) : (
						filteredOrders.map((order) => {
							const StatusIcon = getStatusDetails(order.trackingDetails?.status).icon;
							const statusColor = getStatusDetails(order.trackingDetails?.status).color;
							const statusBorder = getStatusDetails(order.trackingDetails?.status).border;

							return (
								<div
									key={order.id}
									className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer"
									onClick={() => setSelectedOrder(order)}
								>
									<div className="p-5 border-b border-gray-100">
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<div>
												<div className="flex items-center gap-2 mb-1">
													<span className="text-sm font-medium text-gray-500">Order #{order.id}</span>
													<span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
														<StatusIcon size={12} />
														{order.trackingDetails?.status || "N/A"}
													</span>
												</div>
												<p className="text-lg font-semibold text-gray-900">₹{order.totalAmount}</p>
											</div>

											<div className="flex items-center gap-4 text-sm text-gray-600">
												<div className="flex items-center gap-1">
													<Calendar size={16} />
													<span>{dayjs(order.orderDate).format("DD MMM YYYY")}</span>
												</div>
												<ChevronRight size={18} className="text-gray-400" />
											</div>
										</div>
									</div>

									<div className="p-5">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div className="flex -space-x-2">
												{order.orderProducts.slice(0, 4).map((product: orderProductType, index: number) => (
													<div
														key={product.id}
														className="relative w-12 h-12 rounded-lg border-2 border-white overflow-hidden shadow-sm"
														style={{zIndex: 5 - index}}
													>
														<img
															src={
																product.product.imgPath || "/placeholder-product.jpg"
															}
															alt={product.product.name}
															className="w-full h-full object-cover"
														/>
														{index === 3 && order.orderProducts.length > 4 && (
															<div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium">
																+{order.orderProducts.length - 4}
															</div>
														)}
													</div>
												))}
											</div>

											<div className="text-sm text-gray-600">
												{order.orderProducts.length} item{order.orderProducts.length !== 1 ? 's' : ''}
											</div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>

			{/* Order Details Sidebar */}
			<OrderSidebar selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
		</div>
	);
};

export default MyOrders;
