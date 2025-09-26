import {Shirt, ShoppingCart} from "lucide-react";
import {useAdminContext} from "../../contexts/AdminContext";
import type {tabType} from "../../types/AdminTypes";

const AdminSidebar = () => {
	const { adminState, dispatch } = useAdminContext();
	const activeTab = adminState.activeTab; // so this is the activetab for the sidebar

	const changeActiveTab = (tabName: tabType) => {
		dispatch({type: "CHANGE_ACTIVE_TAB", payload: tabName})
	}

	return (
		<aside className="w-72 bg-white text-black shadow-lg p-6 flex flex-col">
			<h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
			<nav className="space-y-3">
				<button
					onClick={() => changeActiveTab("products")}
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${activeTab === "products"
						? "bg-black text-white font-semibold"
						: "hover:bg-gray-100"
						}`}
				>
					<Shirt size={18} /> Products
				</button>
				<button
					onClick={() => changeActiveTab("orders")}
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${activeTab === "orders"
						? "bg-black text-white font-semibold"
						: "hover:bg-gray-100"
						}`}
				>
					<ShoppingCart size={18} /> Orders
				</button>
			</nav>
		</aside>
	);
};

export default AdminSidebar;

