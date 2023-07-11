import React from 'react';
import { FormBuilderInputCommonProps } from '../types';

export type TextInputProps = FormBuilderInputCommonProps & {
  placeholder?: string;
  limit?: number;
};

const Textarea = ({ value, name, onChange, onBlur, placeholder, limit, disabled = false }: TextInputProps) => (
  <textarea
    className="form-builder__textarea"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={({ target }) => onChange(target.value)}
    onBlur={onBlur}
    disabled={disabled}
    maxLength={limit}
  />
);

export default React.memo(Textarea);
