import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ImagePreview from './imagePreview';
import Placeholder from './placeHolder';
import ExistingFilePreview from './existingFile';
import Modal from "Common/Elements/Modal";
const defaultMimeType = 'image/jpeg, image/png, application/pdf';

/**
 * Uploads file on Drop & set UUID of Document in Input Field
 * Props - existingFile ( url of existingFile to show preview)
 */
class DropZoneField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: [],
      showExisting: true,
      modalOpen: false,
      message: '',
      // isLoading: false,
    };
  }

  updateProgress(progress) {
    this.setState({
      progress,
    });
  }

  upload(uploadRequest) {
    const data = new FormData();

    this.setState({
      // isLoading: true,
      progress: 0,
    });

    data.append(
      this.props.filePartName,
      uploadRequest[0],
      uploadRequest[0].name,
    );

    const config = {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        this.updateProgress(percentCompleted);
      },
    };

    axios
      .post(this.props.uploadUrl, data, config)
      .then(response => {
        const result = response.data || {};
        if (result.data) {
          // eslint-disable-next-line react/prop-types
          this.props.input.onChange(result.data.id);
        } else {
          // eslint-disable-next-line react/prop-types
          this.props.input.onChange(null);
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
      })
      .finally(() => {
        // always executed
      });
  }

  handleOnDrop = newImageFile => {
    if (typeof newImageFile[0] === 'undefined') {
      return;
    }
    const imageFileObj = {
      file: newImageFile[0],
      name: newImageFile[0].name,
      preview: URL.createObjectURL(newImageFile[0]),
      size: newImageFile[0].size,
    };
    const sizeInMB = newImageFile[0].size / (1000 * 1000);
    if (this.props.maxSize && sizeInMB > this.props.maxSize) {
      this.setState({
        modalOpen: true,
        message: `Maximum file upload limit is ${this.props.maxSize} MB`,
      });
      return;
    }
    this.setState({ imageFile: [imageFileObj] });

    // eslint-disable-next-line react/prop-types
    this.upload(newImageFile);
  };

  reset = () => {
    this.setState({ imageFile: [] });
    // eslint-disable-next-line react/prop-types
    this.props.input.onChange(null);
  };

  removeExisting = () => {
    this.setState({ showExisting: false });
    this.reset();
  };

  handleModalAction(modalActionType) {
    this.setState({
      modalOpen: false,
      message: '',
    });
  }

  render() {
    return (
      <span>
        {this.state.modalOpen &&
          <Modal
            id="create-modal"
            primaryBtnContent={<span>OK</span>}
            primaryBtnAction={() => this.handleModalAction()}
          >
            {this.state.message}
          </Modal>
        }
        <div className="preview-container">
          {this.props.existingFile &&
          this.props.existingFile.link &&
          this.state.showExisting ? (
            <ExistingFilePreview
              existingFile={this.props.existingFile}
              removeExisting={this.removeExisting}
            />
          ) : (
            <Dropzone
              onDrop={this.handleOnDrop}
              accept={this.props.mimeType || defaultMimeType}
              className="upload-container"
              multiple={false}
            >
              {props => (
                <div className="container justify-content-center align-items-center">
                  {this.state.imageFile && this.state.imageFile.length > 0 ? (
                    <ImagePreview
                      imageFile={this.state.imageFile}
                      reset={this.reset}
                      progress={this.state.progress}
                    />
                  ) : (
                    <Placeholder
                      {...props}
                      error={this.props.error}
                      touched={this.props.touched}
                    />
                  )}
                </div>
              )}
            </Dropzone>
          )}
        </div>
      </span>
    );
  }
}

DropZoneField.propTypes = {
  existingFile: PropTypes.object,
  error: PropTypes.bool,
  touched: PropTypes.bool,
  maxSize: PropTypes.number,
  filePartName: PropTypes.string,
  uploadUrl: PropTypes.string,
  mimeType: PropTypes.string,
};

export default DropZoneField;
