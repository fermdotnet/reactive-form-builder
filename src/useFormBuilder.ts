import { useEffect, useState } from 'react';
import joi from 'joi';
import { FormBuilderSchemaType } from './types';

const objectToArray = (object: Object) => {
  const array = Object.entries(object).map(([k, v]) => ({ ...v, id: k }));
  return array;
};

export const objectMap = (obj: Object, fn: Function) => {
  const arr = Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]);
  return arr.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {}); // Object.fromEntries
};

const fillDefaultData = (schema: FormBuilderSchemaType) =>
  schema ? objectMap(schema, (item: any) => item.value) : null;
const fillDefaultPristine = (schema: FormBuilderSchemaType) => (schema ? objectMap(schema, () => true) : null);
const fillDefaultErrors = (schema: FormBuilderSchemaType) => (schema ? objectMap(schema, () => '') : null);

function useFormBuilder(schema: FormBuilderSchemaType = {}, debug: boolean = false) {
  const [form, setForm] = useState<any>({
    valid: false,
    data: fillDefaultData(schema),
    pristine: fillDefaultPristine(schema),
    errors: fillDefaultErrors(schema),
    schema
  });

  const resetForm = () => {
    setForm({
      valid: false,
      pristine: fillDefaultPristine(schema),
      data: fillDefaultData(schema),
      errors: fillDefaultErrors(schema),
      schema
    });
  };

  const blurred = (key: string) => () => {
    setForm((prev: any) => ({
      ...prev,
      pristine: { ...prev.pristine, [key]: false }
    }));
  };

  const setSchema = (schema: FormBuilderSchemaType) => {
    setForm((prev: any) => ({ ...prev, schema }));
  };

  const setFormData = (key: string) => (value: any) => {
    setForm((prev: any) => ({
      ...prev,
      data: { ...prev.data, [key]: value },
      pristine: { ...prev.pristine, [key]: false }
    }));
  };

  const setFullForm = (data: any) => {
    setForm((prev: any) => ({
      ...prev,
      data: { ...prev.data, ...data }
    }));
  };

  const validate = () => {
    const { schema, data } = form;
    const errors: any = fillDefaultErrors(schema);
    const validator = joi
      .object(objectToArray(schema).reduce((acc, cur) => ({ ...acc, [cur.id]: cur.joi }), {}))
      .options({ abortEarly: false });
    const { details = [] } = { ...validator.validate(data).error };
    let isFormValid = true;

    if (debug) {
      if (details.length) {
        console.table(
          details.map(item => ({
            Key: item.path[0],
            'Message key': item.type,
            Message: item.message
          }))
        );
      } else {
        console.log('Form with no errors');
      }
    }

    for (let key of Object.keys(schema)) {
      const e = details.filter(item => item.path.includes(key));
      const hasError = e.length > 0;

      if (hasError) {
        isFormValid = false;
        errors[key] = e[0].message;
      }
    }

    setForm((prev: any) => ({ ...prev, errors, valid: isFormValid }));
  };

  useEffect(() => {
    if (form.data) {
      validate();
    }
  }, [form.data]);

  return {
    setSchema,
    setFormData,
    setFullForm,
    resetForm,
    schema: form.schema,
    valid: form.valid,
    data: form.data,
    pristine: form.pristine,
    errors: form.errors,
    blurred
  };
}

export default useFormBuilder;
