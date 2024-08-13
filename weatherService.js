const API_KEY = "e8eb4199806af021aafd9d729ae0cf81";

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data = await response.json();

        const {
            weather,
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            wind: { speed },
            sys: { country },
            name,
        } = data;
        const { description, icon } = weather[0];

        return {
            description,
            iconURL: makeIconURL(icon),
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            speed,
            country,
            name,
        };
    } catch (error) {
        console.error("Error fetching or parsing weather data:", error);
        return null;
    }
};

export { getFormattedWeatherData };
