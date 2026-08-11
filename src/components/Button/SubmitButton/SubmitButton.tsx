import styles from './submitButton.module.css'

interface SubmitButtonProps {
  text: string;
  garageIsFull: boolean;
}

const SubmitButton = ({ text, garageIsFull }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.button}
      disabled={garageIsFull}
      aria-disabled={garageIsFull}
      aria-label={garageIsFull ? 'Garage is full, cannot park more cars' : 'Park the car in the next available spot'}
    >
      {text}
    </button>
  )
}

export default SubmitButton