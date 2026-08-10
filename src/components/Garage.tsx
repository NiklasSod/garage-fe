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
      regNumber: 'BVC823',
      brand: 'Volvo'
    },
    {
      id: 2,
      regNumber: 'DHA95G',
      brand: 'Saab'
    },
    {
      id: 3,
      regNumber: 'JKL90J',
      brand: 'Volkswagen'
    },
    {
      id: 4,
      regNumber: 'MNO12K',
      brand: 'BMW'
    },
    {
      id: 5,
      regNumber: 'PQR34L',
      brand: 'Audi'
    },
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
      {garageIsFull 
        ? <h1 className={styles.heading}>Cars in the garage: {cars.length} (full)</h1> 
        : parkedCarsCount > 0
          ? <h1 className={styles.heading}>Cars in the garage: {parkedCarsCount}</h1>
          : <h1 className={styles.heading}>The garage is empty</h1>
      }
      <ParkCarForm 
        handleAddCar={handleAddCar}
        garageIsFull={garageIsFull}
        cars={cars}
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
                  <button 
                    onClick={() => removeCar(index)}
                    className={styles.delBtn}
                  >
                    Take car
                  </button>
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