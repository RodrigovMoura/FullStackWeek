"use client";

import Button from "@/components/Button";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface UserReservationItemsProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  fetchReservations: () => void;
}

const UserReservationItems = ({ reservation, fetchReservations }: UserReservationItemsProps) => {
  const router = useRouter();

  const handleDeleteReservation = async () => {
    const res = await fetch(`http://localhost:3000/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    });

    if (!res.ok) return toast.error("Erro ao cancelar reserva", { position: "top-center" });

    toast.success("Reserva cancelada com sucesso!", { position: "top-center" });

    fetchReservations();
  };

  return (
    <div className=''>
      {/* card */}
      <div className='flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg'>
        <div className='flex items-center gap-3 pb-5 border-b border-grayLighter border-solid'>
          <div className='relative h-[106px] w-[124px]'>
            <Image
              src={reservation?.trip?.coverImage}
              fill
              style={{ objectFit: "cover" }}
              alt='Image representando destino escolhido'
              className='rounded-lg'
            />
          </div>

          <div className='flex flex-col'>
            <h2 className='text-xl text-primaryDarker font-semibold ga'>{reservation?.trip?.name}</h2>
            <div className='flex items-center gap-1'>
              <ReactCountryFlag countryCode={reservation?.trip?.countryCode} svg />
              <p className='text-xs text-grayPrimary underline'>{reservation?.trip?.location}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-5 text-primaryDarker'>
          <h3 className='text-sm'>Data</h3>
          <div className='flex items-center gap-1'>
            <p className='text-sm'>{format(new Date(reservation?.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
            {" - "}
            <p className='text-sm'>{format(new Date(reservation?.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
          </div>

          <h3 className=' mt-5 text-sm'>Hóspedes</h3>
          <p className='text-sm'>{reservation.guests} hóspedes</p>
        </div>

        <h3 className='font-semibold text-primaryDarker mt-5 pt-5 border-t border-solid border-grayLighter '>
          Informações sobre o preço
        </h3>

        <div className='flex justify-between mt-1'>
          <p className='font-medium text-sm text-primaryDarker mt-1'>Total</p>
          <p className='text-primaryDarker text-sm'>R$ {Number(reservation?.totalPaid)}</p>
        </div>

        <Button onClick={handleDeleteReservation} variant='danger' className='mt-5'>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default UserReservationItems;
