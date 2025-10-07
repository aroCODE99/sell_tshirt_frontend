import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { LoginProvider } from "./contexts/LoginContext.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import ShopPage from "./components/Shop/ShopPage.tsx";
import ProductPage from "./components/Shop/ProductPage.tsx";
import { FilterProvider } from "./contexts/FilterContext.tsx";
import { CartContextProvider } from "./contexts/CartContext.tsx";
import LoginModal from "./components/Login/LoginModal.tsx";
import { ToastContainer } from "react-toastify";
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
import { AdminContextProvider } from "./contexts/AdminContext.tsx";
import AdminProductPage from "./components/Admin/AdminProductPage.tsx";

const AdminPage = React.lazy(() => import("./components/Admin/AdminPages.tsx"));

const App = () => {
	return (
		<>
			<LoginProvider>
				<CartContextProvider>
					<AdminContextProvider> {/* Move to top level */}
						<LoginModal />
						<Routes>
							{/* Public Routes with Layout */}
							<Route path="/" element={<Layout />}>
								<Route index element={
									<FilterProvider>
										<HomePage />
									</FilterProvider>
								} />

								<Route path="shop">
									<Route index element={
										<FilterProvider>
											<ShopPage />
										</FilterProvider>
									} />
									<Route path="product/:id" element={<ProductPage />} />
								</Route>

								{/* Protected Routes */}
								<Route element={<PrivateRoute />}>
									<Route path="checkout" element={<CheckOutPage />} />
									<Route path="checkout/summary" element={<CheckoutSummary />} />
									<Route path="orders">
										<Route index element={<MyOrders />} />
										<Route path="track/:id" element={<TrackingDetails />} />
									</Route>

									{/* Admin Routes */}
									<Route path="admin" element={<IsAdmin />}>
										<Route element={<AdminPage />}>
											<Route path="products" element={<AdminProductPage />} />
											<Route path="orders" element={<ShowOrders />} />
										</Route>
									</Route>
								</Route>
							</Route>
							<Route path="/paymentCallback" element={<PaymentSuccess />} />
							<Route path="/oauth/redirect" element={<OauthRedirect />} />

							<Route path="*" element={<div>404 - Page Not Found</div>} />
						</Routes>
					</AdminContextProvider>
				</CartContextProvider>
			</LoginProvider>

			<ToastContainer theme="dark" pauseOnHover={false} />
		</>
	);
};

export default App;
