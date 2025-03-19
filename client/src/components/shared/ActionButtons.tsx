import { useState } from "react";
import { Tooltip } from "../ui";

const ActionButton = ({
	icon: Icon,
	onClick,
	tooltipText,
	ariaLabel,
	showCopiedState = false,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipContent, setTooltipContent] = useState(tooltipText);

	const handleClick = () => {
		if (showCopiedState) {
			setTooltipContent("Copied!");
			setShowTooltip(true);

			onClick();

			setTimeout(() => {
				setTooltipContent(tooltipText);
			}, 2000);
		} else {
			onClick();
		}
	};

	return (
		<div className="relative">
			<button
				onClick={handleClick}
				className="p-2 hover:bg-gray-100 rounded-full transition-colors"
				aria-label={ariaLabel}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => {
					if (!showCopiedState || tooltipContent !== "Copied!") {
						setShowTooltip(false);
					}
				}}
			>
				<Icon size={20} className="text-green-500" />
			</button>
			<Tooltip visible={showTooltip} text={tooltipContent} />
		</div>
	);
};

export default ActionButton;
