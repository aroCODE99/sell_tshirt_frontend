import { FaCartPlus } from "react-icons/fa";

const ProductCardSkeleton = () => {
	return (
		<div className="min-w-[350px] rounded-xl shadow-md bg-white overflow-hidden border border-gray-200 h-[460px] flex flex-col justify-between animate-pulse">
			<div className="w-full h-[240px] bg-gray-200" />

			<div className="p-4 flex-grow space-y-3">
				<div className="h-6 bg-gray-200 rounded w-3/4" /> {/* title */}
				<div className="h-5 bg-gray-200 rounded w-1/4" /> {/* price */}
				<div className="h-4 bg-gray-200 rounded w-1/2" /> {/* category */}
				<div className="h-4 bg-gray-200 rounded w-1/3" /> {/* color */}
			</div>

			<div className="px-4 pb-4 flex gap-4">
				<div className="w-full px-4 py-2 bg-gray-200 rounded-lg h-[42px]" /> {/* add to cart */}
				<div className="px-4 py-2 bg-gray-200 rounded-lg h-[42px] w-[70px]" /> {/* edit button */}
			</div>
		</div>
	);
};

export default ProductCardSkeleton;

