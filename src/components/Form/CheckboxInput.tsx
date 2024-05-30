import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import LabelName from './LabelName';
import FormErrorMessage from '../ErrorMessage/FormErrorMessage';

interface CheckboxInputProps {
  fieldName: string;
  text: string;
  defaultValue?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ fieldName, text, defaultValue }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = (errors[fieldName] && (errors[fieldName]?.message as string)) || '';
  return (
    <div className={layoutClass}>
      <div className={leftSideClass}>
        <LabelName label={text} />
      </div>
      <div className={rightSideClass}>
        <Controller
          name={fieldName}
          control={control}
          defaultValue={defaultValue || false}
          render={({ field }) => (
            <input
              type="checkbox"
              className={
                'h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
              }
              defaultChecked={defaultValue}
              disabled={defaultValue} // Disable the checkbox if defaultValue is true
              {...field}
            />
          )}
        />
        <FormErrorMessage message={error} />
      </div>
    </div>
  );
};

export default CheckboxInput;
