import React, { createElement } from 'react';
import classnames from 'classnames';

interface Props {
  handler: any;
}

const ReactiveFormBuilder = ({ handler }: Props) => {
  if (!handler || handler.data === null) {
    return null;
  }

  return (
    <div className="rfb">
      {Object.keys(handler.schema).map(key => {
        const item = handler.schema[key];
        const required = item.joi._flags?.presence === 'required';
        const pristine = handler.pristine[key];
        const error = handler.errors[key];

        return (
          <div
            key={key}
            data-testid={`rfb_${key}`}
            className={classnames('rfb__input-wrapper', { error: !pristine && error }, `rfb__input-${key}`)}
          >
            <label className="rfb__label">
              {item.label}
              {required ? ' *' : ''}
            </label>

            {createElement(item.input, {
              ...item,
              key,
              required,
              value: handler.data[key],
              error,
              pristine,
              onBlur: handler.blurred(key),
              onChange: handler.setFormData(key)
            })}

            <span className="rfb__error-message">{!pristine && !!error ? error : ''}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ReactiveFormBuilder;
