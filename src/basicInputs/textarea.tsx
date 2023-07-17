import React from 'react';
import { RFBInputCommonProps } from '../types';

export type TextInputProps = RFBInputCommonProps & {
  placeholder?: string;
  limit?: number;
};

const Textarea = ({ value, name, onChange, onBlur, placeholder, limit, disabled = false }: TextInputProps) => (
  <textarea
    className="rfb__textarea"
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
