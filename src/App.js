import React, { useState, useEffect } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./WeatherApiSlice";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans Arabic, sans-serif",
  },
});

function App() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  

  const weatherData = useSelector((state) => state.weather.weatherdata);
  const isLoading = useSelector((state) => state.weather.isloading);

  const [dateandtime, setDateandtime] = useState("");
  const [language, setLanguage] = useState("ar");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  function handleLanguageClick() {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDateandtime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  useEffect(() => {
    if (weatherData && Object.keys(weatherData).length > 0) {
      setTemp(weatherData);
    }
  }, [weatherData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            dir={language === "en" ? "ltr" : "rtl"}
            style={{
              background: "rgb(28 52 91 / 36%)",
              color: "white",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 0 10px 0 rgb(28 52 91 / 36%)",
              width: "100%",
            }}
          >
            <div
              dir={language === "en" ? "ltr" : "rtl"}
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <Typography variant="h1" sx={{ mr: 2 }}>
                {t("Amman")}
              </Typography>
              <Typography variant="h5" sx={{ marginRight: "20px" }}>
                {dateandtime}
              </Typography>
            </div>

            <hr />

            <div
              dir={language === "en" ? "ltr" : "rtl"}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {isLoading && !temp.number ? (
                    <CircularProgress sx={{ color: "white", mr: 2 }} />
                  ) : null}

                  <Typography variant="h1">{temp.number ?? "-" }°C</Typography>

                  {temp.icon && (
                    <img
                      src={temp.icon}
                      alt="weather icon"
                      style={{ width: "80px", height: "80px", marginLeft: "10px" }}
                    />
                  )}
                </div>

                {temp.description && (
                  <Typography variant="h6">{t(temp.description)}</Typography>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>
                    {t("max")}: {temp.max ?? "-"}° | {t("min")}: {temp.min ?? "-"}°
                  </h5>
                </div>
              </div>

              <CloudIcon
                sx={{ fontSize: 180, color: "white", opacity: 0.7 }}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "20px",
              color: "white",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={handleLanguageClick}
            >
              {language === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;