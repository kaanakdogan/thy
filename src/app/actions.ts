'use server';
import { promises as fs } from 'fs';

export async function getFlightsUrl(
  arrivalName: string,
  departureName: string
) {
  const file = await fs.readFile(
    process.cwd() + '/src/data/flights.json',
    'utf8'
  );
  const flights = JSON.parse(file).flights;

  const departureLocation = flights.find(
    (flight: { originAirport: { city: { name: string } } }) =>
      flight.originAirport.city.name.toLowerCase() ===
      departureName.toLocaleLowerCase()
  )?.originAirport;
  if (!departureLocation) {
    throw new Error('Kalkış noktası geçerli değil.');
  }
  const arrivalLocation = flights.find(
    (flight: { destinationAirport: { city: { name: string } } }) =>
      flight.destinationAirport.city.name.toLowerCase() ===
      arrivalName.toLocaleLowerCase()
  )?.destinationAirport;

  if (!arrivalLocation) {
    throw new Error('Varış noktası geçerli değil.');
  }

  return {
    departureCode: departureLocation.city.code,
    arrivalCode: arrivalLocation.city.code,
  };
}

export async function getFlights(departureCode: string, arrivalCode: string) {
  const file = await fs.readFile(
    process.cwd() + '/src/data/flights.json',
    'utf8'
  );
  const flights = JSON.parse(file).flights;

  return flights.filter(
    (flight: {
      originAirport: { city: { code: string } };
      destinationAirport: { city: { code: string } };
    }) =>
      flight.originAirport.city.code === departureCode &&
      flight.destinationAirport.city.code === arrivalCode
  );
}
