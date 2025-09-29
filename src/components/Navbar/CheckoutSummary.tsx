import {HiOutlineLocationMarker, HiOutlineTruck} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {useGetAddresses, useRecentOrder} from "../../hooks/Queries";
import {ClipLoader} from "react-spinners";
import {useMemo, useState} from "react";
import AddressSidebar from "../PaymentFlow/AddressSidebar";
import {createPortal} from "react-dom";
import AddressFormModal from "../PaymentFlow/AddressFormModal";
import {useAuth} from "../../contexts/AuthContext";
import {API} from "../../utilities/axiosInterceptor";
import {useRazorpay, type RazorpayOrderOptions} from "react-razorpay";
import ServerError from "../ServerError";
import type {addressType} from "../../types/UserType";
import {toast} from "react-toastify";

export default function CheckoutSummary() {
	const {data: userAddresses = [], isLoading, error: apiError} = useGetAddresses();
	const {data: item} = useRecentOrder(); // which is using the recentOrder
	const {auth} = useAuth();
	const [showAddressSidebar, setShowAddressSidebar] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);

	const [selectedAddress, setSelectedAddress] = useState<addressType | undefined>();
	const {error, isLoading: razorpayLoading, Razorpay} = useRazorpay();

	const convenienceFee = 20;

	useMemo(() => {
		if (userAddresses.length >= 1) setSelectedAddress(userAddresses?.[0]); // it will prevent the un-necessary re-renders
	}, [userAddresses])

	const address = selectedAddress || userAddresses?.[0]; // fallback to first address
	const navigate = useNavigate();

	const handlePayment = async () => {
		if (selectedAddress) {
			const res = await API.post(`/api/payment/create-order?amount=${item?.totalAmount + convenienceFee}`);
			const order = res.data;

			var options: RazorpayOrderOptions = {
				"key": import.meta.env.VITE_RZP_KEY,
				"amount": order.amount,
				"currency": order.currency,
				"name": "DripUK",
				"description": "Payment for your product",
				"order_id": order.id,
				"handler": async (res) => {
					const data = {
						selectedAddressId: selectedAddress?.id,
						userOrderId: item?.id,
						orderCreationId: order.id,
						razorpayPaymentId: res.razorpay_payment_id,
						razorpayOrderId: res.razorpay_order_id,
						razorpaySignature: res.razorpay_signature,
					};

					await API.post(`${import.meta.env.VITE_API_URL}/api/payment/callback`, data)
					navigate("/orders");
				},
				"prefill": {
					"name": auth.username,
					"email": auth.userEmail,
				}
			};

			const razorPayInstance = new Razorpay(options);
			razorPayInstance.open();
		} else {
			toast.warn("plz select the address");
		}
	}


	if (apiError?.message === "SERVER_ERROR") {
		return <ServerError />
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<ClipLoader />
			</div>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen py-8 px-4 md:px-10 lg:px-20 relative">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* LEFT COLUMN */}
				<div className="lg:col-span-2 space-y-8">

					{/* Delivery Address */}
					<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
						<div className="flex items-start gap-3 mb-4">
							<HiOutlineLocationMarker className="text-xl text-gray-700 mt-1" />
							<div>
								<h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
								<p className="text-sm text-gray-500">
									We will deliver your order to this address
								</p>
							</div>
						</div>

						{!address ?
							<div
								onClick={() => setShowAddressForm(true)}
								className="text-gray-600 italic cursor-pointer hover:underline">Please add a delivery address to continue</div> :
							<div className="flex justify-between items-start">
								<div>
									<p className="font-medium text-gray-900">
										{address?.name}
										{address?.addressType && (
											<span className="ml-2 px-2 py-0.5 text-xs border border-gray-300 rounded">
												{address?.addressType}
											</span>
										)}
									</p>
									<p className="text-sm font-semibold mt-1">Default</p>
									<p className="text-sm text-gray-700 mt-1">
										{[address?.streetName, address?.landmark, address?.city, address?.country, address?.postalCode]
											.filter(Boolean)
											.join(", ")}
									</p>
									<p className="text-sm font-medium mt-1">
										Phone: {address?.phoneNumber}
									</p>
									<button
										onClick={() => setShowAddressSidebar(true)}
										className="mt-3 text-blue-600 text-sm font-medium hover:underline cursor-pointer"
									>
										Change Address
									</button>
								</div>

								<div className="border border-dashed border-gray-300 rounded-lg px-4 py-2 text-center">
									<p className="text-green-600 text-sm font-semibold">
										Cash on delivery available
									</p>
									<p className="text-sm mt-1">
										Est Delivery{" "}
										<span className="font-bold">{item?.estimatedDeliveryDate || "22 Aug"}</span>
									</p>
								</div>
							</div>

						}
					</div>

					{/* Expected Delivery */}
					<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
						<div className="flex items-start gap-3 mb-4">
							<HiOutlineTruck className="text-xl text-gray-700 mt-1" />
							<div>
								<h2 className="text-lg font-semibold text-gray-900">Expected Delivery</h2>
								<p className="text-sm text-gray-500">
									Estimated delivery dates for your order
								</p>
							</div>
						</div>

						{item?.orderProducts?.map((product) => (
							<div key={product.id} className="flex items-center gap-4 mb-3">
								<img
									src={`${product.product.imgPath || "../../../public/ArgentinaJerse/argentinaJersey.avif"}`}
									alt={product.product.name}
									className="w-16 h-16 rounded object-cover"
								/>
								<div>
									<p className="text-sm font-bold">22 Aug</p>
									<p className="text-xs text-gray-500">{product.product.name}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* RIGHT COLUMN */}
				<div>
					<div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
						{/* Offer */}
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
							<p className="text-sm font-medium text-blue-900">
								You are earning{" "}
								<span className="font-bold">₹{item?.superCash || 0} SuperCash!</span>{" "}
								Amount will be credited after 15 days of delivery.{" "}
								<a href="#" className="text-blue-600 underline">
									Know More
								</a>
							</p>
						</div>

						{/* Order Details */}
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between items-center">
								<span>
									Convenience Fee{" "}
									<span className="group relative text-blue-500 text-xs cursor-pointer">
										What's this?
										{/* Tooltip */}
										<span className="absolute bottom-full left-0 mb-1 w-48 bg-white text-black text-[14px] rounded-lg border border-gray-200 shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
											This is a small service charge to help us maintain our platform and improve services.
										</span>
									</span>
								</span>
								<span>₹{convenienceFee}</span>
							</div>
							<div className={`flex justify-between text-black ${item?.totalAmount >= 2000 && "line-through"}`}>
								<span>Delivery Fee</span>
								<span>₹99</span>
							</div>
						</div>

						<hr className="my-4" />

						{/* Total */}
						<div className="flex justify-between font-bold text-lg">
							<span>Order Total</span>
							<span>₹{item?.totalAmount.toFixed(2)}</span>
						</div>

						{/* CTA */}
						<button
							onClick={() => handlePayment()}
							className="mt-6 w-full py-3 bg-black hover:bg-slate-800 text-white rounded-lg font-semibold transition"
						>
							Proceed to Payment
						</button>
					</div>
				</div>
			</div>

			{/* Address Sidebar */}
			{showAddressSidebar && (
				<div className="fixed inset-0 bg-black/50 z-99 flex justify-end">
					<AddressSidebar
						selectedAddress={selectedAddress}
						setShowAddressSidebar={setShowAddressSidebar}
						setSelectedAddress={setSelectedAddress}
						setShowAddressForm={setShowAddressForm}
					/>
				</div>
			)}

			{showAddressForm && createPortal(<AddressFormModal setShowAddressForm={setShowAddressForm} setShowAddressSidebar={setShowAddressSidebar} />, document.body)}
		</div>
	);
}

