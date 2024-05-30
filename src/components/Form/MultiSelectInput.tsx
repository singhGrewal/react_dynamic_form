import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';

import { layoutClass, leftSideClass, rightSideClass } from '../../utils/helpers';
import LabelName from './LabelName';
import { Option } from './types';
import FormErrorMessage from '../ErrorMessage/FormErrorMessage';

interface MultiSelectInputProps {
  fieldName: string;
  text: string;
  options: Option[];
  labelledBy: string;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  fieldName,
  text,
  options,
  labelledBy,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = (errors[fieldName] && (errors[fieldName]?.message as string)) || '';

  return (
    <div className={layoutClass}>
      <div className={leftSideClass}>
        <LabelName label={text} htmlFor={fieldName} />
      </div>
      <div className={rightSideClass}>
        <Controller
          name={fieldName}
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <MultiSelect
              {...field}
              options={options}
              labelledBy={labelledBy}
              onChange={(selected: Option[]) => {
                field.onChange(selected || []);
              }}
            />
          )}
        />
        <FormErrorMessage message={error} />
      </div>
    </div>
  );
};

export default MultiSelectInput;
