import { FC } from "react";
import "./App.css";
import "../node_modules/weather-icons/css/weather-icons.min.css";

//containers
import WeatherWidget from "./containers/WeatherWidget/WeatherWidget";

//components
import DarkModeToggler from "./components/DarkModeToggler/DarkModeToggler";

const App: FC = () => {
	return (
		<div id="App" className="bg-gray-50 dark:bg-gray-900">
			<aside className="menu m-4">
				<DarkModeToggler targetID="root" message="Dark mode" />
			</aside>
			<main>
				<WeatherWidget />
			</main>
		</div>
	);
};

export default App;
