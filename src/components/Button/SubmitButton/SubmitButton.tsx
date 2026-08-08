import styles from './submitButton.module.css'

interface SubmitButtonProps {
  text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.button}
    >
      {text}
    </button>
  )
}

export default SubmitButton