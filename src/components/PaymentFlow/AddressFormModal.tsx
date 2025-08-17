import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import type { addressType } from "../../contexts/AuthContext";
import {useSaveAddress} from "../../hooks/Queries";
import {toast} from "react-toastify";

type AddressFormModalType = {
   	setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>> 
	setShowAddressSidebar: React.Dispatch<React.SetStateAction<boolean>> 
};


const AddressFormModal = ({ setShowAddressForm, setShowAddressSidebar }: AddressFormModalType) => {
	const { mutate: saveAddress } = useSaveAddress();

	const [formData, setFormData] = useState<addressType>({
		id: Date.now(),
		addressType: "",
		city: "",
		country: "",
		landmark: "",
		postalCode: "" as unknown as number, // keep as string in state
		streetName: "",
		phoneNumber: "",
		name: "" // for now don't think about this 
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setShowAddressSidebar(true)
			saveAddress(formData);
			toast.success("address saved successfully");
		} catch (e: any) {
			console.error(e.message);
		}
		setShowAddressForm(false);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-[99]">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 animate-fadeInOverlay"
			></div>

			{/* Modal */}
			<div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 transform scale-95 opacity-0 animate-scaleFadeIn">
				{/* Header */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-gray-900">Add New Address</h2>
					<button
						className="text-gray-500 hover:text-gray-700"
						onClick={() => setShowAddressForm(false)}
					>
						<HiOutlineX className="text-2xl" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Address Type */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Address Type</label>
						<select
							name="addressType"
							value={formData.addressType}
							onChange={handleChange}
							className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
							required
						>
							<option value="">Select type</option>
							<option value="Home">Home</option>
							<option value="Office">Office</option>
							<option value="Other">Other</option>
						</select>
					</div>

					{/* Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Full Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
							required
						/>
					</div>

					{/* Street Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Street Name</label>
						<input
							type="text"
							name="streetName"
							value={formData.streetName}
							onChange={handleChange}
							className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
							required
						/>
					</div>

					{/* Landmark */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Landmark</label>
						<input
							type="text"
							name="landmark"
							value={formData.landmark}
							onChange={handleChange}
							className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
						/>
					</div>

					{/* City & Country */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">City</label>
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleChange}
								className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Country</label>
							<input
								type="text"
								name="country"
								value={formData.country}
								onChange={handleChange}
								className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
								required
							/>
						</div>
					</div>

					{/* Postal Code & Phone */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Postal Code</label>
							<input
								type="text"
								name="postalCode"
								pattern="\d{5,6}"
								value={formData.postalCode as unknown as string}
								onChange={handleChange}
								className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Phone Number</label>
							<input
								type="tel"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleChange}
								className="mt-1 w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-slate-500"
								required
							/>
						</div>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<button
							onClick={() => setShowAddressForm(false)}
							type="button"
							className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
						>
							Save Address
						</button>
					</div>
				</form>
			</div>

			<style>{`
				@keyframes fadeInOverlay {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes scaleFadeIn {
					from { opacity: 0; transform: scale(0.95); }
					to { opacity: 1; transform: scale(1); }
				}
				.animate-fadeInOverlay {
					animation: fadeInOverlay 0.2s ease-out forwards;
				}
				.animate-scaleFadeIn {
					animation: scaleFadeIn 0.2s ease-out forwards;
				}
				`}</style>
		</div>
	);
};

export default AddressFormModal;

