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
    >
      {text}
    </button>
  )
}

export default SubmitButton