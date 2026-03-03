Weather App – Real-Time Weather Dashboard

Weather App is a modern, responsive React application that provides real-time weather information for Amman (or any configured location). The app fetches live weather data from a weather API, including temperature, weather conditions, and forecasts, presenting it in a visually appealing, user-friendly interface.

🌟 Key Features

Real-Time Weather Data via API

Fetches current temperature, min/max values, and weather description from a weather API.

Weather icons update dynamically according to conditions.

Live Date and Time Display

Updates every second using moment.js.

Supports both Arabic and English locales.

Multilingual Support

Toggle between Arabic and English seamlessly using react-i18next.

All labels, descriptions, and time formatting adapt to the selected language.

Responsive Design

Optimized for mobile, tablet, and desktop screens using Material UI components.

Loading State Feedback

Shows a circular progress indicator while fetching weather data.

Redux Integration

Uses Redux Toolkit to manage application state and fetch API data asynchronously.

Custom Theming

Material UI theme with Arabic-compatible fonts (IBM Plex Sans Arabic) for a polished appearance.

🛠 Technologies Used

React – Component-based UI library

Redux Toolkit – State management and API handling

Material UI – UI components and theming

Moment.js – Date and time formatting

React-i18next – Internationalization support

Weather API – Fetch live weather data

CSS3 – Styling and responsive design

📌 How It Works

On load, the app fetches weather data from a weather API using Redux Toolkit.

While fetching, a loading spinner is displayed.

Once data is received, the temperature, weather description, min/max values, and corresponding icon are shown.

Users can toggle the language between Arabic and English, which updates all text and date/time formats instantly.

🎯 Project Highlights

Focus on clean UI/UX with Material Design principles.

Fully bi-directional layout support for RTL (Arabic) and LTR (English).

Easily extendable to support multiple locations or additional weather details.
