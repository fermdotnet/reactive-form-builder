import React from 'react';
import { FormBuilderInputCommonProps } from '../types';

export type TextInputProps = FormBuilderInputCommonProps & {
  value: string | number;
  type: string;
  name?: string;
  placeholder?: string;
  limit?: number;
};

const Text = ({ type, placeholder, name, value, onChange, onBlur, limit, disabled = false }: TextInputProps) => {
  const handleChange = (value: any, name: string) => {
    onChange(type === 'number' ? +value : value, name);
  };

  return (
    <input
      className="form-builder__input"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={({ target }) => handleChange(target.value, target.name)}
      onBlur={onBlur}
      disabled={disabled}
      maxLength={limit}
    />
  );
};

export default Text;
