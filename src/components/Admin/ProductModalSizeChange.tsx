import type {ProductFormType} from "../../types/FormDataTypes";

type propsType = {
	sizings: string[];
	handleSizeChange: (size: string) => void;
	handleSizeInputChange: (size: string, stock: number) => void;
	form: ProductFormType;
}

const ProductModalSizeChange = ({sizings, handleSizeChange, form, handleSizeInputChange}: propsType) => {
	return (
		<>
			{/* Sizes */}
			< div >
				<label className="block text-sm font-medium text-gray-700 mb-1.5">
					Sizes
				</label>

				{/* Show toggle buttons (optional) */}
				<div className="flex flex-wrap gap-2 mb-3">
					{sizings.map((size) => {
						const selected = form.sizes && form.sizes[size] !== undefined;
						return (
							<button
								key={size}
								type="button"
								onClick={() => handleSizeChange(size)}
								className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${selected
									? "bg-blue-600 text-white border-blue-600"
									: "border-gray-300 text-gray-700 hover:bg-gray-50"
								}`}
							>
								{size}
							</button>
						);
					})}
				</div>

				{/* Show inputs for selected sizes */}
				<div className="space-y-2">
					{Object.entries(form.sizes ?? {}).map(([size, stock]) => (
						<div key={size} className="flex items-center gap-3">
							<span className="w-12 font-medium">{size} :</span>
							<input
								type="number"
								min="0"
								value={stock}
								onChange={(e) => handleSizeInputChange(size, Number(e.target.value))}
								className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
							/>
						</div>
					))}
				</div>
			</div >
		</>
	);
}

export default ProductModalSizeChange;
