import { useState } from 'react'
import CarForm from './components/CarForm'

const App = () => {
  const [carAmount, setCarAmount] = useState<number>(2)
  return (
    <>
      {carAmount > 0 ? <p>Amount of cars in the garage: {carAmount}</p> : <p>The garage is empty</p>}
      <CarForm />
    </>
  )
}

export default App
