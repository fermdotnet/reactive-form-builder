import React, { createElement } from 'react';
import classnames from 'classnames';

interface Props {
  handler: any;
}

const FormBuilder = ({ handler }: Props) => {
  if (!handler || handler.data === null) {
    return null;
  }

  return (
    <div className="form-builder">
      {Object.keys(handler.schema).map(key => {
        const item = handler.schema[key];
        const required = item.joi._flags?.presence === 'required';
        const pristine = handler.pristine[key];
        const error = handler.errors[key];

        return (
          <div
            key={key}
            className={classnames(
              'form-builder__input-wrapper',
              { error: !pristine && error },
              `form-builder__input-${key}`
            )}
          >
            <label className="form-builder__label">
              {item.label}
              {required ? ' *' : ''}
            </label>

            {createElement(item.input, {
              ...item,
              required,
              value: handler.data[key],
              error,
              pristine,
              onBlur: handler.blurred(key),
              onChange: handler.setFormData(key)
            })}

            {!pristine && !!error && <span className="form-builder__error-message">{error}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default FormBuilder;
