import React from 'react';
import { SchemaInternals } from 'joi';

type SchemaItemType = {
  value: any;
  label: string;
  input: React.ComponentType;
  required?: boolean;
  joi: SchemaInternals;
};

export type FormBuilderSchemaType = {
  [key: string]: SchemaItemType & any;
};

export type FormBuilderInputCommonProps = {
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

export type FormBuilderState = {
  valid: boolean;
  data: Record<string, any> | null;
  pristine: Record<string, boolean> | null;
  errors: Record<string, string> | null;
  schema: FormBuilderSchemaType;
};
