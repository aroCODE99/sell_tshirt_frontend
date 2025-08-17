import {useRef, type FormEvent, type FormEventHandler} from "react";

const CreateProduct = () => {
	const productNameRef = useRef(null);
	const priceRef = useRef(null);
	const descRef = useRef(null);
	const colorRef = useRef(null);
	const categoryRef = useRef(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

			const name = productNameRef.current.value;
			const price = priceRef.current.value;
			const desc = descRef.current.value;
			const color = colorRef.current.value;
			const category = categoryRef.current.value;

			console.log({ name, price, desc, color, category });
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Product</h2>

			<form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} className="space-y-5">
				{/* Product Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
					<input
						ref={productNameRef}
						type="text"
						placeholder="e.g. Solo-leveling T-shirt"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Price */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
					<input
						ref={priceRef}
						type="number"
						placeholder="e.g. 599"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
					<textarea
						ref={descRef}
						rows={4}
						placeholder="Product details and features"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Color */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
					<input
						ref={colorRef}
						type="text"
						placeholder="e.g. Black"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Category */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
					<select
						ref={categoryRef}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select Category</option>
						<option value="oversized">Oversized</option>
						<option value="printed">Printed</option>
						<option value="jerseys">Jerseys</option>
						<option value="polo">Polo</option>
					</select>
				</div>

				{/* now how will i be able to add this whole component */}
				<div>
					<h1> Add the size variants </h1>
					<div className="flex">
						<select>
							<option value="M">M</option>
							<option value="XL">XL</option>
							<option value="L">L</option>
							<option value="S">S</option>
							<option value="XXL">XXL</option>
						</select>

						<input type="number" className="border border-gray-200"/>
					</div>
				</div>

				{/* Image Upload */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
					<input
						type="file"
						multiple
						accept="image/*"
						className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					/>
				</div>

				{/* Submit */}
				<div className="text-center">
					<button
						type="submit"
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Create Product
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateProduct;


// now i am getting how should we making the let's use the one ref only for the input for taking the size
