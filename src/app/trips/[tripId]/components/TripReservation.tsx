"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  trip: Trip;
}

interface TripReservationForm {
  guests: number;
  startDate?: Date | null;
  endDate?: Date | null;
}

const TripReservation = ({ trip }: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const router = useRouter();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId: trip.id,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", { message: "Esta data já está reservada.", type: "manual" });
      return setError("endDate", { message: "Esta data já está reservada.", type: "manual" });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", { message: "Data inválida.", type: "manual" });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", { message: "Data inválida.", type: "manual" });
    }

    router.push(
      `/trips/${
        trip.id
      }/confirmation?startDate=${data?.startDate?.toISOString()}&endDate=${data?.endDate?.toISOString()}&guests=${
        data?.guests
      }`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className='flex flex-col px-5 '>
      <div className='flex gap-4'>
        <Controller
          name='startDate'
          rules={{
            required: {
              value: true,
              message: "Campo obrigatório",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              placeholderText='Data de início'
              className='w-full'
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              minDate={trip.startDate}
            />
          )}
        />

        <Controller
          name='endDate'
          rules={{
            required: {
              value: true,
              message: "Campo obrigatório",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              placeholderText='Data final'
              className='w-full'
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              minDate={startDate ?? trip.startDate}
              maxDate={trip.endDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Campo obrigatório",
          },
          max: {
            value: trip.maxGuests,
            message: `O número máximo de hóspedes não pode ser maior que ${trip.maxGuests}.`,
          },
        })}
        placeholder={`Numero de hóspedes (Max: ${trip.maxGuests})`}
        className='mt-4'
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        type='number'
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primaryDarker'>
          Total de dias {startDate && endDate ? ` ${differenceInDays(endDate, startDate)}` : "0"}{" "}
        </p>
        <p className='font-medium text-sm text-primaryDarker'>
          {startDate && endDate ? `R$${differenceInDays(endDate, startDate) * Number(trip.pricePerDay)}` : "R$ 0"}
        </p>
      </div>

      <div className='pb-10 border-b border-grayLighter w-full'>
        <Button onClick={() => handleSubmit(onSubmit)()} className='mt-3 w-full'>
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
