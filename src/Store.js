import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "./WeatherApiSlice";

export default configureStore({
    reducer:{
        weather:WeatherReducer
    }
})