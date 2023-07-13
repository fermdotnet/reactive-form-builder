# form-builder
Build dynamic forms in minutes using React Form Builder. Leverage JOI integration for robust validation and error handling. Write a simple JSON configuration to effortlessly create and manage forms.

### I'm working on the documentation and also adding some examples. Reach me out if needed


![image](https://github.com/fermdotnet/form-builder/assets/11689288/cd9637be-9980-4ebf-b3eb-678ff28c9dbb)

```
import React from "react";
import joi from "joi";
import { useFormBuilder, FormBuilder, Input } from "@ferdotnet/form-builder";

const currentYear = new Date().getFullYear();
const maxAge = 100;
const minAgeToGetGraduated = 18;

const schema = {
  yearOfBirth: {
    value: "",
    label: "Year of birth",
    input: Input,
    type: "number",
    joi: joi.number().integer().min(currentYear - maxAge).max(currentYear).required().messages({
      "number.min": 'You can not be older than 100 yo and be coding!',
      "number.max": 'You can not have born in the future, yet!'
    })
  },
  yearOfGraduation: {
    value: "",
    label: "Year of Graduation",
    input: Input,
    type: "number",
    joi:
      joi
        .number()
        .integer()
        .min(
          joi.ref('yearOfBirth', {
            adjust: value => (value + minAgeToGetGraduated)
          }))
        .max(
          joi.ref('yearOfBirth', {
            adjust: value => (value + maxAge)
          }))
        .required()
        .messages({
          "number.min": 'Mmh! You can only be graduated after 18 since you have born!',
          "number.max": 'For the moment, a person can not get graduated 100 years after have born!'
        })
  }
};

const Advanced = () => {
  const handler = useFormBuilder(schema, true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`FORM DATA: ${JSON.stringify(handler.data)}`);
  };

  const handleFill = () => {
    handler.setFullForm({
      yearOfBirth: 1991,
      yearOfGraduation: 2012
    });
  };

  const handleClean = () => {
    handler.resetForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormBuilder handler={handler} />

        <button type="submit" disabled={!handler.valid}>
          Submit
        </button>

        <button type="button" disabled={handler.valid} onClick={handleFill}>
          Fill form
        </button>

        <button type="button" onClick={handleClean}>
          Reset
        </button>
      </form>
    </>
  );
};

export default Advanced;
```
