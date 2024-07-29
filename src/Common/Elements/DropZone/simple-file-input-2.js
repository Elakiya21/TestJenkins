import React from 'react';
import PropTypes from 'prop-types';
import bsCustomFileInput from 'bs-custom-file-input';
// import swal from '@sweetalert/with-react';

/**
 * Uploads file on Drop & set UUID of Document in Input Field
 * Props - onUpload ( callback on click upload)
 */
class SimpleFileUpload2 extends React.Component {
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
    this.setState(
      {
        selectedFile: event.target.files[0],
      },
      () => {
        this.props.onUpload(this.props.input.name, this.state.selectedFile);
      },
    );
  };

  removeFile = () => {
    this.setState({
      selectedFile: {},
    });
    this.props.input.onChange(null);
    this.props.onRemove(this.props.input.name);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { waiting } = this.props;
    return (
      <div className="col">
        <small id="inputGroupFile" className="form-text text-muted">
          * supported format *.jpg, *.png, *.pdf
        </small>
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
              {waiting ? '' : 'upload'} */}
            {/* </button> */}
          </div>
        </div>
        <div className="input-group mb-3">
          {this.props.input.value && this.props.input.value.name && (
            <span>
              <a href={`${this.props.input.value.link}`} target="_blank">
                {this.props.input.value.name}
              </a>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger ml-1"
                onClick={this.removeFile}
              >
                remove
              </button>
            </span>
          )}
          {!(this.props.input.value && this.props.input.value.name) && (
            <span>No file uploaded</span>
          )}
        </div>
      </div>
    );
  }
}

SimpleFileUpload2.propTypes = {
  onUpload: PropTypes.func,
  waiting: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  input: PropTypes.object,
  maxSize: PropTypes.number,
};

export default SimpleFileUpload2;
