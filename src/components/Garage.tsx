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

  const [announcement, setAnnouncement] = useState('');
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
      setAnnouncement(
        `${newCar.brand} with registration ${newCar.regNumber.split('').join(' ')} parked in spot ${firstEmptyIndex + 1}.`
      );
      return updated;
    });
  }

  const removeCar = (carToRemove: number) => {
    setCars((prev) => {
      const updated = [...prev];
      const removedCar = updated[carToRemove];
      if (removedCar) {
        setAnnouncement(
          `${removedCar.brand} with registration ${removedCar.regNumber.split('').join(' ')} removed from spot ${carToRemove + 1}.`
        );
      }
      updated[carToRemove] = null;
      return updated;
    });
  };

  return (
    <div className={styles.garageContainer}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {announcement}
      </div>

      <h1 className={styles.heading} aria-live="polite">
        {garageIsFull 
          ? `Cars in the garage: ${parkedCarsCount} of ${totalSpots} (full)`
          : parkedCarsCount > 0
            ? `Cars in the garage: ${parkedCarsCount} of ${totalSpots}`
            : 'The garage is empty'}
      </h1>
      <ParkCarForm 
        handleAddCar={handleAddCar}
        garageIsFull={garageIsFull}
        cars={cars}
      />
      <section
        className={styles.cardGridContainer}
        aria-label={`Parking spots grid, ${parkedCarsCount} of ${totalSpots} occupied`}
      >
        <div className={styles.cardGrid} role="list">
          {cars.map((car, index) => (
            <div 
              key={index}
              className={`${styles.card} ${styles.dashedTopBottomBorder}`}
              role="listitem"
              aria-label={
                car
                  ? `Spot ${index + 1}: ${car.brand}, ${car.regNumber.split('').join(' ')}`
                  : `Spot ${index + 1}: empty`
              }
            >
              {car ? (
                <>
                  <div>{car.brand}</div>
                  <small aria-label={`Registration number ${car.regNumber.split('').join(' ')}`}>
                    {car.regNumber}
                  </small>
                  <button 
                    onClick={() => removeCar(index)}
                    className={styles.delBtn}
                    aria-label={`Remove ${car.brand} ${car.regNumber.split('').join(' ')} from spot ${index + 1}`}
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
      </section>
    </div>
  )
}

export default Garage