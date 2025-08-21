import {useProducts} from "../hooks/Queries.tsx";

	const {data: products} = useProducts();
export const GetCategories = () => {
	return Array.from(new Set(Object.values(products ?? {}).map(p => {
		if (p.category) return p.category
		else return "SOMETHING";
	})));
};


