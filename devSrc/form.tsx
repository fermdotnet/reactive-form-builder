import React from 'react';
import joi from 'joi';
import { FormBuilder, useFormBuilder, Input } from '../src';

const schema = {
  name: {
    value: '',
    label: 'Name',
    input: Input,
    type: 'text',
    joi: joi.string().required().messages({
      'string.empty': 'Error'
    })
  },
  age: {
    value: '',
    label: 'Age',
    input: Input,
    type: 'number',
    joi: joi.number().required().messages({
      'string.empty': 'Error 2'
    })
  }
};

const Form = ({ debug = true }: { debug?: boolean }) => {
  const handler = useFormBuilder(schema, debug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(handler.data));
  };

  const handleFillForm = () => {
    handler.setFullForm({
      name: 'Fer',
      age: 31
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormBuilder handler={handler} />
      <br />
      Valid: {handler.valid ? 'yes' : 'no'}
      <br />
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleFillForm}>
        Fill form
      </button>
    </form>
  );
};

export default Form;
