import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import CartSideBarToggle from "./Navbar/CardSideBarToggle";
import {useProducts} from "../hooks/Queries";
import LoginModal from "./Login/LoginModal";

const Layout = () => {
	const { error } = useProducts();

	return (
		<>
			<Navbar />
			<main className="pt-[90px]">
				<CartSideBarToggle />
				<Outlet />
			</main> 
			<Footer />
		</>
	);
};

export default Layout;
