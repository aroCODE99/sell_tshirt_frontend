import { IoCart } from "react-icons/io5";
import { useCartContext } from "../../contexts/CartContext";
import {useGetCart} from "../../hooks/Queries";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";

const Cart = () => {
	const { cartState, dispatchCartAction } = useCartContext();
	const { auth } = useAuth();
	const { data: cart, refetch } = useGetCart();

	useEffect(() => {
		refetch()
	}, [auth.isAuthenticated])

	const [totalItems, setTotalItems] = useState(0)
	useEffect(() => setTotalItems(Object.values(cart ?? {}).length), [cart])

	return (
		<div 
			onClick={() => dispatchCartAction({ type: "SET_CART_SIDEBAR_OPEN", payload: !cartState.isCartSidebarOpen })}
			className="relative h-full flex flex-col items-center justify-center text-3xl cursor-pointer group"
		>
			<div className="relative hover:bg-gray-100 p-2 rounded-xl transition-colors">
				<IoCart />
				{totalItems > 0 && (
					<span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
						{totalItems}
					</span>
				)}
			</div>
		</div>
	);
};

export default Cart;

