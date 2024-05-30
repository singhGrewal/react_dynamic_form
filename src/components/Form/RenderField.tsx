import React from 'react';

import CheckboxInput from './CheckboxInput';
import DropdownInput from './DropdownInput';
import MultiSelectInput from './MultiSelectInput';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import { RenderFieldProps } from './types';

const RenderField: React.FC<RenderFieldProps> = ({ child, fieldName }) => {
  switch (child.type) {
    case 'dropdown':
      return (
        <DropdownInput
          fieldName={fieldName}
          text={child.text}
          options={child.options || []}
          placeholder={child.placeholder}
        />
      );
    case 'checkbox':
      return (
        <CheckboxInput
          fieldName={fieldName}
          text={child.text}
          defaultValue={child.defaultValue || false}
        />
      );
    case 'radio':
      return <RadioInput fieldName={fieldName} text={child.text} options={child.options || []} />;
    case 'multiSelect':
      return (
        <MultiSelectInput
          fieldName={fieldName}
          text={child.text}
          options={child.options || []}
          labelledBy={child.text}
        />
      );
    case 'text':
    default:
      return <TextInput fieldName={fieldName} text={child.text} placeholder={child.placeholder} />;
  }
};

export default RenderField;
