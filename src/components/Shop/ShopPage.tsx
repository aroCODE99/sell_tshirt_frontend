import {useMemo} from "react";
import {useFilters} from "../../contexts/FilterContext.tsx";
import {useProducts} from "../../hooks/Queries.tsx";
import FilterSideBar from "./FilterSideBar";
import CartSideBar from "../Navbar/CartSideBar.tsx";
import ServerError from "../ServerError.tsx";
import MainDisplayProducts from "./MainDisplayProducts.tsx";
import MainDisplayProductsSkeleton from "./ProductsSkeleton.tsx";
import ScrollToTop from "../ScrollToTop.tsx";
import type {ProductsType} from "../../types/ProductsType.ts";

const ShopPage = () => {
	const {data: products, isLoading, error} = useProducts();
	const {filters} = useFilters()

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
			return res.filter((p: ProductsType) => (
				p.category === filters.sortByCategory
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

	if (error?.message === "Network Error") {
		return <ServerError />
	}

	return (
		<>
			<ScrollToTop />
			<div className="flex justify-start">
				<FilterSideBar />
				<div className="flex-1">
					{!isLoading ?
						<MainDisplayProducts filterProducts={filterProducts} />
						: <MainDisplayProductsSkeleton />
					}
				</div>
			</div>
		</>
	);
};

export default ShopPage;
