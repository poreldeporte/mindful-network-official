import { motion, AnimatePresence } from "framer-motion";

export const Tooltip = ({ visible, text, position = "bottom" }) => {
	const positions = {
		bottom: { top: "100%", left: "50%", x: "-50%", y: "10px" },
		top: { bottom: "100%", left: "50%", x: "-50%", y: "-10px" },
		left: { right: "100%", top: "50%", x: "-10px", y: "-50%" },
		right: { left: "100%", top: "50%", x: "10px", y: "-50%" },
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className="absolute px-2 py-1 text-[14px] text-white bg-gray-800 rounded z-10 whitespace-nowrap"
					style={{ ...positions[position] }}
					initial={{ opacity: 0, scale: 0.8, ...positions[position] }}
					animate={{ opacity: 1, scale: 1, ...positions[position] }}
					exit={{ opacity: 0, scale: 0.8, ...positions[position] }}
					transition={{ duration: 0.2 }}
				>
					{text}
					<motion.div
						className="absolute w-2 h-2 bg-gray-800 rotate-45"
						style={{
							...(position === "bottom" && {
								top: "-4px",
								left: "calc(50% - 4px)",
							}),
							...(position === "top" && {
								bottom: "-4px",
								left: "calc(50% - 4px)",
							}),
							...(position === "left" && {
								right: "-4px",
								top: "calc(50% - 4px)",
							}),
							...(position === "right" && {
								left: "-4px",
								top: "calc(50% - 4px)",
							}),
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
