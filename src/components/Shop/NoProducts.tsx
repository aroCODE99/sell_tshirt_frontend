import { MdProductionQuantityLimits } from "react-icons/md";

const NoProducts = () => {
	return (
		<div className="flex flex-col justify-center items-center h-[70vh] text-center px-4">
			<MdProductionQuantityLimits className="text-[6rem] text-gray-400 mb-4" />
			<h2 className="text-3xl font-semibold text-gray-700 mb-2">No Products Found</h2>
			<p className="text-gray-500 mb-4">
				Sorry, we couldn't find any products matching your selection.
			</p>
		</div>
	);
};

export default NoProducts;

