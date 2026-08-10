import styles from './submitButton.module.css'

interface SubmitButtonProps {
  text: string;
  isFull: boolean;
}

const SubmitButton = ({ text, isFull }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.button}
      disabled={isFull}
    >
      {text}
    </button>
  )
}

export default SubmitButton