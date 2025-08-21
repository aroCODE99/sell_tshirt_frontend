import { Shirt, ShoppingCart, Users } from "lucide-react";

type propsType = {
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const AdminSidebar = ({ activeTab, setActiveTab }: propsType) => {
	return (
		<aside className="w-72 bg-white text-black shadow-lg p-6 flex flex-col">
			<h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
			<nav className="space-y-3">
				<button
					onClick={() => setActiveTab("products")}
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
						activeTab === "products"
							? "bg-black text-white font-semibold"
							: "hover:bg-gray-100"
					}`}
				>
					<Shirt size={18} /> Products
				</button>
				<button
					onClick={() => setActiveTab("orders")}
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
						activeTab === "orders"
							? "bg-black text-white font-semibold"
							: "hover:bg-gray-100"
					}`}
				>
					<ShoppingCart size={18} /> Orders
				</button>
				<button
					onClick={() => setActiveTab("users")}
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition ${
						activeTab === "users"
							? "bg-black text-white font-semibold"
							: "hover:bg-gray-100"
					}`}
				>
					<Users size={18} /> Users
				</button>
			</nav>
		</aside>
	);
};

export default AdminSidebar;

