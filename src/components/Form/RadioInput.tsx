import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import LabelName from './LabelName';
import TextInput from './TextInput';
import { Option } from './types';
import FormErrorMessage from '../ErrorMessage/FormErrorMessage';

interface RadioInputProps {
  fieldName: string;
  text: string;
  options: Option[];
}

const RadioInput: React.FC<RadioInputProps> = ({ fieldName, text, options }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchField = watch(fieldName);

  // Track whether the condition input should be rendered
  const [renderCondition, setRenderCondition] = useState(false);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === watchField);
    if (selectedOption && selectedOption.condition) {
      setRenderCondition(true);
    } else {
      setRenderCondition(false);
    }
  }, [watchField, options]);

  const error = (errors[fieldName] && (errors[fieldName]?.message as string)) || '';
  return (
    <div className={layoutClass}>
      <div className={leftSideClass}>
        <LabelName label={text} />
      </div>
      <div className={`${rightSideClass} ${options.length === 2 ? 'flex gap-4' : ''}`}>
        {options.map(option => (
          <div key={option.value}>
            <input
              className="mr-4 h-4 w-4 appearance-none rounded-full border-2 border-black checked:border-transparent checked:bg-black focus:outline-none"
              type="radio"
              id={`${fieldName}_${option.value}`}
              value={option.value}
              {...register(fieldName)}
            />
            <label htmlFor={`${fieldName}_${option.value}`}>{option.label}</label>
            {renderCondition && watchField === option.value && option.condition && (
              <TextInput fieldName={`${fieldName}_condition`} text={option.condition.text} />
            )}
          </div>
        ))}
        <FormErrorMessage message={error} />
      </div>
    </div>
  );
};

export default RadioInput;
