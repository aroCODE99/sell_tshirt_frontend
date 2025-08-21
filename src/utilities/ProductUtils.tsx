import {useProducts} from "../hooks/Queries.tsx";
import type {ProductsType} from "../types/ProductsType.ts";

export const GetCategories = () => {
	const {data: products} = useProducts();
	return Array.from(new Set(Object.values(products ?? {}).map(p => {
		if (p.category) return p.category
		else return "SOMETHING";
	})));
};

export const GetColors = () => {
	const {data: products} = useProducts();
	const uniqueColors: string[] = Array.from(
		new Set(Object.values(products ?? {}).map((product: ProductsType) => (
			product.color
		))));

	return {uniqueColors};
}

