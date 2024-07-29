import React from 'react';
import PropTypes from 'prop-types';
import bsCustomFileInput from 'bs-custom-file-input';
// import swal from '@sweetalert/with-react';

/**
 * Uploads file on Drop & set UUID of Document in Input Field
 * Props - onUpload ( callback on click upload)
 */
class SimpleFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: {},
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  onChange = event => {
    const sizeInMB = event.target.files[0].size / (1000 * 1000);
    if (this.props.maxSize && sizeInMB > this.props.maxSize) {
      // swal(`Maximum file upload limit is ${this.props.maxSize} MB`);
      // event.target.files[]
      return;
    }
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onClickUpload = () => {
    this.props.onUpload(this.state.selectedFile);
  };

  render() {
    // const { imagefile } = this.state;
    const { waiting } = this.props;
    return (
      <div className="col">
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile"
              onChange={this.onChange}
            />
            <label
              className="custom-file-label"
              htmlFor="inputGroupFile"
              aria-describedby="inputGroupFileAddon"
            >
              Choose file
            </label>
          </div>
          <div className="input-group-append">
            {/* <button
              className="btn btn-sm btn-primary"
              type="button"
              onClick={() => this.onClickUpload()}
            >
              Upload
            </button> */}
            <button
              type="button"
              className="btn btn-sm btn-primary"
              disabled={waiting}
              onClick={() => this.onClickUpload()}
            >
              {waiting && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {waiting ? '' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SimpleFileUpload.propTypes = {
  onUpload: PropTypes.func,
  waiting: PropTypes.bool,
  maxSize: PropTypes.number,
};

export default SimpleFileUpload;
