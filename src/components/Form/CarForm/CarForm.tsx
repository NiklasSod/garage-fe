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
}

const ParkCarForm = ({handleAddCar}: ParkCarFormProps) => {
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
      const id = Date.now();
      const car: Car = {
        ...formData, id
      }
      // console.log('Form data submitted:', car);
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
        />

        <Input 
          formData={formData} 
          handleChange={handleChange} 
          errors={errors}
          name="brand" 
          ariaLabel="Car brand"
        />

        <SubmitButton text="Park car" />
      </form>
    </div>
  );
}

export default ParkCarForm