import { FC } from "react";
import WeatherCardProps from "./WeatherCardProps";

const WeatherCard: FC<WeatherCardProps> = ({ city }) => {
	let jsx;

	if (city) {
		const groupId = Math.floor(city.weatherId / 100);
		let cardStyling: string = "";

		switch (groupId) {
			case 2: {
				cardStyling = "bg-purple-100";
				break;
			}
			case 3: {
				cardStyling = "bg-blue-200";
				break;
			}
			case 5: {
				cardStyling = "bg-blue-300";
				break;
			}
			case 6: {
				cardStyling = "bg-gray-200";
				break;
			}
			case 7: {
				cardStyling = "bg-gray-300";
				break;
			}
			case 8: {
				cardStyling = "bg-white";
				break;
			}
			default: {
				cardStyling = "bg-gray-200";
			}
		}

		jsx = (
			<a
				href={`https://openweathermap.org/city/${city.id}`}
				target="_blank"
				className={`flex flex-col rounded-lg p-7 m-1 dark:bg-gray-600 dark:text-opacity-70 dark:text-white ${cardStyling}`}
				rel="noreferrer"
			>
				<h1 className="text-center">{city.name}</h1>
				<div className="text-7xl flex justify-center py-5">
					<img
						src={`http://openweathermap.org/img/wn/${city.weatherIcon}@2x.png`}
						alt="weather icon"
					/>
				</div>
				<p className="text-xs text-center font-light">{city.weather}</p>
				<p className="text-center text-2xl font-bold">
					{city.temperature.toFixed()} <sup>o</sup>C
				</p>
			</a>
		);
	} else {
		jsx = (
			<div className="animate-pulse bg-white shadow rounded-lg p-7 m-1 dark:bg-gray-600">
				<div className="flex flex-col justify-center">
					<div className="h-3 bg-gray-100 dark:bg-gray-500 rounded w-100px"></div>
					<div className="rounded-full bg-gray-100 dark:bg-gray-500 h-12 w-12 mx-auto my-10"></div>
					<div className="flex-1 py-1">
						<div className="space-y-2">
							<div className="h-2 bg-gray-100 dark:bg-gray-500 rounded"></div>
							<div className="h-4 bg-gray-100 dark:bg-gray-500 rounded w-4/6 mx-auto"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return jsx;
};

export default WeatherCard;
