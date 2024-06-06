import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import FormErrorMessage from '../ErrorMessage/FormErrorMessage';
import LabelName from './LabelName';
import { Option } from './types';

interface DropdownInputProps {
  fieldName: string;
  text: string;
  placeholder?: string;
  options?: Option[];
}

const DropdownInput: React.FC<DropdownInputProps> = ({ fieldName, text, options, placeholder }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const error = (errors[fieldName] && (errors[fieldName]?.message as string)) || '';

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const selectedOptionObject = options && options.find(option => option.value === selectedOption);
  const selectedCondition = selectedOptionObject?.condition;

  return (
    <div className={layoutClass}>
      <div className={leftSideClass}>
        <LabelName label={text} htmlFor={fieldName} />
      </div>
      <div className={rightSideClass}>
        <select
          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          id={fieldName}
          {...register(fieldName)}
          onChange={handleSelectChange}>
          <option value="">{placeholder || 'Select an option'}</option>
          {options &&
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        <FormErrorMessage message={error} />
        {selectedCondition && (
          <div className="mt-4">
            <DropdownInput
              fieldName={`${fieldName}_sub`}
              text={selectedCondition.text}
              options={selectedCondition.options}
              placeholder="Select an option"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
