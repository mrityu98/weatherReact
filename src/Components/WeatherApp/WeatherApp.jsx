import React from "react";
import { useState,useEffect } from "react";
import './WeatherApp.css';
import SearchIcon from '../Assets/search.png';
import ClearIcon from '../Assets/clear.png';
import SnowIcon from '../Assets/snow.png';
import WindIcon from '../Assets/wind.png';
import RainIcon from '../Assets/rain.png';
import HumidityIcon from '../Assets/humidity.png';
import DrizzleIcon from '../Assets/drizzle.png';
import CloudIcon from '../Assets/cloud.png';

const WeatherApp = ()=>{

  const apiKey = '3676f8948305c8a2610f1ee410d7a679';
  const [temp,setTemp]=useState("");
  const [loc,setLoc]=useState("");
  const [condition,setCondition]=useState("");
  const [humidity,setHumidity]=useState("");
  const [windspeed,setWindspeed]=useState("");
  const [weatherIcon,setWeatherIcon]=useState();

  const findIcon = (iconCode) =>{
    if(iconCode === '01d' || iconCode === '01n'){
      return ClearIcon;
     }else if(iconCode === '02d' || iconCode === '02n' || iconCode === '03d' || iconCode === '03n' || iconCode === '50d' || iconCode === '50n'){
      return CloudIcon;
     }else if(iconCode === '04d' || iconCode === '04n' || iconCode === '09d' || iconCode === '09n'){
      return DrizzleIcon;
     }else if(iconCode === '10d' || iconCode === '10n' || iconCode === '11d' || iconCode === '11n'){
      return RainIcon;
     }else if(iconCode === '13d' || iconCode === '13n'){
      return SnowIcon;
     }
   }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(letter) {
      return letter.toUpperCase();
    });
  }
  
  // "Hello World"
  
  
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setTemp(data.main.temp);
        setLoc(data.name);
        setHumidity(data.main.humidity);
        setWindspeed(data.wind.speed);
        setCondition(capitalizeWords(data.weather[0].description));
        setWeatherIcon(findIcon(data.weather[0].icon));
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  useEffect(()=>{
    handleLocationClick();
  },[]);

  const search = async ()=>{
  let element = document.getElementsByClassName('city-input');
  if(element[0].value === ""){
  return 0;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
   

   setTemp(data.main.temp);
   setLoc(data.name);
   setHumidity(data.main.humidity);
   setWindspeed(data.wind.speed);
   setCondition( capitalizeWords(data.weather[0].description));
   setWeatherIcon(findIcon(data.weather[0].icon));

}
    return (
  <div className="container">
    <div className="search-bar">
    <input type="text" className="city-input" placeholder="City"/>
    <div>
    <img src={SearchIcon} alt="" onClick={()=>{search()}}/>
    </div>
  </div>
  <div className="weather-icon">
  <img src={weatherIcon} alt=""/>
  </div>
  <div className="condition">{condition}</div>
  <div className="temperature">{temp === ""?"Temp":temp}°c</div>
  <div className="city">{loc=== ""?"City":loc}</div>
  <div className="data-container">
  <div className="data">
  <img src={HumidityIcon} alt=""></img>
  <div className="data-values">
    <div className="humidity">
    {humidity=== ""?"--":humidity}%
    </div>
    <div className="text">
    Humidity
    </div>
  </div>
  </div>
  <div className="data">
  <img src={WindIcon} alt=""></img>
  <div className="data-values">
    <div className="wind-speed">
    {windspeed=== ""?"--":windspeed}mps
    </div>
    <div className="text">
    Wind Speed
    </div>
  </div>
  </div>
  </div>
  </div>
    );
};

export default WeatherApp;
