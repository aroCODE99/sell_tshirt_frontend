import {useEffect, useRef, useState} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useFilters} from "../../contexts/FilterContext";
import {GetCategories, GetColors} from "../../utilities/ProductUtils";

const FilterSideBar = () => {
	const {filters, dispatchFilters} = useFilters();
	const categories = GetCategories();
	const { uniqueColors } = GetColors();


	// now these are the ui states
	const [showSortingMethods, setShowSortingMethods] = useState(false);
	const [showCategories, setShowCategories] = useState(false);
	const [showColor, setShowColor] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const sortingMethods = [
		"Relevance",
		"New Arrivals",
		"Price (Low to High)",
		"Price (High to Low)",
		"Discount",
	];

	const [activeSortingMethod, setActiveSortingMethod] = useState(sortingMethods[0]);

	const handleSorting = (method: string) => {
		setActiveSortingMethod(method);
		setShowSortingMethods(false);

		switch (method) {
			case "Price (Low to High)":
				return dispatchFilters({type: "SORT_BY_PRICE_LOW"});
			case "Price (High to Low)":
				return dispatchFilters({type: "SORT_BY_PRICE_HIGH"});
			default:
				return;
		}
	}

	const handleSortingCategories = (category: string) => {
		dispatchFilters({type: "SORT_BY_CATEGORY", payload: category});
		setShowCategories(false)
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowSortingMethods(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative w-[400px] h-screen bg-white p-6">

			{/* Sort Section */}
			<div className="mb-8" ref={dropdownRef}>
				<button
					onClick={() => setShowSortingMethods(!showSortingMethods)}
					className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 bg-gray-100 px-6 py-4 rounded-lg hover:bg-gray-200 transition"
				>
					<span className="text-gray-500">Sort by: </span><span className="font-bold">{activeSortingMethod}</span>
					{showSortingMethods ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
				</button>

				{showSortingMethods && (
					<div
						className="absolute top-[100px] left-6 w-[340px] bg-white shadow-xl rounded-xl mt-2 z-50">
						{sortingMethods.map((method, idx) => (
							<div
								onClick={() => handleSorting(method)}
								key={idx}
								className="px-6 py-4 text-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
							>
								{method}
							</div>
						))}
					</div>
				)}
			</div>

			{/* Divider */}
			<hr className="my-8 border-t border-gray-300" />

			{/* Filter Section */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-gray-800 ">Filter Products</h2>
				{
					filters.isFiltered &&
					<button
						onClick={() => dispatchFilters({type: "CLEAR_FILTER"})}
						className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 transition-all duration-150 cursor-pointer">
						Clear filter
					</button>
				}
			</div>

			{/* Category Toggle */}
			<div className="mb-5">
				<button
					onClick={() => setShowCategories(!showCategories)}
					className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 bg-gray-100 px-6 py-4 rounded-lg hover:bg-gray-200 transition"
				>
					<span>Category</span>
					{showCategories ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
				</button>

				{showCategories && (
					<div className="mt-2 bg-white shadow-md rounded-lg">
						{categories?.map((category, idx) => (
							<div
								onClick={() => handleSortingCategories(category)}
								key={idx}
								className="px-6 py-4 text-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
							>
								{category.toUpperCase()}
							</div>
						))}
					</div>
				)}
			</div>

			{/* Color Filter */}
			<div className="mb-5">
				<div>
					<button
						onClick={() => setShowColor(!showColor)}
						className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 bg-gray-100 px-6 py-4 rounded-lg hover:bg-gray-200 transition"
					>
						<span>Color:</span>
						{showColor ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
					</button>
				</div>

				<div>
					{showColor && (
						<div className="mt-2 bg-white shadow-md rounded-lg max-h-[400px] overflow-auto">
							{uniqueColors.map((color, idx) => (
								<div
									onClick={() => {dispatchFilters({type: "SORT_BY_COLOR", payload: color}); setShowColor(false)}}
									key={idx}
									className="px-6 py-4 text-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
								>
									{color.toUpperCase()}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FilterSideBar;

