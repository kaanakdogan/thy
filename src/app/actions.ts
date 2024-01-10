'use server';
import { promises as fs } from 'fs';

export async function getFlights(arrivalName: string, departureName: string) {
  console.log('cwd', process.cwd());
  const file = await fs.readFile(
    process.cwd() + '/src/data/flights.json',
    'utf8'
  );
  const flights = JSON.parse(file).flights;

  const isDepartureLocationValid = flights.some(
    (flight: { originAirport: { city: { name: string } } }) =>
      flight.originAirport.city.name.toLowerCase() ===
      departureName.toLocaleLowerCase()
  );
  if (!isDepartureLocationValid) {
    throw new Error('Kalkış noktası geçerli değil.');
  }
  const isArrivalLocationValid = flights.some(
    (flight: { destinationAirport: { city: { name: string } } }) =>
      flight.destinationAirport.city.name.toLowerCase() ===
      arrivalName.toLocaleLowerCase()
  );

  if (!isArrivalLocationValid) {
    throw new Error('Varış noktası geçerli değil.');
  }

  const filteredFlights = flights.filter(
    (flight: {
      destinationAirport: { city: { name: string } };
      originAirport: { city: { name: string } };
    }) =>
      flight.destinationAirport.city.name.toLowerCase() ===
        arrivalName.toLocaleLowerCase() &&
      flight.originAirport.city.name.toLowerCase() ===
        departureName.toLocaleLowerCase()
  );

  return { filteredFlights, flights };
}
