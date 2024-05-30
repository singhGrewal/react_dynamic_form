import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import LabelName from './LabelName';
import FormErrorMessage from "../ErrorMessage/FormErrorMessage";

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
              defaultChecked={defaultValue}
              disabled={defaultValue} // Disable the checkbox if defaultValue is true
              {...field}
            />
          )}
        />
        {/*{errors[fieldName] && <p>{errors[fieldName]?.message as string}</p>}*/}
          {errors[fieldName] && <FormErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default CheckboxInput;
