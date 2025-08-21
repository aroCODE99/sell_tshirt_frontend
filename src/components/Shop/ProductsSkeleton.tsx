import ProductCardSkeleton from "./ProductCardSkeleton";

const MainDisplayProductsSkeleton = () => {
	return (
		<div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
			{ Array.from({ length: 10 }).map(_ => (
				<ProductCardSkeleton />
			))}
		</div> 

	);
};

export default MainDisplayProductsSkeleton;
