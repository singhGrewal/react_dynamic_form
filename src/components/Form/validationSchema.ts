import * as yup from 'yup';

import { FormDataSection } from './types';

const generateValidationSchema = (data: FormDataSection[]) => {
  const schemaFields: { [key: string]: yup.AnySchema } = {};
  data.forEach(section => {
    section.children.forEach((child, index) => {
      const fieldName = `field_${section.id}_${index}`;
      const errorMessage = child.errorMessage || `${child.text} is required`;
      if (child.type === 'text' || child.type === 'dropdown') {
        schemaFields[fieldName] = yup.string().required(errorMessage);
      } else if (child.type === 'checkbox') {
        schemaFields[fieldName] = yup.boolean().oneOf([true], errorMessage);
      } else if (child.type === 'radio') {
        schemaFields[fieldName] = yup.string().required(errorMessage);
      }
    });
  });

  data.forEach(section => {
    section.children.forEach((child, index) => {
      const fieldName = `field_${section.id}_${index}`;
      // const errorMessage = child.errorMessage || `${child.text} is required`;
      const errorMessage = child.errorMessage || 'Is required' ;

      if (child.type === 'text') {
        if (child.validate === 'number') {
          schemaFields[fieldName] = yup.number().typeError('Must be a number').required(errorMessage).integer('Must be an integer').positive('Must be a positive number');
        } else if (child.validate === 'string') {
          schemaFields[fieldName] = yup.string().required(errorMessage).matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed').min(3, 'Must be at least 3 characters long').max(20, 'Must be at most 50 characters long');
        } else {
          schemaFields[fieldName] = yup.string().email('Must be a valid email').required(errorMessage);
        }
      } else if (child.type === 'dropdown') {
        schemaFields[fieldName] = yup.string().required(errorMessage);
      } else if (child.type === 'checkbox') {
        schemaFields[fieldName] = yup.boolean().oneOf([true], errorMessage);
      } else if (child.type === 'radio') {
        schemaFields[fieldName] = yup.string().required(errorMessage);
      }
    });
  });

  return yup.object().shape(schemaFields);
};

export default generateValidationSchema;
