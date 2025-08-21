import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
	Package,
	Calendar,
	MapPin,
	Phone,
	CreditCard,
	Truck,
	CheckCircle,
	Clock,
	ArrowLeft
} from "lucide-react";
import type {ordersType} from "../../types/OrdersType";
import ScrollToTop from "../ScrollToTop";

const TrackingDetails = () => {
	const {id} = useParams<{id: string}>();
	const [order, setOrder] = useState<ordersType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch order by ID from backend
		fetch(`http://localhost:8080/api/orders/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setOrder(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading order details...</p>
				</div>
			</div>
		);
	}

	if (!order) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
					<Package className="mx-auto text-gray-400 h-16 w-16 mb-4" />
					<h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
					<p className="text-gray-600 mb-6">We couldn't find an order with ID #{orderId}</p>
					<button
						onClick={() => window.history.back()}
						className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<ArrowLeft size={18} /> Go Back
					</button>
				</div>
			</div>
		);
	}

	const {trackingDetails} = order;

	// Define status steps for visual timeline
	const statusSteps = [
		{key: 'ordered', label: 'Order Placed', icon: CheckCircle},
		{key: 'confirmed', label: 'Confirmed', icon: CheckCircle},
		{key: 'shipped', label: 'Shipped', icon: Truck},
		{key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck},
		{key: 'delivered', label: 'Delivered', icon: CheckCircle},
	];

	// Find current status index
	const currentStatusIndex = statusSteps.findIndex(step => {
		console.log(trackingDetails)
		if (trackingDetails.status) return trackingDetails.status.toLowerCase().includes(step.key)
	});

	return (
		<>
			<ScrollToTop />
			<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Header with back button */}
					<div className="mb-6">
						<button
							onClick={() => window.history.back()}
							className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
						>
							<ArrowLeft size={20} /> Back to Orders
						</button>
						<h1 className="text-3xl font-bold text-gray-900">Order Tracking</h1>
						<p className="text-gray-600 mt-1">Track your order #{order.id}</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Main content - 2/3 width */}
						<div className="lg:col-span-2 space-y-6">
							{/* Order Status Card */}
							<div className="bg-white rounded-xl shadow-sm p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<Package className="text-blue-600" /> Order Status
								</h2>

								{/* Status Timeline */}
								<div className="mb-6">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-gray-700">Current Status:</span>
										<span className={`px-3 py-1 rounded-full text-xs font-medium ${trackingDetails.status === 'Delivered'
											? 'bg-green-100 text-green-800'
											: 'bg-blue-100 text-blue-800'
											}`}>
											{trackingDetails.status}
										</span>
									</div>

									<div className="flex items-center justify-between mt-4 relative">
										{/* Timeline progress bar */}
										<div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
										<div
											className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 transition-all duration-500"
											style={{width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`}}
										></div>

										{/* Timeline steps */}
										{statusSteps.map((step, index) => {
											const StatusIcon = step.icon;
											const isCompleted = index <= currentStatusIndex;
											const isCurrent = index === currentStatusIndex;

											return (
												<div key={step.key} className="relative z-10">
													<div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'
														}`}>
														<StatusIcon size={16} className={isCompleted ? 'text-white' : 'text-gray-500'} />
													</div>
													<p className={`text-xs mt-1 text-center whitespace-nowrap ${isCompleted ? 'text-blue-600 font-medium' : 'text-gray-500'
														}`}>
														{step.label}
													</p>
												</div>
											);
										})}
									</div>
								</div>

								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Clock size={16} />
									Last updated: {new Date(trackingDetails.updatedAt).toLocaleString()}
								</div>
							</div>

							{/* Order Items Card */}
							<div className="bg-white rounded-xl shadow-sm p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
								<div className="divide-y divide-gray-100">
									{order.orderProducts.map((op) => (
										<div key={op.product.id} className="py-4 first:pt-0 last:pb-0 flex items-center">
											<div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-4">
												{op.product.imgPath ? (
													<img
														src={op.product.imgPath}
														alt={op.product.name}
														className="w-full h-full object-cover"
													/>
												) : (
													<Package className="text-gray-400" size={24} />
												)}
											</div>
											<div className="flex-1">
												<h3 className="font-medium text-gray-900">{op.product.name}</h3>
												<p className="text-sm text-gray-600">Quantity: {op.quantity}</p>
											</div>
											<div className="text-right">
												<p className="font-medium text-gray-900">₹{op.product.price * op.quantity}</p>
												<p className="text-sm text-gray-600">₹{op.product.price} each</p>
											</div>
										</div>
									))}
								</div>

								<div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
									<span className="text-gray-600">Total</span>
									<span className="text-xl font-bold text-gray-900">₹{order.totalAmount}</span>
								</div>
							</div>
						</div>

						{/* Sidebar - 1/3 width */}
						<div className="space-y-6">
							{/* Order Summary Card */}
							<div className="bg-white rounded-xl shadow-sm p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

								<div className="space-y-3">
									<div className="flex items-center gap-2 text-gray-600">
										<Calendar size={18} />
										<span>{new Date(order.orderDate).toLocaleDateString()}</span>
									</div>

									<div className="flex items-center gap-2 text-gray-600">
										<CreditCard size={18} />
										<span>Paid with {}</span>
									</div>

									<div className="pt-3 border-t border-gray-100">
										<p className="text-sm font-medium text-gray-700">Order ID</p>
										<p className="text-gray-900 font-mono">#{order.id}</p>
									</div>
								</div>
							</div>

							{/* Shipping Address Card */}
							<div className="bg-white rounded-xl shadow-sm p-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<MapPin className="text-blue-600" /> Shipping Address
								</h2>

								<div className="space-y-2 text-gray-700">
									<p className="font-medium">{trackingDetails.addresses.name}</p>
									<p>{trackingDetails.addresses.streetName}</p>
									<p>{trackingDetails.addresses.landmark}</p>
									<p>{trackingDetails.addresses.city}, {trackingDetails.addresses.postalCode}</p>
									<p>{trackingDetails.addresses.country}</p>

									<div className="flex items-center gap-2 pt-2 mt-2 border-t border-gray-100">
										<Phone size={16} className="text-gray-500" />
										<span>{trackingDetails.addresses.phoneNumber}</span>
									</div>
								</div>
							</div>

							{/* Support Card */}
							<div className="bg-blue-50 rounded-xl shadow-sm p-6">
								<h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
								<p className="text-blue-700 text-sm mb-4">If you have any questions about your order, contact our support team.</p>
								<button className="w-full bg-white text-blue-700 border border-blue-200 rounded-lg py-2.5 text-sm font-medium hover:bg-blue-100 transition-colors">
									Contact Support
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TrackingDetails;
