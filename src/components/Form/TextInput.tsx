import React from 'react';
import { useFormContext } from 'react-hook-form';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import LabelName from './LabelName';
import FormErrorMessage from '../ErrorMessage/FormErrorMessage';

interface TextInputProps {
  fieldName: string;
  text: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ fieldName, text, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = (errors[fieldName] && (errors[fieldName]?.message as string)) || '';
  return (
    <div className={layoutClass}>
      <div className={leftSideClass}>
        <LabelName label={text} htmlFor={fieldName} />
      </div>
      <div className={rightSideClass}>
        <input
          className="mb-3 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          id={fieldName}
          placeholder={placeholder || 'Please enter '}
          {...register(fieldName)}
        />
        <FormErrorMessage message={error} />
      </div>
    </div>
  );
};

export default TextInput;
