"use client";

import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { ptBR } from "date-fns/locale";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState({} as Trip);
  const [totalPrice, setTotalPrice] = useState(0);

  const { status } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });

      const { trip, totalPrice } = await response.json();

      setTrip(trip);
      setTotalPrice(totalPrice);
    };

    if (status === "unauthenticated") {
      router.push("/");
    }

    fetchTrip();
  }, [status]);

  if (!trip) return null;
  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = Number(searchParams.get("guests"));

  return (
    <div className='container mx-auto p-5'>
      <h1 className='font-semibold text-xl text-primaryDarker'>Sua viagem</h1>

      {/* card */}
      <div className='flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg'>
        <div className='flex items-center gap-3 pb-5 border-b border-grayLighter border-solid'>
          <div className='relative h-[106px] w-[124px]'>
            <Image src={trip?.coverImage} fill style={{ objectFit: "cover" }} alt={trip.name} className='rounded-lg' />
          </div>

          <div className='flex flex-col'>
            <h2 className='text-xl text-primaryDarker font-semibold ga'>{trip.name}</h2>
            <div className='flex items-center gap-1'>
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className='text-xs text-grayPrimary underline'>{trip.location}</p>
            </div>
          </div>
        </div>

        <h3 className='font-semibold text-lg text-primaryDarker mt-3'>Informações sobre o preço</h3>

        <div className='flex justify-between mt-1'>
          <p className='font-medium text-primaryDarker'>Total</p>
          <p className='text-primaryDarker'>R$ {totalPrice}</p>
        </div>
      </div>

      <div className='flex flex-col mt-5 text-primaryDarker'>
        <h3 className='font-semibold '>Data</h3>
        <div className='flex items-center gap-1 mt-1'>
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className='font-semibold mt-5'>Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className='mt-5'>Confirmar compra</Button>
      </div>
    </div>
  );
};

export default TripConfirmation;
