import { Trip } from "@prisma/client";
import React from "react";

interface TripDescriptionProps {
  description: Trip["description"];
}

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className='flex flex-col p-5'>
      <h2 className='font-semibold text-primaryDarker'>Sobre a viagem</h2>
      <p className='text-xs leading-5 text-primaryDarker mt-2'>{description}</p>
    </div>
  );
};

export default TripDescription;
