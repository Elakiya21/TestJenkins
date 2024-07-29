import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { MdCancel, MdCloudDone } from 'react-icons/md';

const ImagePreview = ({ imageFile, progress, reset }) =>
  imageFile.map(({ name, preview, size }) => (
    <div key={name} className="render-preview">
      <div className="image-container">
        <div className="card">
          <img src={preview} alt={name} className="card-img" />
          {progress === 100 && (
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <IconContext.Provider
                value={{
                  color: '#ff8500',
                  size: '2em',
                  className: 'global-class-name',
                }}
              >
                <MdCloudDone />
              </IconContext.Provider>
            </div>
          )}
        </div>
        {/* <img src={preview} alt={name} className="img-fluid" /> */}
        <div className="progress" style={{ height: '5px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-8">
          <span className="text-primary">
            {name} - {(size / 1024000).toFixed(2)}MB
          </span>
        </div>
        <div className="col-lg-4">
          <button
            className="btn btn-sm btn-outline-danger float-right"
            type="button"
            onClick={reset}
          >
            Remove <MdCancel />
          </button>
        </div>
      </div>
    </div>
  ));

ImagePreview.propTypes = {
  imageFile: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.file,
      name: PropTypes.string,
      preview: PropTypes.string,
      size: PropTypes.number,
    }),
  ),
  reset: PropTypes.func,
  progress: PropTypes.number,
};

export default ImagePreview;
