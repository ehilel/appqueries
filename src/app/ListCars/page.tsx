"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, addCar, deleteCar, updateCar } from '../../services/car';
import CarCard from '@/components/CarCard/CarCard';

export default function ListCars() {
  interface Car {
    _id?: string;
    model: string;
    number: string;
    color: string;
  }

  const { data, isLoading, isError, error } = useQuery<Car[]>({ queryKey: ['cars'], queryFn: getCars, staleTime: 10000 });
  const queryClient = useQueryClient();
  const [newCar, setNewCar] = useState<Car>({ model: "", number: "", color: "", });
  const [editCar, setUpdateCar] = useState<Car>({ model: '', number: '', color: '' });

  const createCarMutation = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      setNewCar({ model: "", number: "", color: "" });
    },
    onError: (error) => {
      console.error("Error adding car:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (error) => {
      console.error("Error adding car:", error);
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      setUpdateCar({ model: '', number: '', color: '' });
    },
    onError: (error) => {
      console.error("Error updating car:", error);
    },
  });

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    createCarMutation.mutate(newCar);
  };

  const handleUpdateCar = (e: React.FormEvent) => {
    e.preventDefault();
    updateCarMutation.mutate(editCar);
  };

  const update=(car:Car)=>{
    setUpdateCar(car)
  }

  return (
    <div>
      <h1>Cars List</h1>
      <form onSubmit={handleAddCar} className='form-layout'>
        <input
          type="text"
          placeholder="Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Number"
          value={newCar.number}
          onChange={(e) => setNewCar({ ...newCar, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Color"
          value={newCar.color}
          onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        />
        <button type="submit">Add Car</button>
      </form>
      {isLoading && <p>Loading cars...</p>}
      <div>
        {data?.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            onDelete={() => deleteMutation.mutate(car._id)}
            onUpdate={() => update(car)}
          />
        ))}
      </div>
      <div>
        <h2>Update Car</h2>
        <input
          type="text"
          placeholder="Model"
          value={editCar.model}
          onChange={(e) => setUpdateCar({ ...editCar, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Number"
          value={editCar.number}
          onChange={(e) => setUpdateCar({ ...editCar, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Color"
          value={editCar.color}
          onChange={(e) => setUpdateCar({ ...editCar, color: e.target.value })}
        />
        <button onClick={handleUpdateCar}>update Car</button>
      </div>
    </div>
  );
}

