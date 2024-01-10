import { getFlights } from '@/app/actions';
import { FlightList } from '@/app/components/flightList';

export default async function Page({
  params,
}: {
  params: { from: string; to: string; count: number };
}) {
  const { from, to, count } = params;

  const data = await getFlights(from, to);
  const departureCity = data[0].originAirport.city.name;
  const arrivalCity = data[0].destinationAirport.city.name;

  return (
    <main className='m-auto flex flex-col items-start justify-around p-5 text-sm sm:w-full md:w-full lg:w-4/5 xl:w-3/4 2xl:w-1/2'>
      <div className='self-start bg-[#E81932] text-white'>
        <p className='pl-3 pr-3'>Uçuş</p>
      </div>
      <div className='self-start pt-1 text-xl'>
        {departureCity} - {arrivalCity}, {count} Yolcu
      </div>
      <FlightList data={data} count={count} />
    </main>
  );
}
