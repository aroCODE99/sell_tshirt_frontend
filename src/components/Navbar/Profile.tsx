import { IoPersonSharp } from "react-icons/io5";
import { useLoginContext } from "../../contexts/LoginContext";
import { useAuth } from "../../contexts/AuthContext";
import {Link} from "react-router-dom";

const Profile = () => {
	const { setShowLoginForm } = useLoginContext();
	const { auth, handleLogout } = useAuth();

	return (
		<div className="relative h-full flex items-center group">
			{/* Profile Trigger */}
			<div className="text-2xl flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
				<IoPersonSharp className="" />
				<span className="font-medium">Profile</span>
			</div>

			{/* Dropdown */}
			<div
				className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[260px] border border-gray-200 bg-white rounded-xl shadow-lg
				invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50"
			>
				<div className="p-4">
					<h2 className="text-lg font-semibold text-gray-800">
						Hello, {auth.username || "Guest"}
					</h2>

					{/* Orders Link */}
					{ auth.isAuthenticated && <Link to={"/shop/orders"}>
						<button
							className="mt-4 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
						>
							My Orders
						</button>
					</Link> }

					<hr className="my-4" />

					{/* Auth Actions */}
					{auth.isAuthenticated ? (
						<button
							onClick={handleLogout}
							className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-all"
						>
							Logout
						</button>
					) : (
						<div>
							<p className="text-sm text-gray-500">
								Sign in to your <span className="font-semibold text-gray-800">Drip UK</span> account
							</p>
							<button
								onClick={() => setShowLoginForm(true)}
								className="w-full mt-3 bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition-all"
							>
								Sign In
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;

