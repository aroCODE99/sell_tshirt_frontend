import {useState, type ReactNode} from "react";
import {CiSearch} from "react-icons/ci";
import Profile from "./Profile";
import Cart from "./Cart";
import {BiX} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

const Navbar = (): ReactNode => {
	const [search, setSearch] = useState("");
	const { auth } = useAuth();
	return (
		<nav className="flex justify-between items-center border-b border-gray-300 px-20 h-[90px] fixed w-full bg-white z-90">
			<div className="relative flex items-center gap-18">
				<div className="flex justify-center items-center h-full">

					<Link to={"/"}>
						<div className="flex items-center gap-2 cursor-pointer select-none">
							<span className="text-4xl font-extrabold tracking-tight text-gray-900 transition duration-200">
								drip
							</span>
							<span className="text-4xl font-extrabold tracking-tight text-blue-500">uk</span>
						</div>
					</Link>
				</div>

				<div className="flex items-center border border-gray-400 p-3 rounded-md min-w-[700px]">
					<CiSearch className="text-3xl"/>
					<input 
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className=" ms-2 outline-none min-w-[600px] text-2xl align-center placeholder:italic"
						type='text' 
						placeholder='Search or ALT+k'
					/> 
					{ search && <button onClick={() => setSearch("")}><BiX className="text-gray-500 text-4xl cursor-pointer"/> </button>}
				</div>
			</div>

			{/* this will be the latter section */}
			<div className="flex justify-around items-center gap-8 min-w-[300px] h-full">
				{auth.isAdmin && (
					<Link to={"/admin/dashboard"}><button 
						className="flex-1 px-4 py-2 mx-8 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 hover:shadow-lg transition duration-300">
						Admin
					</button>
					</Link>
				)}
				<Profile />
				<Cart />
			</div>
		</nav>
	);
};

export default Navbar;
