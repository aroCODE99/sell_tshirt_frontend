import { FaShieldAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

export default function FeatureSection() {
	const topFeatures = [
		{ icon: <FaShieldAlt />, text: "SECURE PAYMENTS" },
		{ icon: <FaRupeeSign />, text: "CASH ON DELIVERY" },
		{ icon: <FaRegCheckCircle />, text: "ASSURED QUALITY" },
		{ icon: <FaExchangeAlt />, text: "EASY RETURNS" },
	];

	return (
		<div className="min-h-[500px] w-full flex flex-col-reverse">
			{/* Top features */}
			<div className="flex justify-center gap-12 py-6 border-b border-gray-200">
				{topFeatures.map((f, idx) => (
					<div key={idx} className="flex items-center gap-2 text-[#8B6B2E]">
						<span className="text-2xl">{f.icon}</span>
						<span className="uppercase font-medium tracking-wide">
							{f.text}
						</span>
					</div>
				))}
			</div>

		</div>
	);
}

