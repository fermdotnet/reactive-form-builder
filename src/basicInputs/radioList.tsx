import React from 'react';
import classnames from 'classnames';
import { FormBuilderInputCommonProps } from '../types';

type Option = {
  label: string;
  value: string;
};

export type Props = {
  options: Option[];
} & FormBuilderInputCommonProps;

const RadioList = ({ options, value, onChange, disabled = false }: Props) => {
  const handleSelect = (newValue: any) => () => {
    if (!disabled) {
      onChange(value === newValue ? '' : newValue);
    }
  };

  return (
    <div className="form-builder__radio-list">
      {options.map((option, index) => (
        <div key={index}>
          <div onClick={handleSelect(option.value)} className={classnames({ selected: value === option.value })}>
            <div />
            <span>{option.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioList;
