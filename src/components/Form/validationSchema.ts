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
      const errorMessage = child.errorMessage || `${child.text} is required`;

      if (child.type === 'text') {
        if (child.validate === 'number') {
          schemaFields[fieldName] = yup.number().required(errorMessage);
        } else if (child.validate === 'string') {
          schemaFields[fieldName] = yup.string().required(errorMessage);
        } else {
          schemaFields[fieldName] = yup.string().required(errorMessage);
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
