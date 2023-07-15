import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from '../devSrc/form';

describe('Form validation tests', () => {
  test('Input should display error message when left empty', async () => {
    const testId = 'form_builder_name';
    const { getByTestId } = render(<Form debug={false} />);
    const nameInput = getByTestId(testId).querySelector('.form-builder__input');

    if (nameInput) {
      fireEvent.blur(nameInput);

      await waitFor(
        async () => {
          const errorSpan = getByTestId(testId).querySelector('.form-builder__error-message');
          expect(errorSpan!.textContent).toBe('Error');
        },
        { timeout: 1000 }
      );
    } else {
      throw new Error('Input field not found');
    }
  });
});
