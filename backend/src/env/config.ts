export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  airportApiKey: process.env.AEROPORT_API_KEY,
  aeroDataBoxApiKey: process.env.AERODATABOX_API_KEY,
});