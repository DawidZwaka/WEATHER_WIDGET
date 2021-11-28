import { FC, useEffect, useState } from "react";
import Cities from "./cities.json";
import CityProps from "./CityProps";
import deepEqual from "deep-equal";

//components
import WeatherCard from "../../components/WeatherCard/WeatherCard";

//utils
import shuffleArray from "../../util/shuffleArray";
import useInterval from "../../util/useInterval";

const WeatherWidget: FC = () => {
	const amountOfCities = 3;
	const [cities, setCities] = useState<CityProps[] | null[]>([
		null,
		null,
		null,
	]);
	const [citiesNames, setCitiesNames] = useState<string[]>([]);
	const apiEndpoint = new URL(
		"https://api.openweathermap.org/data/2.5/weather"
	);

	const getRandCities = (): Array<string> => {
		shuffleArray(Cities.data);
		const randCities: Array<string> = Cities.data.slice(-amountOfCities);

		return randCities;
	};

	const getCityPropsFromRes = (data: any) => {
		const {
			name,
			weather,
			main: { temp },
			id,
		} = data;

		const cityProps: CityProps = {
			name,
			id,
			weather: weather[0].main,
			weatherIcon: weather[0].icon,
			weatherId: weather[0].id,
			temperature: temp,
		};

		return cityProps;
	};

	const fetchCity = async (city: string) => {
		let data = null;
		const searchParams = new URLSearchParams();

		searchParams.append("q", city);
		searchParams.append("units", "metric");
		searchParams.append(
			"appid",
			process.env.REACT_APP_OPENWEATHER_API_KEY!
		);

		const res = await fetch(
			apiEndpoint.toString() + "?" + searchParams.toString()
		);

		data = await res.json();

		return data;
	};

	const fetchCitiesWeather = async () => {
		const citiesProps: Array<CityProps> = [];

		for (const city of citiesNames) {
			const data = await fetchCity(city);

			if (data) citiesProps.push(getCityPropsFromRes(data));
		}
		if (citiesProps.length > 0) setCities(citiesProps);
	};

	const updateCitiesWeather = async () => {
		const newCities: Array<CityProps> | Array<null> = [];
		let update = false;

		citiesNames.forEach(async (cityName, index) => {
			const data = await fetchCity(cityName);
			const newCity = getCityPropsFromRes(data);

			if (!deepEqual(cities[index], newCity)) update = true;

			newCities[index] = newCity;
		});

		if (update) setCities(newCities);
	};

	useEffect(() => {
		setCitiesNames(getRandCities());
	}, []);

	useEffect(() => {
		fetchCitiesWeather();
	}, [citiesNames]);

	useInterval(() => {
		setCitiesNames(getRandCities());
		fetchCitiesWeather();
	}, 60 * 1000);

	useInterval(() => {
		updateCitiesWeather();
	}, 10 * 1000);

	return (
		<section className="flex flex-col justify-center align-center bg-gray-100 rounded-3xl p-12 py-6 dark:bg-gray-800">
			<h1 className="font-bold text-3xl mb-2 dark:text-white dark:text-opacity-60">
				Today's weather
			</h1>
			<div className="flex">
				{cities.map((c, k) => (
					<WeatherCard city={c} key={`weatherCard_${k}`} />
				))}
			</div>
		</section>
	);
};

export default WeatherWidget;
