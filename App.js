import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, ImageBackground, View } from 'react-native';
import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather';
import getWeatherAPI from './Api'
export default function App() {
  const [location,setLocation] = useState('Los Angeles')
  const [weatherStuff,setWeatherStuff] = useState()
  const getLocation = (place) => {

    setLocation(place)

  }
  useEffect(() => {
    async function getWeatherLocation(){
      // console.log(location)
      let locationId = await getWeatherAPI.getLocationId(location)
      let weatherData = await getWeatherAPI.getWeather(locationId)
      console.log(weatherData)
      setWeatherStuff(weatherData)
    }
    getWeatherLocation();
  },[location])
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground
      source={getImageForWeather('Sleet')}
      style={styles.imageContainer}
      imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{weatherStuff ? weatherStuff.location : location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>{weatherStuff ? weatherStuff.weather : 'Raining Doggos'}</Text>
          <Text style={[styles.largeText, styles.textStyle]}>{weatherStuff ? `${weatherStuff.temperature}°` : 'Temperature'}</Text>
          <SearchInput getLocation={getLocation} placeholder='Search for any city'/>
        </View>
      
      
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily:'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
