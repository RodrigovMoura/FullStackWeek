import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();

  const { tripId, startDate, endDate, userId, totalPaid, guests } = res;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    return new NextResponse(JSON.stringify({ error: { code: "TRIP_NOT_FOUND" } }));
  }

  await prisma.tripReservation.create({
    data: {
      tripId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      guests,
      totalPaid,
    },
  });

  return new NextResponse(JSON.stringify({ success: true }), { status: 201 });
}
