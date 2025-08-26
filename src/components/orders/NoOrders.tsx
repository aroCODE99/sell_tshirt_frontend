import {Package} from "lucide-react";
import {Link} from "react-router-dom";

const NoOrders = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center p-8 bg-white rounded-xl max-w-md">
				<Package className="mx-auto text-gray-400 h-16 w-16 mb-4" />
				<h1 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h1>
				<p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
				<Link
					className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" to={"/shop"}>
					Start Shopping
				</Link>
			</div>
		</div>
	);
};

export default NoOrders;
