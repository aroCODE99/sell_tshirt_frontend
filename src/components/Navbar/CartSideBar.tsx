import {useEffect, useRef, useState} from "react";
import NoCartProducts from "../NoCartProducts";
import CartCard from "./CartCard";
import {useGetCart, usePlaceOrder} from "../../hooks/Queries";
import CartCardSkeleton from "./CartCardSkeleton";
import {useAuth} from "../../contexts/AuthContext";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";
import {useCartContext} from "../../contexts/CartContext";
import Modal from "../Modal";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FiX, FiShoppingCart, FiArrowRight} from "react-icons/fi";
import {FaRupeeSign} from "react-icons/fa";
import {BiRupee} from "react-icons/bi";

const CartSideBar = () => {
	const {auth} = useAuth();
	const {data: cart, isLoading, refetch, isError} = useGetCart();
	const {cartState, dispatchCartAction} = useCartContext();
	const sideBarRef = useRef<HTMLDivElement | null>(null);
	const [sidebarStyle, setSidebarStyle] = useState<"fixed" | "absolute">("fixed");
	const [offsetTop, setOffsetTop] = useState<number>(0);
	const [checkoutDisabled, setCheckoutDisabled] = useState(true);
	const [confirmCheckout, setConfirmCheckout] = useState(false);
	const {mutate: placeOrder, isPending: isPlacingOrder} = usePlaceOrder();
	const navigate = useNavigate();

	// Calculate total price
	const calculateTotal = () => {
		if (!cart) return 0;
		return Object.values(cart).reduce((total, item) => {
			return total + (item.discountedPrice * item.quantity);
		}, 0);
	};
	
	const closeCart = () => {
		dispatchCartAction({ type: "SET_CART_SIDEBAR_OPEN", payload: false });
	}

	const handlePlaceOrder = async () => {
		try {
			placeOrder(undefined, {
				onSuccess: () => {
					setConfirmCheckout(false);
					refetch();
					navigate("/checkout");
					toast.success("Order placed successfully!");
				},
				onError: (error) => {
					console.error(error);
					toast.error("Failed to place order. Please try again.");
				}
			});
		} catch (e) {
			console.error(e);
			toast.error("An unexpected error occurred.");
		}
	};

	useEffect(() => {
		setCheckoutDisabled(!cart || Object.values(cart).length === 0);
	}, [cart]);

	useEffect(() => {
		if (auth.isAuthenticated) {
			refetch();
		}
	}, [auth.isAuthenticated, refetch]);

	useEffect(() => {
		const handleScroll = () => {
			const sidebar = sideBarRef.current;
			const footer = document.querySelector("footer");

			if (!sidebar) return;

			const sidebarHeight = sidebar.offsetHeight;
			const scrollY = window.scrollY;

			if (footer) {
				const footerTop = footer.getBoundingClientRect().top;
				const footerOffsetTop = footerTop + scrollY;

				// 90 is the navbar height 
				if ((scrollY + sidebarHeight + 90) >= footerOffsetTop) {
					setSidebarStyle("absolute");
					setOffsetTop(footerOffsetTop - sidebarHeight);
				} else {
					setSidebarStyle("fixed");
					setOffsetTop(90); // Navbar height
				}
			} else {
				setSidebarStyle("fixed");
				setOffsetTop(90); // Navbar height
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // initial check

		return () => window.removeEventListener("scroll", handleScroll);
	}, [cartState.isCartSidebarOpen]);

	// Close cart when clicking outside
	// useEffect(() => {
	// 	const handleClickOutside = (event: MouseEvent) => {
	// 		if (
	// 			sideBarRef.current &&
	// 			!sideBarRef.current.contains(event.target as Node) &&
	// 			cartState.isCartSidebarOpen
	// 		) {
	// 			closeCart();
	// 		}
	// 	};

	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, [cartState.isCartSidebarOpen, closeCart]);

	// Close on escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && cartState.isCartSidebarOpen) {
				closeCart();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [cartState.isCartSidebarOpen, closeCart]);

	return (
		<>
			<AnimatePresence>
				{cartState.isCartSidebarOpen && (
					<>
						{/* Backdrop - Fixed opacity as requested */}
						<motion.div
							className="fixed inset-0 top-20 bg-black z-40"
							style={{opacity: 0.2}}
							initial={{opacity: 0}}
							animate={{opacity: 0.2}}
							exit={{opacity: 0}}
							onClick={closeCart}
						/>

						{/* Cart Sidebar */}
						<motion.div
							ref={sideBarRef}
							className="bg-white shadow-xl rounded-l-xl flex flex-col z-50"
							style={{
								position: sidebarStyle,
								top: `${offsetTop}px`,
								right: 0,
								height: "calc(100vh - 90px)",
								width: "100%",
								maxWidth: "450px",
								minWidth: "320px",
							}}
							initial={{x: "100%"}}
							animate={{x: 0}}
							exit={{x: "100%"}}
							transition={{type: "spring", stiffness: 300, damping: 30}}
						>
							{/* Header */}
							<div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
								<div className="flex items-center gap-3">
									<FiShoppingCart className="text-xl text-gray-700" />
									<h2 className="font-semibold text-xl text-gray-800">My Cart</h2>
									{cart && Object.keys(cart).length > 0 && (
										<span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
											{Object.keys(cart).length} items
										</span>
									)}
								</div>
								<button
									onClick={closeCart}
									className="p-1 rounded-full hover:bg-gray-100 transition-colors"
									aria-label="Close cart"
								>
									<FiX className="text-xl" />
								</button>
							</div>

							{/* Cart items */}
							<div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50">
								{!auth.isAuthenticated ? (
									<div className="flex flex-col items-center justify-center h-full text-center p-4 bg-white rounded-lg">
										<FiShoppingCart className="text-4xl text-gray-300 mb-4" />
										<p className="text-gray-500 mb-4">Please sign in to view your cart</p>
										<button
											onClick={() => navigate("/login")}
											className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
										>
											Sign In
										</button>
									</div>
								) : isLoading ? (
									Array.from({length: 3}).map((_, index) => (
										<CartCardSkeleton key={index} />
									))
								) : isError ? (
									<div className="flex flex-col items-center justify-center h-full text-center p-4 bg-white rounded-lg">
										<FiX className="text-4xl text-red-400 mb-4" />
										<p className="text-gray-500 mb-2">Failed to load cart</p>
										<button
											onClick={() => refetch()}
											className="text-blue-500 hover:text-blue-700 font-medium"
										>
											Try again
										</button>
									</div>
								) : !cart || Object.values(cart).length === 0 ? (
									<NoCartProducts />
								) : (
									Object.entries(cart).map((cp) => (
										<CartCard key={Number(cp[0])} cp={cp} />
									))
								)}
							</div>

							{/* Footer with total and checkout button */}
							{cart && Object.values(cart).length > 0 && (
								<div className="p-5 border-t border-gray-200 bg-white space-y-4">
									<div className="flex justify-between items-center text-lg font-semibold">
										<span>Total:</span>
										<span className="flex items-center"><BiRupee size={20}/>{calculateTotal().toFixed(2)}</span>
									</div>

									<button
										onClick={() => setConfirmCheckout(true)}
										disabled={checkoutDisabled || isPlacingOrder}
										className={`w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center ${(checkoutDisabled || isPlacingOrder) ? "opacity-50 cursor-not-allowed" : ""
											}`}
									>
										{isPlacingOrder ? (
											<>
												<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg>
												Processing...
											</>
										) : (
											<>
												Checkout
												<FiArrowRight className="ml-2" />
											</>
										)}
									</button>
								</div>
							)}
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Using your Modal component exactly as specified */}
			{createPortal(
				<Modal
					condition={confirmCheckout}
					title="Confirm Checkout"
					description="Are you sure you want to place this order?"
					onClose={() => setConfirmCheckout(false)}
					handleMainSubmit={handlePlaceOrder}
				/>,
				document.body
			)}
		</>
	);
};

export default CartSideBar;
