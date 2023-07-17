# Reactive Form Builder

for React

Documentation here:
https://reactiveformbuilder.com

**./schema.ts**

```
import joi from 'joi';
// import { Input, Select, Textarea, CheckList, RadioList } from '@ferdotnet/reactive-form-builder';
// or, import here your custom inputs if needed

const schema = {
  yearOfBirth: {
    value: '',
    label: 'Year of birth',
    input: Input,
    type: 'number',
    joi: joi
      .number()
      .integer()
      .min(currentYear - maxAge)
      .max(currentYear)
      .required()
      .messages({
        'number.min': 'You can not be older than 100 yo and be coding!',
        'number.max': 'You can not have born in the future, yet!'
      })
  },
  yearOfGraduation: {
    value: '',
    label: 'Year of Graduation',
    input: Input,
    type: 'number',
    joi: joi
      .number()
      .integer()
      .min(
        joi.ref('yearOfBirth', {
          adjust: value => value + minAgeToGetGraduated
        })
      )
      .max(
        joi.ref('yearOfBirth', {
          adjust: value => value + maxAge
        })
      )
      .required()
      .messages({
        'number.min': 'Mmh! You can only be graduated after 18 since you have born!',
        'number.max': 'For the moment, a person can not get graduated 100 years after have born!'
      })
  }
}

export default schema;
```

**./yourComponent.tsx**

```
import React from 'react';
import { useReactiveFormBuilder, ReactiveFormBuilder } from '@ferdotnet/reactive-form-builder';
import schema from './schema';

const MyComponent = () => {
  const handler = useReactiveFormBuilder(schema, true); // Second param is to debug
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(JSON.stringify(handler.data));
  };

  const handleFill = () => {
    handler.setFullForm({
      yearOfBirth: 1991,
      yearOfGraduation: 2012
    });
  };

  const handleReset = () => {
    handler.resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ReactiveFormBuilder handler={handler} />

      <button type="submit" disabled={!handler.valid}>
        Submit
      </button>

      <button type="button" disabled={handler.valid} onClick={handleFill}>
        Fill form
      </button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default MyComponent;
```

