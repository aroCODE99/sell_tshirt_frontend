const CouponSection = ({ coupons, couponCode, activeCoupon, setCouponCode, setActiveCoupon } : any) => {
	return (
		<>
			<h1 className="text-xl font-semibold">Apply Coupon</h1>

			{/* Coupon input */}
			<div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm focus-within:border-gray-500 transition-all">
				<input
					type="text"
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
					placeholder="Enter coupon code"
					className="w-full px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
				/>
				<button className="bg-black hover:bg-slate-700 text-white px-5 py-2 font-medium transition-colors">
					Apply
				</button>
			</div>

			{/* Available coupons list */}
			<div className="space-y-3">
				{coupons.map((coupon) => (
					<div
						key={coupon.code}
						className={`border border-gray-200 p-3 rounded-lg hover:border-gray-500 hover:shadow-md cursor-pointer transition-all
											${activeCoupon === coupon.code && "border-slate-500"}
										`}
						onClick={() => {
							setCouponCode(coupon.code)
							setActiveCoupon(coupon.code)
						}}
					>
						<p className="text-sm font-semibold text-gray-800">
							{coupon.code}
						</p>
						<p className="text-xs text-gray-500">
							{coupon.description}
						</p>
					</div>
				))}
			</div>
		</>
	)
};

export default CouponSection;
