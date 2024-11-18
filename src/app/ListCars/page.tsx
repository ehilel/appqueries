"use client";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getCars, addCar, deleteCar, updateCar } from '../../services/car';
import CarCard from '@/components/CarCard/CarCard';

export default function ListCars() {
  interface Car {
    _id?: string;
    model: string;
    number: string;
    color: string;
  }

  const { data, isLoading, isError, error } = useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: getCars,
    staleTime: 10000
  });

  console.log(3333, data);

  return (
    <div>
      <h1>Cars List</h1>
      {isLoading ? (
        <p>Loading cars...</p>
      ) : isError ? (
        <p>Error loading cars</p>
      ) : (
        <div>
          {data?.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

