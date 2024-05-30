import React from 'react';

interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  return (
    <div className="h-1 px-4 text-sm text-red-800 dark:text-red-400" role="alert">
      <span className="font-medium"> {message || ''}</span>
    </div>
  );
};

export default FormErrorMessage;
