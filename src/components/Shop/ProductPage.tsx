import { useRef, useState } from "react";
import NoProducts from "./NoProducts";
import { useParams } from "react-router-dom";
import {useProducts} from "../../hooks/Queries";
import type {ProductsType, sizeType} from "../../types/ProductsType";

export const sizings: sizeType[] = ["XL", "LG", "SM", "XXL", "XSM", "M"];

const ProductPage = () => {
	const { data: products } = useProducts();
	const { id } = useParams();
	const activeProduct: ProductsType | undefined = Object.values(products ?? {}).find((t) => (
		t.id === Number(id)
	));

	// const [selectedImage, setSelectedImage] = useState(activeProduct?.imgPath);

	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState<number>(-1);
	const quantityRef = useRef(null);

	// working on selecting the quantity and adding the input value
	// useEffect(() => {
	// 	const handleQuantityChange = (e) => {
	// 		if (quantityRef.current.contains(e.target as Node)) {
	// 			console.log(e.target);
	// 		}
	// 	}
	// 	document.addEventListener("selectionchange", handleQuantityChange);
	// 	return () => document.addEventListener("selectionchange", handleQuantityChange)
	// }, [])


	if (!activeProduct) {
		return <NoProducts />;
	}

	const increaseQty = () => setQuantity(q => q + 1);
	const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

	return (
		<div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10">
			<div className="grid md:grid-cols-2 gap-12 max-w-7xl"> 
				{/* Left: Images */}
				<div>
					{/* Main Image */}
					<div className="relative mb-4">
						<img
							src={activeProduct.imgPath || "../../../public/ArgentinaJerse/argentinaJersey.avif"}
							alt={activeProduct.name}
							className="w-full max-h-[500px] object-cover transition-transform"
						/>
					</div>

					{/* Thumbnails */}
					{/* <div className="flex gap-4 overflow-auto"> */}
					{/* 	{activeProduct.imgPath?.map((img, idx) => ( */}
					{/* 		<img */}
					{/* 			key={idx} */}
					{/* 			src={img} */}
					{/* 			alt={`thumb-${idx}`} */}
					{/* 			onClick={() => setSelectedImage(img)} */}
					{/* 			className={`w-20 h-20 object-cover rounded border cursor-pointer ${ */}
					{/* 				selectedImage === img ? "border-blue-500" : "border-gray-300" */}
					{/* 			}`} */}
					{/* 		/> */}
					{/* 	))} */}
					{/* </div> */}
				</div>

				<div className="flex flex-col justify-between gap-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-800 mb-2">{activeProduct.name}</h1>
						<p className="text-gray-600 mb-4">{activeProduct.description}</p>

						<div className="flex items-center gap-3 text-sm">
							<span className="bg-gray-200 px-3 py-1 rounded-full">Category: {activeProduct.category.type}</span>
							<span className="bg-gray-200 px-3 py-1 rounded-full capitalize">Color: {activeProduct.color}</span>
							<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">In Stock</span>
						</div>

						{/* Price */}
						<div className="text-2xl text-slate-600 font-bold mt-4">₹{activeProduct.price}</div>
						<p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
					</div>

					<div className="flex gap-5">
						{sizings.map((s) => {
							const variant = activeProduct.productVariants.find((p) => p.size === s);
							const isOutOfStock = !variant || variant.quantity <= 0;

							return (
								<button
									onClick={() => setSelectedSize(variant?.id)}
									key={s}
									disabled={isOutOfStock}
									className={`text-xl px-6 py-2 rounded-full border border-gray-400
										${isOutOfStock 
											? "opacity-25 cursor-not-allowed"
											: "text-black hover:border-blue-400"
										}

										${selectedSize === variant?.id ? "text-white bg-blue-500" : ""}
										transition-all ease-in duration-100`}
								>
									{s}
								</button>
							);
						})}
					</div>

					{/* Quantity + Buttons */}
					<div>
						<div className="mb-4">
							<label className="text-sm text-gray-700 font-medium mb-1 inline-block">Quantity</label>
							<div ref={quantityRef} className="flex items-center border rounded w-fit">
								<button
									onClick={decreaseQty}
									className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
								>
									–
								</button>
								<span className="px-6 py-2">{quantity}</span>
								<button
									onClick={increaseQty}
									className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
								>
									+
								</button>
							</div>
						</div>

						<div className="flex gap-4">
							<button className="flex-1 py-3 bg-black hover:bg-slate-700 text-white rounded-md transition">
								Add to Cart
							</button>
							<button className="flex-1 py-3 bg-white hover:bg-gray-200 border border-gray-200 text-black rounded-md transition">
								Add to Wishlist
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default ProductPage;

