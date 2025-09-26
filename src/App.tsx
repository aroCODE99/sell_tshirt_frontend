import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import {LoginProvider} from "./contexts/LoginContext.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import ShopPage from "./components/Shop/ShopPage.tsx";
import ProductPage from "./components/Shop/ProductPage.tsx";
import {FilterProvider} from "./contexts/FilterContext.tsx";
import {CartContextProvider} from "./contexts/CartContext.tsx";
import LoginModal from "./components/Login/LoginModal.tsx";
import {ToastContainer} from "react-toastify";
import CheckOutPage from "./components/Shop/CheckOutPage.tsx";
import MyOrders from "./components/orders/MyOrders.tsx";
import CheckoutSummary from "./components/Navbar/CheckoutSummary.tsx";
import PaymentSuccess from "./components/PaymentFlow/PaymentSuccess.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import IsAdmin from "./components/IsAdmin.tsx";
import React from "react";
import TrackingDetails from "./components/orders/TrackingDetails.tsx";
import OauthRedirect from "./components/OauthRedirect.tsx";
import ShowOrders from "./components/Admin/ShowOrders.tsx";
import {AdminContextProvider} from "./contexts/AdminContext.tsx";

const AdminPage = React.lazy(() => import("./components/Admin/AdminPages.tsx"));

const App = () => {
	return (
		<>
			<LoginProvider>
				<CartContextProvider>
					<LoginModal />
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<FilterProvider><HomePage /></FilterProvider>} />
							<Route path="/shop" element={
								<FilterProvider>
									<ShopPage />
								</FilterProvider>
							}
							/>
							<Route path="/product/:id" element={<ProductPage />} />
							<Route element={<PrivateRoute />}>
								<Route path="/shop/checkout" element={<CheckOutPage />} />
								<Route path="/shop/checkout/summary" element={<CheckoutSummary />} />
								<Route path="/shop/orders" element={<MyOrders />} />
								<Route path="/orders/track/:id" element={<TrackingDetails />} />
								<Route path="/admin/*" element={<IsAdmin />}>
									<Route path="dashboard/products" element={
										<AdminContextProvider>
											<AdminPage />
										</AdminContextProvider>
									} />

									<Route path="dashboard/orders" element={
										<AdminContextProvider>
											<ShowOrders />
										</AdminContextProvider>
									} />
								</Route>
							</Route>
						</Route>

						{/* so the real problem is that we are not getting hit this callback */}
						<Route path="paymentCallback" element={<PaymentSuccess />} />
						<Route path="/oauth/redirect" element={<OauthRedirect />} />
					</Routes>
				</CartContextProvider>
			</LoginProvider>

			<ToastContainer theme="dark" pauseOnHover={false} />
		</>
	);
};

export default App;


// now let's work on the filtering 
// now let's work on the product Page
// working with the admin stuff
// now let's work on storing the images

// working with the addToCart functionality
