import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { MdCancel } from 'react-icons/md';

const ExistingFilePreview = ({ existingFile, removeExisting }) => {
  let isImage = false;
  const dotLastIndex = existingFile.link.lastIndexOf('.');
  if (dotLastIndex !== -1) {
    const extension = existingFile.link.substring(dotLastIndex + 1);
    if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
      isImage = true;
    }
  }
  const fileName = existingFile.name ? existingFile.name : 'download file';
  return (
    <Fragment>
      <div className="image-container">
        {isImage && (
          <img
            src={existingFile.link}
            alt="existing file"
            className="img-fluid"
          />
        )}
        {!isImage && (
          <a href={`${existingFile.link}`} target="_blank">
            {fileName}
          </a>
        )}
      </div>
      <div className="row mt-2">
        <div className="col">
          <button
            className="btn btn-sm btn-outline-danger float-right"
            type="button"
            onClick={removeExisting}
          >
            Remove <MdCancel />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

ExistingFilePreview.propTypes = {
  existingFile: PropTypes.object.isRequired,
  removeExisting: PropTypes.func,
};

export default ExistingFilePreview;
