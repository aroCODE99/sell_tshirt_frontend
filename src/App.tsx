import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { LoginProvider } from "./contexts/LoginContext.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import ShopDashboard from "./components/Shop/ShopDashboard.tsx";
import ProductPage from "./components/Shop/ProductPage.tsx";
import Dashboard from "./components/Admin/Dashboard.tsx";
import {FilterProvider} from "./contexts/FilterContext.tsx";
import { CartContextProvider } from "./contexts/CartContext.tsx";
import LoginModal from "./components/Login/LoginModal.tsx";
import { ToastContainer } from "react-toastify";
import CheckOutPage from "./components/Shop/CheckOutPage.tsx";
import MyOrders from "./components/orders/MyOrders.tsx";
import CheckoutSummary from "./components/Navbar/CheckoutSummary.tsx";
import PaymentSuccess from "./components/PaymentFlow/PaymentSuccess.tsx";

// now i haven't incorporated the private route and public route
const App = () => {
	return (
		<>
			<ToastContainer theme="dark" pauseOnHover={false} />
			<LoginProvider>
				<CartContextProvider>
					<LoginModal />
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<HomePage />} />
							<Route path="/shop" element={
								<FilterProvider>
									<ShopDashboard />
								</FilterProvider>
								} 
							/>
							<Route path="/product/:id" element={<ProductPage />} />
							<Route path="/shop/checkout" element={<CheckOutPage />} />
							<Route path="/shop/checkout/summary" element={<CheckoutSummary />} />
							<Route path="/shop/orders" element={<MyOrders />} />
							<Route path="/admin/dashboard" element={<Dashboard />} />

						</Route>

						{/* so the real problem is that we are not getting hit this callback */}
						<Route path="paymentCallback" element={<PaymentSuccess />} /> 
					</Routes>
				</CartContextProvider>
			</LoginProvider>
		</>
	);
};

export default App;


// now let's work on the filtering 
// now let's work on the product Page
// working with the admin stuff
// now let's work on storing the images

// working with the addToCart functionality
