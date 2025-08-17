import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useGetOrders } from "../../hooks/Queries";
import dayjs from "dayjs";

const MyOrders = () => {
	const { data: orders, isLoading } = useGetOrders();
	const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

	if (isLoading)
		return (
			<p className="min-h-screen flex items-center justify-center text-center mt-10 text-gray-500">
				<ClipLoader size={20} />
			</p>
		);

		if (!orders?.length) {
			return <p className="text-center mt-10 text-gray-500">No orders found.</p>;
		}

		return (
			<div className="min-h-screen max-w-5xl mx-auto p-4 space-y-6 relative">
				<h1 className="text-2xl font-semibold text-gray-800">My Orders</h1>

				{orders.map((order) => (
					<div
						key={order.id}
						className="bg-white rounded-xl shadow-md p-5 border border-gray-100 cursor-pointer hover:shadow-lg transition"
						onClick={() => setSelectedOrder(order)}
					>
						{/* Order Header */}
						<div className="flex justify-between items-center border-b pb-3 mb-4">
							<div>
								<p className="text-sm text-gray-500">
									Order #{order.id} • {dayjs(order.orderDate).format("DD MMM YYYY")}
								</p>
								<p className="text-lg font-semibold text-gray-800">
									Total: ₹{order.totalAmount}
								</p>
							</div>
							<span
								className={`px-3 py-1 text-xs font-medium rounded-full 
									${
										order.trackingDetails?.status === "PENDING"
											? "bg-red-400 text-white"
											: "bg-blue-100 text-blue-600"
									}`}
							>
								{order.trackingDetails?.status || "N/A"}
							</span>
						</div>

						{/* Products List */}
						<div className="flex flex-wrap gap-4">
							{order.orderProducts.map((product) => (
								<div
									key={product.id}
									className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
								>
									<img
										src={
											product.product.imgPath ||
												"../../../public/ArgentinaJerse/argentinaJersey.avif"
										}
										alt={product.product.name}
										className="w-full h-full object-cover"
									/>
								</div>
							))}
						</div>
					</div>
				))}

				{/* Sidebar Drawer */}
				{selectedOrder && (
					<div className="fixed inset-0 flex min-w-[500px] z-99">
						{/* Overlay */}
						<div
							className="flex-1 bg-black opacity-50"
							onClick={() => setSelectedOrder(null)}
						/>

						{/* Sidebar */}
						<div className="w-lg bg-white shadow-xl h-full p-6 overflow-y-auto">
							<h2 className="text-xl font-semibold mb-4">
								Tracking Details - #{selectedOrder.id}
							</h2>

							{/* Tracking Status */}
							<div className="p-4 bg-gray-100 rounded-lg mb-4">
								<p className="font-medium">
									Status: {selectedOrder.trackingDetails?.status}
								</p>
								<p className="text-sm text-gray-500">
									Updated:{" "}
									{dayjs(selectedOrder.trackingDetails?.updatedAt).format(
										"DD MMM YYYY, hh:mm A"
									)}
								</p>
							</div>

							{/* Address */}
							<div className="p-4 border rounded-lg mb-4">
								<h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
								<p>{selectedOrder.trackingDetails?.addresses?.name}</p>
								<p>{selectedOrder.trackingDetails?.addresses?.streetName}</p>
								<p>
									{selectedOrder.trackingDetails?.addresses?.city},{" "}
									{selectedOrder.trackingDetails?.addresses?.postalCode}
								</p>
								<p>{selectedOrder.trackingDetails?.addresses?.country}</p>
								<p className="text-sm text-gray-500">
									📞 {selectedOrder.trackingDetails?.addresses?.phoneNumber}
								</p>
							</div>

							{/* Products */}
							<div>
								<h3 className="text-lg font-semibold mb-2">Products</h3>
								<ul className="divide-y">
									{selectedOrder.orderProducts.map((p) => (
										<li
											key={p.id}
											className="py-2 flex justify-between items-center"
										>
											<span>
												{p.product.name} (x{p.quantity})
											</span>
											<span className="text-gray-700">
												₹{p.product.price * p.quantity}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		);
};

export default MyOrders;

