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
    <div className={styles.garageContainer}>
      {cars.length > 0 
        ? <h1 className={styles.heading}>Amount of cars in the garage: {cars.length}</h1> 
        : <h1 className={styles.heading}>The garage is empty</h1>
      }
      <ParkCarForm handleAddCar={handleAddCar} />
      <div className={styles.cardGridContainer}>
        <div className={styles.cardGrid}>
          {/* {cars.map((car, i) => {
            return (
              <div 
                className={`${styles.card} ${styles.dashedTopBottomBorder}`}
              >
                Car {i + 1}
              </div>
            )
          })}
           */}
          {Array.from({ length: totalSpots }).map((_, i) => {
            const car = cars[i];
            return (
              <div 
                key={car ? car.id : `empty-${i}`}
                className={`${styles.card} ${styles.dashedTopBottomBorder}`}
              >
                {car ? (
                  <>
                    <p>Garagespot: {i + 1}</p>
                    <div>{car.brand}</div>
                    <small>{car.regNumber}</small>
                  </>
                ) : (
                  <>
                    <div>Garagespot: {i + 1}</div>
                    <small>Empty</small>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Garage