import { HiOutlinePlus, HiOutlineHome, HiOutlineOfficeBuilding, HiOutlineX } from "react-icons/hi";
import { useGetAddresses } from "../../hooks/Queries";
import type {addressType} from "../../types/UserType";

type propsType = {
	selectedAddress: addressType | undefined,
	setShowAddressSidebar: React.Dispatch<React.SetStateAction<boolean>>,
	setSelectedAddress: React.Dispatch<React.SetStateAction<addressType | undefined>>,
	setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function AddressSidebar({ selectedAddress, setShowAddressSidebar, setSelectedAddress, setShowAddressForm }: propsType) {
	let { data: addresses } = useGetAddresses();
	addresses = addresses ?? [];

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 w-full max-w-lg">
			<div className="flex justify-between items-center mb-5">
				<h2  className="text-xl font-semibold text-gray-900">Your Addresses</h2>
				<button
					className="text-gray-500 hover:text-gray-700"
					onClick={() => setShowAddressSidebar(false)}
				>
					<HiOutlineX className="text-2xl" />
				</button>
			</div>

			<div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
				{addresses?.length > 0 ? (
					addresses?.map((address, idx) => (
						<div
							key={idx}
							onClick={() => setSelectedAddress(address)}
							className={`border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-slate-500 transition relative 
								${selectedAddress?.addressType === address.addressType && "bg-gray-50 border-slate-500"}`}
						>
							{/* Icon + Type */}
							<div className={`flex items-center gap-3 `}>
								{address.addressType === "Home" ? (
									<HiOutlineHome className="text-gray-600 text-lg" />
								) : (
									<HiOutlineOfficeBuilding className="text-gray-600 text-lg" />
								)}
								<p className="text-base font-medium text-gray-900">
									{address.addressType}
								</p>
							</div>

							{/* Name */}
							<p className="text-base font-semibold mt-2">{address.name}</p>

							{/* Full Address */}
							<p className="text-sm text-gray-600 leading-relaxed">
								{[address.streetName, address.landmark, address.city, address.country, address.postalCode]
									.filter(Boolean)
									.join(", ")}
							</p>

							{/* Phone */}
							<p className="text-sm font-medium mt-2">📞 {address.phoneNumber}</p>
						</div>
					))
				) : (
					<p className="text-sm text-gray-500">No saved addresses found.</p>
				)}
			</div>

			{/* Add New Address Button */}
			<button
				onClick={() => {
					setShowAddressForm(true);
				}}
				className="mt-6 w-full py-3 border border-dashed border-gray-400 rounded-lg flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition text-base font-medium"
			>
				<HiOutlinePlus className="text-lg" />
				Add New Address
			</button>

		</div>
	);
}

