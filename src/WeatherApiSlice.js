import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk لجلب بيانات الطقس
export const fetchWeather = createAsyncThunk(
  "weatherapi/fetchweather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.9539&lon=35.9106&appid=c1f913999115e2fccfaed49c5b3cd31c"
    );

    const responsetemp = Math.round(response.data.main.temp - 273.15);
    const responsemin = Math.round(response.data.main.temp_min - 273.15);
    const responsetmax = Math.round(response.data.main.temp_max - 273.15);
    const responsetdescription = response.data.weather[0].description;
    const responseticon = response.data.weather[0].icon;

    return {
      number: responsetemp,
      min: responsemin,
      max: responsetmax,
      description: responsetdescription,
      icon: `https://openweathermap.org/img/wn/${responseticon}@2x.png`,
    };
  }
);

const WeatherSlice = createSlice({
  name: "weatherapi",
  initialState: {
    weatherdata: {},
    isloading: false,
    result: "empty",
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isloading = false;
        state.weatherdata = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.isloading = false;
        state.result = "failed";
      });
  },
});

export const { changeResult } = WeatherSlice.actions;
export default WeatherSlice.reducer;