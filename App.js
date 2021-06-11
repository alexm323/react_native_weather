import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, ImageBackground, View, Dimensions } from 'react-native';
import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather';
import getWeatherAPI from './Api';
import {Circle} from 'react-native-animated-spinkit';

export default function App() {
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [location,setLocation] = useState('Los Angeles')
  const [weatherData,setweatherData] = useState({
    weather:'Clear'
  })
  const getLocation = (place) => {

    setLocation(place)

  }
  useEffect(() => {
    async function getWeatherData(){
      // console.log(location)
      try {
        let locationId = await getWeatherAPI.getLocationId(location)
        let weatherData = await getWeatherAPI.getWeather(locationId)
        console.log(weatherData)
        setweatherData(weatherData)
        setIsLoaded(true)
      } catch (error) {
        alert("Invalid City")
        setweatherData(weatherData)
        setIsLoaded(true)
      }
      
      
    }
    getWeatherData();
    setIsLoaded(false)
  },[location])
  return (
    <View style={styles.container} >
      {
        !isLoaded ? 
        <>
          <ImageBackground
            source={getImageForWeather(weatherData.weather)}
            style={styles.imageContainer}
            imageStyle={styles.image}
          > 
            <View style={styles.spinContainer}>
              <Circle color='white' size={100}/>
            </View>
        </ImageBackground>
        </>
        :
        <>
          <ImageBackground
          source={getImageForWeather(weatherData.weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
          >
            <View style={styles.detailsContainer}>
              
                
                <Text style={[styles.largeText, styles.textStyle]}>{weatherData.location}</Text>
                <Text style={[styles.smallText, styles.textStyle]}>{weatherData.weather}</Text>
                <Text style={[styles.largeText, styles.textStyle]}>{`${weatherData.temperature}°`}</Text>
                <SearchInput getLocation={getLocation} placeholder='Search for any city'/>
            </View>
          </ImageBackground>
        </>
      }
      


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
    justifyContent:'center'
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
  spinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
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
  }
});
