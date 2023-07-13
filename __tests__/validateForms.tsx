import React from 'react';
import joi from 'joi';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FormBuilder, useFormBuilder, Input } from '../src';

const schema = {
  name: {
    value: "",
    label: "Name",
    input: Input,
    type: "text",
    joi: joi.string().required().messages({
      "string.empty": 'Error'
    })
  }
};

const Form4Test = () => {
  const handler = useFormBuilder(schema);

  return <FormBuilder handler={handler} />;
};

describe('Form validation tests', () => {
  test('Input should display error message when left empty', async () => {
    const testId = 'form_builder_name';
    const { getByTestId } = render(<Form4Test />);
    const nameInput = getByTestId(testId).querySelector('.form-builder__input');

    if (nameInput) {
      fireEvent.blur(nameInput);

      await waitFor(async () => {
        const errorSpan = getByTestId(testId).querySelector('.form-builder__error-message');
        expect(errorSpan!.textContent).toBe('Error');
      }, {timeout: 1000});
    } else {
      throw new Error('Input field not found');
    }
  });
});
