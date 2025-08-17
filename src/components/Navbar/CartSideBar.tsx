import { useEffect, useRef, useState } from "react";
import NoCartProducts from "../NoCartProducts";
import CartCard from "./CartCard";
import { useGetCart } from "../../hooks/Queries";
import CartCardSkeleton from "./CartCardSkeleton";
import {useAuth} from "../../contexts/AuthContext";
import ConfirmCheckout from "./ConfirmCheckout";
import {createPortal} from "react-dom";

const CartSideBar = () => {
	const { auth } = useAuth()
	const { data: cart, isLoading, refetch } = useGetCart();
	const sideBarRef = useRef<HTMLDivElement | null>(null);
	const [sidebarStyle, setSidebarStyle] = useState<"fixed" | "absolute">("fixed");
	const [offsetTop, setOffsetTop] = useState<number>(0);
	const [checkoutDisabled, setCheckoutDisabled] = useState(true);
	const [confirmCheckout, setConfirmCheckout] = useState(false);
	
	useEffect(() => {
		setCheckoutDisabled(Object.values(cart ?? {}).length === 0)
		console.log(checkoutDisabled);
	}, [cart])

	useEffect(() => {
		refetch()
	}, [auth.isAuthenticated])

	useEffect(() => {
		const handleScroll = () => {
			const sidebar = sideBarRef.current;
			const footer = document.querySelector("footer");

			if (!sidebar || !footer) return;

			const sidebarHeight = sidebar.offsetHeight;
			const footerTop = footer.getBoundingClientRect().top;
			const scrollY = window.scrollY;
			const footerOffsetTop = footerTop + scrollY;

			// 90 is the navbar height 
			if ((scrollY + sidebarHeight + 90) >= footerOffsetTop) {
				setSidebarStyle("absolute");
				setOffsetTop(footerOffsetTop - sidebarHeight);
			} else {
				setSidebarStyle("fixed");
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // initial check

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			ref={sideBarRef}
			className="w-[550px] bg-white border-l border-gray-200 shadow-xl rounded-l-xl scroll-smooth"
			style={{
				position: sidebarStyle,
				top: sidebarStyle === "fixed" ? "90px" : `${offsetTop}px`,
				right: 0,
				height: "calc(100vh - 90px)",
				zIndex: 50,
			}}
		>
			<div className="flex flex-col h-full">
				{/* Header */}
				<div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50 font-semibold text-xl text-gray-800">
					<span>My Cart</span>
				</div>

				<div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white">
					{!cart || Object.values(cart ?? {}).length === 0 ? (
						isLoading ? Array.from({ length: 5 }).map(_ => {
							return <CartCardSkeleton />
						}): <NoCartProducts />
					) : (
					Object.entries(cart ?? {}).map((cp) => (
						<CartCard key={Number(cp[0])} cp={cp} />
					))
					)}
				</div>

				{/* Footer */}
				<div className="p-5 border-t border-gray-200 bg-gray-50">
					{
						!checkoutDisabled &&
							<button 
								onClick={() => setConfirmCheckout(true)}
								className={`w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800`}>
								Checkout 
							</button>
					}

					{ confirmCheckout && createPortal(<ConfirmCheckout setConfirmCheckout={setConfirmCheckout} />, document.body) }
				</div>
			</div>
		</div>
	);
};

export default CartSideBar;

// also show the Quantity button and also make it so that you will be able to change the quantity
