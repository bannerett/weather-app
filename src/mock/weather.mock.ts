import { WeatherResponse } from '~/types/weather';

export const weatherMock = {
  location: {
    city: 'Sunnyvale',
    woeid: 2502265,
    country: 'United States',
    lat: 37.371609,
    long: -122.038254,
    timezone_id: 'America/Los_Angeles',
  },
  current_observation: {
    pubDate: 1692655810,
    wind: {
      chill: 22,
      direction: 'SW',
      speed: 6,
    },
    atmosphere: {
      humidity: 72,
      visibility: 10,
      pressure: 1015.2,
    },
    astronomy: {
      sunrise: '6:29 AM',
      sunset: '7:53 PM',
    },
    condition: {
      temperature: 23,
      text: 'Cloudy',
      code: 26,
    },
  },
  forecasts: [
    {
      day: 'Mon',
      date: 1692633600,
      high: 28,
      low: 17,
      text: 'Mostly Cloudy',
      code: 28,
    },
    {
      day: 'Tue',
      date: 1692720000,
      high: 30,
      low: 17,
      text: 'Partly Cloudy',
      code: 30,
    },
    {
      day: 'Wed',
      date: 1692806400,
      high: 34,
      low: 17,
      text: 'Sunny',
      code: 32,
    },
    {
      day: 'Thu',
      date: 1692892800,
      high: 32,
      low: 15,
      text: 'Sunny',
      code: 32,
    },
    {
      day: 'Fri',
      date: 1692979200,
      high: 29,
      low: 14,
      text: 'Partly Cloudy',
      code: 30,
    },
    {
      day: 'Sat',
      date: 1693065600,
      high: 29,
      low: 17,
      text: 'Mostly Sunny',
      code: 34,
    },
    {
      day: 'Sun',
      date: 1693152000,
      high: 29,
      low: 16,
      text: 'Mostly Cloudy',
      code: 28,
    },
    {
      day: 'Mon',
      date: 1693238400,
      high: 26,
      low: 15,
      text: 'Mostly Cloudy',
      code: 28,
    },
    {
      day: 'Tue',
      date: 1693324800,
      high: 27,
      low: 17,
      text: 'Partly Cloudy',
      code: 30,
    },
    {
      day: 'Wed',
      date: 1693411200,
      high: 27,
      low: 17,
      text: 'Mostly Cloudy',
      code: 28,
    },
    {
      day: 'Thu',
      date: 1693497600,
      high: 28,
      low: 17,
      text: 'Mostly Cloudy',
      code: 28,
    },
  ],
} satisfies WeatherResponse;
