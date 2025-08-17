import {useCartContext} from "../../contexts/CartContext";
import CartSideBar from "./CartSideBar";

const CartSideBarToggle = () => {
	const { cartState } = useCartContext();
	return (
		<> 
			{ cartState.isCartSidebarOpen && <CartSideBar /> }
		</>
	)
};

export default CartSideBarToggle;
