import {Autoplay} from "swiper/modules";
import {SwiperSlide, Swiper} from "swiper/react";
import type {ProductsType} from "../../types/ProductsType";
import ProductCard from "../Shop/ProductCard";
import {useProducts} from "../../hooks/Queries";

const FeatureProducts = () => {
	const { data: products } = useProducts()
	return (
		<section className="py-20 bg-white text-black">
			<h2 className="text-4xl font-bold text-center mb-10 text-black">
				Featured <span className="text-blue-500">T-Shirts</span>
			</h2>
			<div className="max-w-6xl mx-auto">
				<Swiper
					modules={[Autoplay]}
					loop={true}
					autoplay={{
						delay: 0,
					}}
					speed={2000} // speed of transition
					freeMode={true} // makes it continuous
					spaceBetween={20}
					slidesPerView={1}
					allowTouchMove={true}
					onSwiper={(swiper) => {
						const el = swiper.el;
						el.addEventListener("mouseenter", () => swiper.autoplay.stop());
						el.addEventListener("mouseleave", () => swiper.autoplay.start());
					}}
					breakpoints={{
						640: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
					}}

				>
					{Object.values(products ?? {}).map((product: ProductsType) => (
						product.featured &&
							<SwiperSlide key={product.id}>
								<ProductCard product={product} />
							</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}

export default FeatureProducts;

