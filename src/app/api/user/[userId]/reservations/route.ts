import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
  const { searchParams } = new URL(request.url);

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Missing userId" }), { status: 400 });
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  });

  if (!reservations || reservations.length === 0) {
    return new NextResponse(JSON.stringify({ message: "Reservation not found" }), { status: 400 });
  }

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
