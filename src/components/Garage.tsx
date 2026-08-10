import { useState } from 'react'
import ParkCarForm from './Form/CarForm/CarForm'
import styles from './garage.module.css'

export interface Car {
  id: number;
  regNumber: string;
  brand: string;
}

const Garage = () => {

  const totalSpots = 8;

  const [cars, setCars] = useState<(Car | null)[]>([
    {
      id: 1,
      regNumber: 'ABC123',
      brand: 'Volvo'
    },
    {
      id: 2,
      regNumber: 'DEF45G',
      brand: 'Saab'
    },
    null,
    null,
    null,
    null,
    null,
    null
  ])

  const parkedCarsCount = cars.filter((spot): spot is Car => spot !== null).length;
  const garageIsFull = parkedCarsCount >= totalSpots;

  const handleAddCar = (newCar: Car) => {
    setCars((prev) => {
      const firstEmptyIndex = prev.findIndex((spot) => spot === null);
      if (firstEmptyIndex === -1) return prev;
      
      const updated = [...prev];
      updated[firstEmptyIndex] = newCar;
      return updated;
    });
  }

  const removeCar = (carToRemove: number) => {
    setCars((prev) => {
      const updated = [...prev];
      updated[carToRemove] = null;
      return updated;
    });
  };

  return (
    <div className={styles.garageContainer}>
      {cars.length > 0 
        ? <h1 className={styles.heading}>Amount of cars in the garage: {cars.length}</h1> 
        : <h1 className={styles.heading}>The garage is empty</h1>
      }
      <ParkCarForm 
        handleAddCar={handleAddCar}
        garageIsFull={garageIsFull}
      />
      <div className={styles.cardGridContainer}>
        <div className={styles.cardGrid}>
          {cars.map((car, index) => (
            <div 
              key={index}
              className={`${styles.card} ${styles.dashedTopBottomBorder}`}
            >
              {car ? (
                <>
                  <div>{car.brand}</div>
                  <small>{car.regNumber}</small>
                  <button onClick={() => removeCar(index)}>Take car</button>
                </>
              ) : (
                <>
                  <div>Parking: {index + 1}</div>
                  <small>Empty</small>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Garage