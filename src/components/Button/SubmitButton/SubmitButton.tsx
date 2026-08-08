interface SubmitButtonProps {
  text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      style={{
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0056b3',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  )
}

export default SubmitButton