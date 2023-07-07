import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_request: Request, { params: { reservationId } }: { params: { reservationId: string } }) {
  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: "Missing userId",
      },
    };
  }

  const reservations = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  if (!reservations) {
    return {
      status: 400,
      body: {
        message: "Reservation not deleted",
      },
    };
  }

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
