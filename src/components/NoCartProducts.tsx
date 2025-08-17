const NoCartProducts = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center text-center px-4">
			<h1 className="text-3xl md:text-4xl font-bold mb-4">Your Cart is Empty 🛒</h1>
			<p className="text-gray-600 text-lg mb-6">
				Looks like you haven't added anything to your cart yet.
			</p>
		</div>
	);
};

export default NoCartProducts;

