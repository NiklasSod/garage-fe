import { useState } from 'react';
import Input from './Input'
import SubmitButton from '../../Button/SubmitButton/SubmitButton';
import type { Car } from '../../Garage'
import styles from './carForm.module.css'

export interface FormData {
  regNumber: string;
  brand: string;
}

export interface FormErrors {
  regNumber: string;
  brand: string;
}

interface ParkCarFormProps {
  handleAddCar: (newCar: Car) => void;
  garageIsFull: boolean;
}

const ParkCarForm = ({handleAddCar, garageIsFull}: ParkCarFormProps) => {
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
    const regnumRegex = /^[A-Z]{3}\d{2}[\dA-Z]$/;
    let isValid = true;

    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Regnumber is required';
      isValid = false;
    }

    if (!regnumRegex.test(formData.regNumber)) {
      newErrors.regNumber = 'Regnumber is in incorrect format';
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
    let updatedValue = value;
    if (name === 'regNumber') {
      updatedValue = value.toUpperCase();
    } else if (name === 'brand' && value.length > 0) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    const fieldName = name as keyof FormErrors;
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      const id = Date.now();
      const car: Car = {
        ...formData, id
      }
      setFormData({
        regNumber: '',
        brand: '',
      });
      handleAddCar(car);
    }
  };

  return (
    <div className={styles.carFormContainer}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
      >
        <Input 
          formData={formData} 
          handleChange={handleChange} 
          errors={errors}
          name="regNumber" 
          ariaLabel="Registration number"
          garageIsFull={garageIsFull}
        />

        <Input 
          formData={formData} 
          handleChange={handleChange} 
          errors={errors}
          name="brand" 
          ariaLabel="Car brand"
          garageIsFull={garageIsFull}
        />

        <SubmitButton 
          text={garageIsFull? "Garage is full" : "Park car"} 
          garageIsFull={garageIsFull}
        />
      </form>
    </div>
  );
}

export default ParkCarForm