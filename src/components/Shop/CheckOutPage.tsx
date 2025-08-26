import {useState} from "react";
import {useRecentOrder} from "../../hooks/Queries";
import {RiDeleteBin6Line} from "react-icons/ri";
import FeatureSection from "./FeatureSection";
import {ClipLoader} from "react-spinners";
import {Link} from "react-router-dom";
import CouponSection from "./CouponSection";

export default function CheckOutPage() {
	const {data: recentOrder, isLoading} = useRecentOrder();
	const [couponCode, setCouponCode] = useState("");
	console.log(recentOrder?.totalAmount);

	// Dummy coupons array
	const coupons = [
		{code: "NEWUSER10", description: "Get 10% off for first-time purchase"},
		{code: "FREESHIP", description: "Free shipping on orders above ₹1000"},
		{code: "SAVE200", description: "Flat ₹200 off on orders above ₹1500"},
	];

	const [activeCoupon, setActiveCoupon] = useState("");

	const items = Object.values(recentOrder?.orderProducts ?? {});

	const subtotal = items.reduce(
		(sum, item) => sum + item.priceAtPurchase * item.quantity,
		0
	);

	const shipping = subtotal > 2000 ? 0 : 99;
	const convenienceFee = 20;

	const total = recentOrder?.orderProducts.reduce(
		(acc, op) => acc + op.product.price * op.quantity,
		0
	);

	return (
		<div className="min-h-screen bg-gray-50 py-10 px-4">
			{isLoading ? <div className="flex justify-center items-center min-h-screen"> <ClipLoader /> </div> :
				<div className="px-6 p-4">
					<div className="flex justify-between gap-8">

						{/* Left part */}
						<div className="flex-1 space-y-4">
							<div>
								<h1 className="text-2xl font-semibold">
									My Cart{" "}
									<span className="text-gray-500 italic p-1">
										({items.length} items)
									</span>
								</h1>
								<div className="border-b border-gray-400 mt-6"></div>
							</div>

							{items.map((item) => (
								<div
									key={item.id}
									className="flex items-center space-x-3 gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
								>
									<img
										src={
											item.product.imgPath ||
											"../../../public/ArgentinaJerse/argentinaJersey.avif"
										}
										alt={item.product.name}
										className="w-20 h-20 rounded-lg object-cover"
									/>
									<div className="flex-1 min-w-0">
										<h3 className="text-lg font-medium text-gray-800 truncate flex gap-2">
											{item.product.name}{" "}
											<span className="italic text-gray-500">
												({item.product.category})
											</span>
										</h3>
										<p className="text-sm text-gray-500">
											Qty: {item.quantity} | Size:{" "}
											{item.selectedSize || "N/A"}
										</p>
									</div>
									<div className="text-right">
										<p className="text-lg font-semibold text-gray-900">
											₹{(item.priceAtPurchase * item.quantity).toFixed(2)}
										</p>
										<p className="text-xs text-gray-500">
											₹{item.priceAtPurchase} each
										</p>
									</div>

									<div className="text-xl hover:text-gray-600 transition-colors">
										<RiDeleteBin6Line />
									</div>
								</div>
							))}
						</div>

						{/* Right part */}
						<div className="flex flex-col space-y-8 ">
							{/* Checkout part */}
							<div className="bg-white rounded-2xl shadow-lg p-6 self-start min-w-[400px] space-y-4">
								<h2 className="text-xl font-semibold text-gray-800 border-b pb-4">
									Order Summary
								</h2>
								<div className="mt-6 space-y-2 text-gray-700">
									<div className="flex justify-between">
										<span>Subtotal</span>
										<span>₹{subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>Shipping</span>
										<span>
											{shipping === 0 ? "Free" : `₹${shipping}`}
										</span>
									</div>
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
									<hr />
									<div className="flex justify-between text-lg font-semibold text-gray-900">
										<span>Total</span>
										<span>₹{total && (total + shipping + convenienceFee).toFixed(2)}</span>
									</div>
								</div>

								<Link to={"summary"}>
									<button className="w-full px-auto p-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors">Proceed to payment</button>
								</Link>
							</div>

							{/* coupon part */}
							<div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-10 self-start min-w-[400px] space-y-4">
								<CouponSection coupons={coupons} couponCode={couponCode} activeCoupon={activeCoupon}
									setCouponCode={setCouponCode} setActiveCoupon={setActiveCoupon} />
							</div>
						</div>
					</div>
					<FeatureSection />
				</div>
			}
		</div>
	);
}

// TODO: we could create the order when we click the checkout page
