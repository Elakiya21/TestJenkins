import React from 'react';
import PropTypes from 'prop-types';

export default function ItemDesc({ name, value }) {
  return (
    <div className="col-sm mt-2">
      <div className="row">
        <div className="col-sm font-weight-bold">{name}</div>
      </div>
      <div className="row mt-2">
        <div className="col-sm">{value}</div>
      </div>
    </div>
  );
}

ItemDesc.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
};
