# FLIGHTS API
Flights API is a single-page web app that allows to monitor flight departures and arrivals at various airports around the world. Developed with modern technologies, such as [React v18.2](https://reactjs.org/) and [NestJs v9.0](https://nestjs.com/), it uses api endpoints to obtain data on schedules and delays.

## Working sample

  The app is deployed [here](https://flights.pavelgrinkevich.com) using [Google Cloud Platform](https://cloud.google.com/).

## Technologies

### Backend
  [NestJs](https://nestjs.com/) is used on backend. It serves `/api/airports`, `/api/airports/detailed`, `/api/airports/distance`, `/api/airports/nearby` that provide information on commercial airports and their distance from user's location. Current schedules and delays for each airport are available at `api/flights` that is a wrapper for a freemium [AeroDataBox API](https://aerodatabox.com/). The backend serves mock data once free request limit per month is reached.

### Frontend

  [React Javascript Library v18.2](https://reactjs.org/) is used for the frontend. Routes are implemented with [ReactRouter v6](https://reactrouter.com/). [Vite](https://vitejs.dev/) is used as a fast and comprehensive alternative for React development envinronment.