import React from 'react';
import { RFBInputCommonProps } from '../types';

type Option = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: Option[];
} & RFBInputCommonProps;

const Select = ({ name, onChange, onBlur, options, value, disabled = false }: SelectProps) => {
  return (
    <select
      className="rfb__select"
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
