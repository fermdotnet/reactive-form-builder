import React from 'react';
import { SchemaInternals } from 'joi';

type RFBSchemaItem = {
  value: any;
  label: string;
  input: React.ComponentType;
  required?: boolean;
  joi: SchemaInternals;
};

export type RFBSchemaType = {
  [key: string]: RFBSchemaItem & any;
};

export type RFBInputCommonProps = {
  value: any;
  onChange: (value: any) => void;
  required: boolean;
  onBlur: () => void;
  label: string;
  error: string;
  pristine: boolean;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type RFBState = {
  valid: boolean;
  data: Record<string, any> | null;
  pristine: Record<string, boolean> | null;
  errors: Record<string, string> | null;
  schema: RFBSchemaType;
};
