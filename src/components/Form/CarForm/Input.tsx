import type { FormData, FormErrors } from "./CarForm"
import styles from './input.module.css'

interface InputProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  name: keyof FormData;
  ariaLabel: string;
  garageIsFull: boolean;
}

const Input = ({ formData, handleChange, errors, name, ariaLabel, garageIsFull }: InputProps) => {
  const errorId = `${name}-error`;

  return (
    <div className={styles.inputWrapper}>
      <label
        htmlFor={name}
        style={{ fontWeight: 'bold', fontSize: '0.9rem' }}
      >
        {ariaLabel}
      </label>

      <input
        type="text"
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        aria-label={ariaLabel}
        aria-required="true"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        disabled={garageIsFull}
        style={{
          padding: '0.5rem 0.75rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: errors[name] ? '2px solid #d32f2f' : '1px solid #767676',
          outlineColor: errors[name] ? '#d32f2f' : '#0056b3',
        }}
      />

      {errors[name] && (
        <span
          id={errorId}
          role="alert"
          style={{
            color: '#d32f2f',
            fontSize: '0.85rem',
            marginTop: '0.25rem',
          }}
        >
          {errors[name]}
        </span>
      )}
    </div>
  )
}

export default Input;