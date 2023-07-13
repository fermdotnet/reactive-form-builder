import React from 'react';
import { FormBuilderInputCommonProps } from '../types';

type Option = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: Option[];
} & FormBuilderInputCommonProps;

const Select = ({ name, onChange, onBlur, options, value, disabled = false }: SelectProps) => {
  return (
    <select
      className="form-builder__select"
      onChange={({ target }) => onChange(target.value)}
      onBlur={onBlur}
      disabled={disabled}
      value={value}
      name={name}
    >
      <option key="empty" value="">
        -
      </option>
      {options?.map((selected: Option) => (
        <option key={selected?.value} value={selected.value}>
          {selected.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
