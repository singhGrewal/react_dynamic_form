import React from 'react';

interface NameFieldProps {
  label: string;
  htmlFor?: string;
}

const LabelName: React.FC<NameFieldProps> = ({ label, htmlFor }) => {
  return (
    <label className="block pr-4 md:mb-0" htmlFor={htmlFor || 'inline-full-name'}>
      {label}
    </label>
  );
};

export default LabelName;
