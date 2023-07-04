import React from "react";
import { prisma } from "../../../lib/prisma";

const getTrips = async () => {
  const trips = await prisma.trip.findMany({});

  return trips;
};

const Trips = async () => {
  const data = await getTrips();

  const results = await fetch("http://jsonplaceholder.typicode.com/posts", { next: { revalidate: 0 } }).then((res) =>
    res.json()
  );

  return (
    <div>
      {results.map((result: any) => (
        <>
          <p key={result.id}>{result.title}</p> <br></br>
        </>
      ))}
    </div>
  );
};

export default Trips;
