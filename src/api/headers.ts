export const headers = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': import.meta.env.VITE_YAHOO_API_KEY,
};

export const weatherApiHeaders = { ...headers, 'X-RapidAPI-Host': import.meta.env.VITE_YAHOO_API_HOST };
export const citiesApiHeaders = { ...headers, 'X-RapidAPI-Host': import.meta.env.VITE_GEO_DB_HOST };
