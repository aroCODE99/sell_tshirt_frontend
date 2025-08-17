import {useContext, useReducer} from "react";
import { createContext } from "react";

interface FilterStateType { 
	sortByPrice?: 'low' | 'high',
	sortByCategory?: string,
	sortByColor?: string,
	isFiltered: boolean
}

type ActionType = 
		| { type: "SORT_BY_PRICE_LOW" } 
		| { type: "SORT_BY_PRICE_HIGH" } 
		| { type: "SORT_BY_CATEGORY", payload: string }
		| { type: "SORT_BY_COLOR", payload: string }
		| { type: "CLEAR_FILTER" }

interface FilterContextType {
	filters: FilterStateType,
	dispatchFilters: React.ActionDispatch<[action: ActionType]>,
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const reducerFunction = (state: FilterStateType, action: ActionType): FilterStateType => {
		switch (action.type) {
			case "SORT_BY_PRICE_LOW":
				return { ...state, sortByPrice: "low", isFiltered: true };
			case "SORT_BY_PRICE_HIGH":
				return { ...state, sortByPrice: "high", isFiltered: true };
			case "SORT_BY_CATEGORY":
				return { ...state, sortByCategory: action.payload, isFiltered: true };
			case "CLEAR_FILTER":
				return { sortByPrice: undefined, sortByCategory: undefined, isFiltered: false };
			case "SORT_BY_COLOR":
				return { ...state, sortByColor: action.payload, isFiltered: true }
			default:
				return state;
		}
	};

	const [ filters, dispatchFilters ] = useReducer(reducerFunction, {isFiltered: false})

	return (
		<FilterContext.Provider value={{ filters, dispatchFilters }}>
			{ children }
		</FilterContext.Provider>
	);
}

export const useFilters = () => {
	const context = useContext(FilterContext)

	if (!context) {
		throw new Error("Cannot use useFilters outside of its provider.");
	}

	return context;
}
