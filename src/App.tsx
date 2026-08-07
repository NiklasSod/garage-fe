import { useState } from 'react'
import ParkCarForm from './components/Forms/CarForm/CarForm'

const App = () => {
  const [carAmount, setCarAmount] = useState<number>(2)

  const handleAddCar = () => {
    setCarAmount((prev) => prev + 1)
  }

  return (
    <>
      {carAmount > 0 ? <p>Amount of cars in the garage: {carAmount}</p> : <p>The garage is empty</p>}
      <ParkCarForm handleAddCar={handleAddCar} />
    </>
  )
}

export default App
