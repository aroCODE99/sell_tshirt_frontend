import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import { Shirt, ShoppingCart } from "lucide-react";
import { useAdminContext } from "../../contexts/AdminContext";

const AdminSidebar = () => {
    const { adminState, dispatch } = useAdminContext();
    const location = useLocation();

    // Determine active tab based on current route
    const getActiveTab = () => {
        if (location.pathname.includes("/admin/products")) return "products";
        if (location.pathname.includes("/admin/orders")) return "orders";
        return adminState.activeTab;
    };

    const activeTab = getActiveTab();

    return (
        <aside className="w-72 bg-white text-black shadow-lg p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
            <nav className="space-y-3">
                <Link
                    to="/admin/products"
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
                        activeTab === "products"
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-100"
                    }`}
                    onClick={() => dispatch({ type: "CHANGE_ACTIVE_TAB", payload: "products" })}
                >
                    <Shirt size={18} /> Products
                </Link>
                
                <Link
                    to="/admin/orders"
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
                        activeTab === "orders"
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-100"
                    }`}
                    onClick={() => dispatch({ type: "CHANGE_ACTIVE_TAB", payload: "orders" })}
                >
                    <ShoppingCart size={18} /> Orders
                </Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
