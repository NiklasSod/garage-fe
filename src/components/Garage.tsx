import { useState } from 'react'
import ParkCarForm from './Form/CarForm/CarForm'
import styles from './garage.module.css'

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
    <div className={styles.garageContainer}>
      {cars.length > 0 
        ? <h1 className={styles.heading}>Amount of cars in the garage: {cars.length}</h1> 
        : <h1 className={styles.heading}>The garage is empty</h1>
      }
      <ParkCarForm handleAddCar={handleAddCar} />
      <div className={styles.cardGridContainer}>
        <div className={styles.cardGrid}>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 1</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 2</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 3</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 4</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 5</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 6</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 7</div>
          <div className={styles.card + " " + styles.dashedTopBottomBorder}>Car 8</div>
        </div>
      </div>
    </div>
  )
}

export default Garage