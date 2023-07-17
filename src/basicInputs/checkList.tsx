import React from 'react';
import classnames from 'classnames';
import { RFBInputCommonProps } from '../types';

type Option = {
  label: string;
  value: string;
};

export type Props = RFBInputCommonProps & {
  value: any[];
  options: Option[];
};

const CheckList = ({ options, value, onChange, disabled = false }: Props) => {
  const handleSelect = (newValue: any) => () => {
    if (!disabled) {
      if (value.find((item: any) => item === newValue)) {
        onChange(value.filter((item: any) => item !== newValue));
      } else {
        onChange([...value, newValue]);
      }
    }
  };

  return (
    <div className="rfb__check-list">
      {options.map((option, index) => (
        <div key={index}>
          <div onClick={handleSelect(option.value)} className={classnames({ selected: value.includes(option.value) })}>
            <div />
            <span>{option.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckList;
