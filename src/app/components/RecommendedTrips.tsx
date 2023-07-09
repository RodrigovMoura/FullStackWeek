import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React from "react";

async function getTrips() {
  return await prisma.trip.findMany({});
}

const RecommendedTrips = async () => {
  const data = await getTrips();
  return (
    <>
      <div className='container mx-auto p-5'>
        <div className='flex items-center'>
          <div className='w-full h-[1px] bg-grayLighter'></div>
          <h2 className='px-5 font-medium text-grayPrimary whitespace-nowrap'>Destinos recomendados</h2>
          <div className='w-full h-[1px] bg-grayLighter'></div>
        </div>

        <div className='flex flex-col items-center mt-5 lg:mt-12 gap-6 lg:gap-10 lg:flex-row lg:flex-wrap lg:justify-center'>
          {data.map((trip: Trip) => (
            <TripItem trip={trip} key={trip.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedTrips;
