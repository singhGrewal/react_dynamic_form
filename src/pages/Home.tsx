import React from 'react';

import DynamicForm from '../components/Form/DynamicForm';
import { data } from '../data/FormData';
import generateValidationSchema from '../components/Form/validationSchema';

const validationSchema = generateValidationSchema(data);

const Home: React.FC = () => {
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return <DynamicForm formData={data} validationSchema={validationSchema} onSubmit={onSubmit} />;
};

export default Home;
