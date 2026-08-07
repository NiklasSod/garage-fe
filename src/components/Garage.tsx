import { useState } from 'react'
import ParkCarForm from './Forms/CarForm/CarForm'

export interface Car {
  id: number;
  regNumber: string;
  brand: string;
}

const Garage = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      regNumber: 'ABC123',
      brand: 'Volvo'
    },
    {
      id: 2,
      regNumber: 'DEF45G',
      brand: 'Saab'
    }
  ])

  const handleAddCar = (newCar: Car) => {
    setCars((prev) => [ ...prev, newCar ])
  }

  return (
    <>
      {cars.length > 0 ? <p>Amount of cars in the garage: {cars.length}</p> : <p>The garage is empty</p>}
      <ParkCarForm handleAddCar={handleAddCar} />
    </>
  )
}

export default Garage