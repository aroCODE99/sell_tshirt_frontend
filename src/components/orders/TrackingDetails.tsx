import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {addressType} from "../../contexts/AuthContext";

export type trackingDetailsType = {
	id: number;
	status: string;
	updatedAt: string;
	addresses: addressType;
};

export type Order = {
	id: number;
	orderDate: string;
	totalAmount: number;
	trackingDetails: trackingDetailsType;
	orderProducts: { id: number; name: string; quantity: number; price: number }[];
};

const TrackingDetailsPage = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const [order, setOrder] = useState<Order | null>(null);

	useEffect(() => {
		// Fetch order by ID from backend
		fetch(`http://localhost:8080/api/orders/${orderId}`)
			.then((res) => res.json())
		.then((data) => setOrder(data));
	}, [orderId]);

	if (!order) return <p className="text-center mt-10">Loading order details...</p>;

	const { trackingDetails } = order;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl mt-10">
			<h1 className="text-2xl font-bold mb-4">Order Tracking</h1>

			{/* Order Info */}
			<div className="mb-6">
				<p><strong>Order ID:</strong> #{order.id}</p>
				<p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
				<p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
			</div>

			{/* Tracking Status */}
			<div className="p-4 bg-gray-100 rounded-xl mb-6">
				<p className="text-lg font-semibold">📦 Status: {trackingDetails.status}</p>
				<p className="text-sm text-gray-500">Last updated: {new Date(trackingDetails.updatedAt).toLocaleString()}</p>
			</div>

			{/* Shipping Address */}
			<div className="p-4 border rounded-xl mb-6">
				<h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
				<p>{trackingDetails.addresses.name} ({trackingDetails.addresses.addressType})</p>
				<p>{trackingDetails.addresses.streetName}, {trackingDetails.addresses.landmark}</p>
				<p>{trackingDetails.addresses.city} - {trackingDetails.addresses.postalCode}, {trackingDetails.addresses.country}</p>
				<p>📞 {trackingDetails.addresses.phoneNumber}</p>
			</div>

			{/* Order Products */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Ordered Products</h2>
				<ul className="divide-y">
					{order.orderProducts.map((product) => (
						<li key={product.id} className="py-2 flex justify-between">
							<span>{product.name} (x{product.quantity})</span>
							<span>₹{product.price * product.quantity}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TrackingDetailsPage;

