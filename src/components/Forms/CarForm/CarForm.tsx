import { useState } from 'react';
import Input from './Input'

export interface FormData {
  regNumber: string;
  brand: string;
}

export interface FormErrors {
  regNumber: string;
  brand: string;
}

const ParkCarForm = () => {
  const [formData, setFormData] = useState<FormData>({
    regNumber: '',
    brand: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    regNumber: '',
    brand: '',
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = { regNumber: '', brand: '' };
    let isValid = true;

    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Regnumber is required';
      isValid = false;
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldName = name as keyof FormErrors;
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data submitted:', formData);
      // TODO do stuff
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Input 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors}
            name="regNumber" 
            ariaLabel="Registration number"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Input 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors}
            name="brand" 
            ariaLabel="Car brand"
          />
        </div>

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
          Park car
        </button>
      </form>
    </div>
  );
}

export default ParkCarForm