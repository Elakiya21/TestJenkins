import React from 'react';
import PropTypes from 'prop-types';
import { MdCloudUpload } from 'react-icons/md';
const Placeholder = ({ error, touched, getRootProps, getInputProps }) => (
  <div
    {...getRootProps()}
    className={`text-center ${error && touched ? 'has-error' : ''}`}
  >
    <input {...getInputProps()} />
    <MdCloudUpload style={{ fontSize: 100, paddingTop: 85 }} />
    <p>Click or drag image file to this area to upload.</p>
  </div>
);
Placeholder.propTypes = {
  error: PropTypes.string,
  getInputProps: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  touched: PropTypes.bool,
};
export default Placeholder;