import { FC } from "react";
import "./DarkModeToggler.css";

interface DarkModeTogglerProps {
	targetID: string;
	message: string;
}

const DarkModeToggler: FC<DarkModeTogglerProps> = ({ targetID, message }) => {
	const toggleHandler = () => {
		const root = document.getElementById(targetID);

		root!.classList.toggle("dark");
	};

	return (
		<div>
			<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
				<input
					type="checkbox"
					name="toggle"
					id="toggle"
					className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
					onClick={toggleHandler}
				/>
				<label
					htmlFor="toggle"
					className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
				></label>
			</div>
			<label
				htmlFor="toggle"
				className="text-xs text-gray-900 dark:text-white dark:text-opacity-40"
			>
				{message}
			</label>
		</div>
	);
};

export default DarkModeToggler;
