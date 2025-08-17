import { useMemo } from "react";
import {useFilters} from "../../contexts/FilterContext.tsx";
import { useProducts } from "../../hooks/Queries.tsx";
import FilterSideBar from "./FilterSideBar";
import NoProducts from "./NoProducts.tsx";
import ProductCard from "./ProductCard";
import { ClipLoader } from "react-spinners";
import CartSideBar from "../Navbar/CartSideBar.tsx";
import {useCartContext} from "../../contexts/CartContext.tsx";
import ServerError from "../ServerError.tsx";
import ProductCardSkeleton from "./ProductCardSkeleton.tsx";

const ShopDashboard = () => {
	const { data: products, isLoading, error} = useProducts();
	const { filters } = useFilters()
	const { cartState } = useCartContext();

	const filterProducts = useMemo(() => {
		console.log("running again");
		if (!products) return [];
		let res = Object.values(products)

		if (filters.sortByPrice === "low") {
			res.sort((a, b) => a.price - b.price)
		} 

		if (filters.sortByPrice === "high") {
			res.sort((a, b) => b.price - a.price)
		}

		if (filters.sortByCategory) {
			return res.filter((t) => (
				t.category.type === filters.sortByCategory
			))
		}

		// something is wrong with this filters
		if (filters.sortByColor) {
			return res.filter((t) => (
				t.color === filters.sortByColor
			))
		}

		return res
	}, [products, filters.sortByCategory, filters.sortByColor, filters.sortByPrice]);

	if (error?.message === "SERVER_ERROR") return <ServerError />

	return (
		<div className="flex justify-start">
			<FilterSideBar />
			<div className="flex-1">
				{ !isLoading ? 
					<div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
						{ filterProducts?.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div> : <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
						{ Array.from({ length: 10}).map(_ => (
							<ProductCardSkeleton />
						))}
					</div> }
			</div>
			{ cartState.isCartSidebarOpen && <CartSideBar /> }
		</div>
	);
};

export default ShopDashboard;

// now how will we work with the filtering of the products
// now we are products are handled by the tanstack so how are going to filterProducts
// now we don't need to store in somewhere 
// now how will be filtering the now i want to store the filterProducts somewhere
