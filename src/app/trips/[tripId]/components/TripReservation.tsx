"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
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
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data, "data");
  };

  const startDate = watch("startDate");

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
        })}
        placeholder={`Numero de hóspedes (Max: ${trip.maxGuests})`}
        className='mt-4'
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primaryDarker'>Total: 9973 noites</p>
        <p className='font-medium text-sm text-primaryDarker'>R$ 2500</p>
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
