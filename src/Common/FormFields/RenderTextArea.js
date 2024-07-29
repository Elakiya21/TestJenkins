import React from 'react';
import PropTypes from 'prop-types';
// import { Field } from 'redux-form';
// import './style.scss';

const RenderTextArea = ({
  input,
  input: { name },
  label,
  type,
  rows,
  className,
  applyLabel = true,
  readOnly = false,
  required,
  placeholder,
  meta: { touched, error, warning },
}) => {

  const classes = `form-control${readOnly ? '-plaintext' : ''} ${
    touched && error && !readOnly ? 'is-invalid' : ''
  }`;
  return (
      <div className={`${required ? ' required' : ''} mb-3`}>
        <textarea
          {...input}
          rows={rows}
          className={`form-control ${className}`}
          type={type}
          placeholder={placeholder || label}
        />
        {touched &&
          ((error && <div className="invalid-feedback">{error}</div>) ||
            (warning && <div className="invalid-feedback">{warning}</div>))}
      </div>
  );
};
RenderTextArea.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  rows: PropTypes.string,
  required: PropTypes.bool,
  applyLabel: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default RenderTextArea

