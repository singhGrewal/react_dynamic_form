import React from 'react';
import { useFormContext } from 'react-hook-form';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import FormErrorMessage from '../ErrorMessage/FormErrorMessage';
import LabelName from './LabelName';
import { Option } from './types';

interface DropdownInputProps {
  fieldName: string;
  text: string;
  placeholder?: string;
  options: Option[];
}

const DropdownInput: React.FC<DropdownInputProps> = ({ fieldName, text, options, placeholder }) => {
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
        <select
          className={
            'block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
          }
          id={fieldName}
          {...register(fieldName)}>
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[fieldName] && <FormErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default DropdownInput;
