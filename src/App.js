import React, { useState, useEffect, use } from "react";
import "./App.css";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import moment from "moment";
import { useTranslation } from 'react-i18next';
import "moment/locale/ar";

moment.locale('ar');
// 🎨 Theme
const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans Arabic, sans-serif",
  },
});

let CancelAxsios = null;

function App() {
  const { t, i18n } = useTranslation();
  const [dateandtime, setDateandtime] = useState("");
  const [langauge, setLanguage] = useState('ar');
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  function handleLanguageClick(){
    if(langauge === 'en'){
      setLanguage('ar');
       i18n.changeLanguage('ar');
       moment.locale('ar');
    }
    else{
      setLanguage('en');
       i18n.changeLanguage('en');
       moment.locale('en');

    }
}
   
   useEffect(()=>{
      i18n.changeLanguage('ar');
   },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setDateandtime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, );

    return () => clearInterval(interval);
  }, []);

  // Weather useEffect
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.9539&lon=35.9106&appid=c1f913999115e2fccfaed49c5b3cd31c",
        {
          cancelToken: new axios.CancelToken((c) => {
            CancelAxsios = c;
          }),
        }
      )
      .then(function (response) {
        const responsetemp = Math.round(response.data.main.temp - 273.15);
        const responsemin = Math.round(response.data.main.temp_min - 273.15);
        const responsetmax = Math.round(response.data.main.temp_max - 273.15);
        const responsetdescription = response.data.weather[0].description;
        const responseticon = response.data.weather[0].icon;

        setTemp({
          number: responsetemp,
          description: responsetdescription,
          min: responsemin,
          max: responsetmax,
          icon: `https://openweathermap.org/img/wn/${responseticon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      if (CancelAxsios) {
        console.log("Canceling Axios Request...");
        CancelAxsios();
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="sm">
        {/* Center Screen */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* Card */}
          <div
          dir={langauge === 'en' ? 'ltr' : 'rtl'}
            style={{
              background: "rgb(28 52 91 / 36%)",
              color: "white",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 0 10px 0 rgb(28 52 91 / 36%)",
              width: "100%",
            }}
          >
            {/* Header */}
            <div
            
            dir={langauge === 'en' ? 'ltr' : 'rtl'}

              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h1" sx={{ mr: 2 }}>
                {t('Amman')}
              </Typography>

              <Typography variant="h5" sx={{marginRight:'20px'}} >{dateandtime}</Typography>
            </div>

            <hr />

            {/* Temperature Section */}
            <div
          dir={langauge === 'en' ? 'ltr' : 'rtl'}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Right Side — Text */}
              <div style={{ textAlign: "right" }}>
                
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h1">{temp.number}°C</Typography>

                  {temp.icon && (
                    <img
                      src={temp.icon}
                      alt="weather icon"
                      style={{ width: "80px", height: "80px" }}
                    />
                  )}
                </div>

                <Typography variant="h6">{t(temp.description)}</Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>
                    {t('max')}: {temp.max}° | {t('min')}: {temp.min}°
                  </h5>
                </div>
              </div>

              {/* Left Side — Icon */}
              <CloudIcon
                sx={{
                  fontSize: 180,
                  color: "white",
                  opacity: 0.7,
                }}
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
            <Button variant="text" sx={{color:'white'
            }}
             onClick={handleLanguageClick}
            
            >
             {langauge ===  'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;