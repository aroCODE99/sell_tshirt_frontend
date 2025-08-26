import type {ProductsType} from "../../types/ProductsType";
import ProductCard from "./ProductCard";
import NoProducts from "./NoProducts";

const MainDisplayProducts = ({filterProducts}: {filterProducts: ProductsType[]}) => {
	if (filterProducts.length === 0) {
		return <NoProducts />
	}
	return (
		<>
			<div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
				{filterProducts?.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
};

export default MainDisplayProducts;
