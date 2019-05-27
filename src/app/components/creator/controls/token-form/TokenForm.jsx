import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import AvatarCropper from 'react-avatar-cropper';

class TokenForm extends React.Component {
  static propTypes = {
    token: PropTypes.object.isRequired,
    removeToken: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
    remaining: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      imageError: undefined,
      crop: false
    };

    this.handleCrop = this.handleCrop.bind(this);
    this.handleRequestHide = this.handleRequestHide.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    if (!token.cropped) {
      this.setState({
        crop: true
      });
    }
  }

  handleCrop(dataURI) {
    const { token } = this.props;
    token.base64 = dataURI;
    token.cropped = true;
    this.setState({
      crop: false
    }, () => this.props.updateToken(token));
  }

  handleRequestHide() {
    this.setState({
      crop: false
    });
  }

  handleChange(e, max) {
    const self = this;
    let finalCount = null;
    const { token } = this.props;
    const {
      count,
      image,
      showNumber,
      showBorder,
      borderColor,
      backgroundColor
    } = e.target.form;
    if (count.value > max) {
      finalCount = max;
    } else if (count.value < 0) {
      finalCount = '';
    } else {
      finalCount = count.value;
    }
    const tokenData = {
      count: finalCount,
      index: token.index,
      showNumber: showNumber.checked,
      showBorder: showBorder.checked,
      borderColor: borderColor.value,
      backgroundColor: backgroundColor.value,
      cropped: token.cropped
    };
    // Check if image is different. If so update it after loaded.
    if ((token.image !== image.files[0]) && image.files && image.files[0]) {
      if (image.files[0].size > 1e+6) {
        self.setState({ imageError: 'File Too Large.' });
        self.props.updateToken(tokenData);
      } else {
        self.setState({
          imageError: ''
        });
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          tokenData.image = image.files[0];
          tokenData.base64 = reader.result;
          tokenData.cropped = false;
          self.props.updateToken(tokenData);
        }, false);
        reader.readAsDataURL(image.files[0]);
      }
    } else {
      tokenData.image = token.image;
      tokenData.base64 = token.base64;
      self.props.updateToken(tokenData);
    }
  }

  render() {
    const { token, remaining } = this.props;
    const dropzoneMessage = this.state.imageError !== undefined
    ? this.state.imageError : 'Click or Drop Image Here.';

    const dropzoneClass = this.state.imageError ? 'error' : '';
    const maxCount = parseInt(token.count, 10) + remaining;

    const cropper = this.state.crop ?
      <AvatarCropper
        className="TEST"
        onRequestHide={this.handleRequestHide}
        cropperOpen={this.state.crop}
        onCrop={this.handleCrop}
        image={token.base64}
        width={400}
        height={400}
      />
      : null;
    return (
      <form
        className="token-form clear"
        onChange={(e) => this.handleChange(e, maxCount)}
      >
        {cropper}
        <div className="dropzoneWrap">
          <Dropzone
            className={`${dropzoneClass} dropzone`}
            style={{ backgroundImage: `url(${token.base64})` }}
            name="image"
            value={token.image}
            multiple={false}
            maxSize={1048576}
          >
            {dropzoneMessage}
          </Dropzone>
        </div>
        <div className="input-wrap">
          <label htmlFor={`count-${token.index}`}>
            Count
          </label>
          <input
            id={`count-${token.index}`}
            value={token.count}
            type="number"
            name="count"
            min="1"
            max={maxCount}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor={`number-${token.index}`}>
            Show Number
          </label>
          <input
            id={`number-${token.index}`}
            name="showNumber"
            type="checkbox"
            defaultChecked={token.showNumber}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor={`border-${token.index}`}>
            Show Border
          </label>
          <input
            id={`border-${token.index}`}
            name="showBorder"
            type="checkbox"
            defaultChecked={token.showBorder}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor={`border-color-${token.index}`}>
            Border Color
          </label>
          <input
            id={`border-color-${token.index}`}
            name="borderColor"
            type="color"
            defaultValue={token.borderColor}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor={`background-color-${token.index}`}>
            BG Color
          </label>
          <input
            id={`background-color-${token.index}`}
            name="backgroundColor"
            type="color"
            defaultValue={token.backgroundColor}
          />
        </div>
        <div
          className="delete"
          onClick={() => this.props.removeToken(token.index)}
        />
      </form>
    );
  }
}

export default TokenForm;
