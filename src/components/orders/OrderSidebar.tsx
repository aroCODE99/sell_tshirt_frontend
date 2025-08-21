import dayjs from "dayjs";
import type {ordersType} from "../../types/OrdersType";
import {AnimatePresence, motion} from "framer-motion";
import {
	X,
	Package,
	MapPin,
	Phone,
	Calendar,
	Truck,
	CheckCircle,
	Clock,
	CreditCard,
	ArrowRight
} from "lucide-react";
import {Link} from "react-router-dom";

const OrderSidebar = ({
	selectedOrder,
	setSelectedOrder,
}: {
	selectedOrder: ordersType | null;
	setSelectedOrder: React.Dispatch<React.SetStateAction<ordersType | null>>;
}) => {
	// Define status colors
	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'delivered': return 'bg-green-100 text-green-800';
			case 'shipped': return 'bg-blue-100 text-blue-800';
			case 'processing': return 'bg-amber-100 text-amber-800';
			case 'cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	// Define status steps for visual timeline
	const statusSteps = [
		{key: 'ordered', label: 'Order Placed', icon: CheckCircle},
		{key: 'confirmed', label: 'Confirmed', icon: CheckCircle},
		{key: 'shipped', label: 'Shipped', icon: Truck},
		{key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck},
		{key: 'delivered', label: 'Delivered', icon: CheckCircle},
	];

	// Find current status index
	const currentStatusIndex = selectedOrder ?
		statusSteps.findIndex(step =>
			selectedOrder.trackingDetails?.status?.toLowerCase().includes(step.key)
		) : -1;

	return (
		<AnimatePresence>
			{selectedOrder && (
				<div className="fixed inset-0 z-99 flex justify-end max-w-8xl">
					{/* Overlay */}
					<motion.div
						className="absolute inset-0 bg-black/30 backdrop-blur-sm"
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: 0.3}}
						onClick={() => setSelectedOrder(null)}
					/>

					{/* Sidebar */}
					<motion.div
						initial={{x: "100%"}}
						animate={{x: 0}}
						exit={{x: "100%"}}
						transition={{type: "spring", damping: 25, stiffness: 200}}
						className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto"
					>
						{/* Header */}
						<div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-99">
							<h2 className="text-xl font-bold text-gray-900">
								Order #{selectedOrder.id}
							</h2>
							<button
								onClick={() => setSelectedOrder(null)}
								className="p-2 rounded-full hover:bg-gray-100 transition-colors"
							>
								<X size={20} className="text-gray-500" />
							</button>
						</div>

						<div className="p-6 space-y-6">
							{/* Order Summary */}
							<div className="bg-blue-50 rounded-xl p-4">
								<h3 className="font-semibold text-blue-900 mb-2">Order Summary</h3>
								<div className="grid grid-cols-2 gap-2 text-sm">
									<div className="flex items-center gap-2 text-blue-700">
										<Calendar size={16} />
										<span>{dayjs(selectedOrder.orderDate).format("DD MMM YYYY")}</span>
									</div>
									<div className="flex items-center gap-2 text-blue-700">
										<CreditCard size={16} />
										<span>₹{selectedOrder.totalAmount}</span>
									</div>
								</div>
							</div>

							{/* Tracking Status */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
									<Truck size={20} className="text-blue-600" /> Delivery Status
								</h3>

								<div className="bg-gray-50 rounded-xl p-4 mb-4">
									<div className="flex items-center justify-between mb-2">
										<span className="font-medium text-gray-700">Current Status</span>
										<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.trackingDetails?.status)}`}>
											{selectedOrder.trackingDetails?.status}
										</span>
									</div>

									{/* Timeline */}
									<div className="mt-4 relative">
										<div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

										{statusSteps.map((step, index) => {
											const StatusIcon = step.icon;
											const isCompleted = index <= currentStatusIndex;
											const isCurrent = index === currentStatusIndex;

											return (
												<div key={step.key} className="relative flex items-center gap-3 mb-4 last:mb-0">
													<div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'
														}`}>
														<StatusIcon size={14} className={isCompleted ? 'text-white' : 'text-gray-500'} />
													</div>
													<span className={`text-sm ${isCompleted ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
														{step.label}
													</span>
												</div>
											);
										})}
									</div>

									<div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
										<Clock size={14} />
										Updated: {dayjs(selectedOrder.trackingDetails?.updatedAt).format("DD MMM YYYY, hh:mm A")}
									</div>
								</div>
							</div>

							{/* Shipping Address */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
									<MapPin size={20} className="text-blue-600" /> Shipping Address
								</h3>

								<div className="bg-gray-50 rounded-xl p-4">
									<div className="space-y-2 text-gray-700">
										<p className="font-medium">{selectedOrder.trackingDetails?.addresses?.name}</p>
										<p>{selectedOrder.trackingDetails?.addresses?.streetName}</p>
										<p>{selectedOrder.trackingDetails?.addresses?.landmark}</p>
										<p>{selectedOrder.trackingDetails?.addresses?.city}, {selectedOrder.trackingDetails?.addresses?.postalCode}</p>
										<p>{selectedOrder.trackingDetails?.addresses?.country}</p>

										<div className="flex items-center gap-2 pt-2 mt-2 border-t border-gray-200">
											<Phone size={16} className="text-gray-500" />
											<span>{selectedOrder.trackingDetails?.addresses?.phoneNumber}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Products */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
									<Package size={20} className="text-blue-600" /> Order Items
								</h3>

								<div className="space-y-3">
									{selectedOrder.orderProducts.map((p) => (
										<div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
												{p.product.imgPath ? (
													<img
														src={p.product.imgPath}
														alt={p.product.name}
														className="w-full h-full object-cover"
													/>
												) : (
													<Package size={20} className="text-gray-400" />
												)}
											</div>
											<div className="flex-1 min-w-0">
												<p className="font-medium text-gray-900 truncate">{p.product.name}</p>
												<p className="text-sm text-gray-600">Qty: {p.quantity}</p>
											</div>
											<div className="text-right">
												<p className="font-medium text-gray-900">₹{p.product.price * p.quantity}</p>
												<p className="text-xs text-gray-600">₹{p.product.price} each</p>
											</div>
										</div>
									))}

									<div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
										<span className="font-medium text-gray-700">Total</span>
										<span className="font-bold text-gray-900">₹{selectedOrder.totalAmount}</span>
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100">
								<Link to={`/orders/track/${selectedOrder.id}`}>
									<button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
									View Full Tracking <ArrowRight size={16} />
								</button>
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default OrderSidebar;
