import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '../Button/Button';
import RenderField from './RenderField';
import { FormDataSection } from './types';

interface DynamicFormProps {
  formData: FormDataSection[];
  validationSchema: any;
  onSubmit: (data: any) => Promise<void>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData, validationSchema, onSubmit }) => {
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded border p-4 dark:border-white">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          {formData.map(section => (
            <div key={section.id}>
              <h3>{section.text}</h3>
              {section.children.map((child, index) => {
                const fieldName = `field_${section.id}_${index}`;
                return <RenderField key={fieldName} child={child} fieldName={fieldName} />;
              })}
            </div>
          ))}
          <Button name="Submit" valid={!methods.formState.isValid} loading={loading} />
        </form>
      </FormProvider>
    </div>
  );
};

export default DynamicForm;
