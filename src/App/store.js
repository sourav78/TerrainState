import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../Redux Slicer/Weather State/WeatherStateSlice"

export const store = configureStore({
    reducer: weatherReducer
})