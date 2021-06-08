import axios from "axios";



class getWeatherAPI {
    static async getLocationId(city){
        const res = await axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`)
        // console.log(res.data)
        return res.data[0].woeid
    }
    static async getWeather(weatherId){
        const res = await axios.get(`https://www.metaweather.com/api/location/${weatherId}/`)
        // console.log(res.data)

        const {title,consolidated_weather} = res.data
        const {weather_state_name, the_temp} = consolidated_weather[0]
        return {
            location: title,
            weather: weather_state_name,
            temperature: parseInt(the_temp * 9/5 + 32)
        }
    }
}

export default getWeatherAPI;
// export const fetchLocationId = async city => {
//     const response = await fetch(
//       `https://www.metaweather.com/api/location/search/?query=${city}`,
//     );
//     const locations = await response.json();
//     return locations[0].woeid;
//   };
  
//   export const fetchWeather = async woeid => {
//     const response = await fetch(
//       `https://www.metaweather.com/api/location/${woeid}/`,
//     );
//     const { title, consolidated_weather } = await response.json();
//     const { weather_state_name, the_temp } = consolidated_weather[0];
  
//     return {
//       location: title,
//       weather: weather_state_name,
//       temperature: the_temp,
//     };
//   };
  