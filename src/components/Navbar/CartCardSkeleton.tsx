const CartCardSkeleton = () => {
	return (
		<div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm animate-pulse">
			<div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0" />

			<div className="flex flex-col flex-grow gap-2">
				<div className="h-4 w-3/4 bg-gray-200 rounded" />
				<div className="h-3 w-1/3 bg-gray-200 rounded" />
			</div>

			<div className="w-6 h-6 bg-gray-200 rounded" />
		</div>
	);
};

export default CartCardSkeleton;

