import React from 'react'

interface Car {
  _id?: string;
  model: string;
  number: string;
  color: string;
}

interface CarCardProps {
  car: Car;
  onDelete: () => void; 
  onUpdate: () => void;  
}
export const CarCard: React.FC<CarCardProps> = ({car, onDelete, onUpdate}) => {

  return (
    <div >
      <h3 >{car.model}</h3>
      <p><strong>Number:</strong> {car.number}</p>
      <p><strong>Color:</strong> {car.color}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onUpdate}>Update</button>
    </div>
  )
}

export default CarCard