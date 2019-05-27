import React, { PropTypes } from 'react';
// import Dropzone from 'react-dropzone';

class Sizing extends React.Component {
  static propTypes = {
    sizing: PropTypes.object.isRequired,
    updateSizing: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { sizing } = this.props;
    const {
      margin,
      paddingTop,
      paddingLeft,
      right,
      bottom,
      // image,
      size,
      adjust
    } = e.target.form;
    // let imageValue = sizing.image;
    // if (image.files && image.files[0] && image.files[0].preview) {
    //   imageValue = image.files[0].preview;
    // }
    const sizingData = {
      margin: margin.value,
      right: right.value,
      bottom: bottom.value,
      image: sizing.image,
      size: size.value,
      adjust: adjust.checked
    };
    this.props.updateSizing(sizingData);
  }

  render() {
    const { sizing } = this.props;
    return (
      <form
        className="sizing-form clear"
        onChange={this.handleChange}
      >
        <div className="input-wrap">
          <label htmlFor="margin">
            Printer Margin
          </label>
          <input
            id="margin"
            value={sizing.margin}
            type="number"
            name="margin"
            min="0"
            max="50"
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="spaceBetween">
            Space Between
          </label>
          <input
            id="spaceBetween"
            value={sizing.right}
            type="number"
            name="right"
            min="0"
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="spaceBelow">
            Space Below
          </label>
          <input
            id="spaceBelow"
            value={sizing.bottom}
            type="number"
            name="bottom"
            min="0"
          />
        </div>
        {<div className="radio-group">
          <p>Token Size</p>
          <div className="input-wrap">
            <label htmlFor="oneInch">
              1"
            </label>
            <input
              id="oneInch"
              defaultChecked={sizing.size === '1'}
              type="radio"
              name="size"
              value="1"
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="twoInch">
              2"
            </label>
            <input
              id="twoInch"
              defaultChecked={sizing.size === '2'}
              type="radio"
              name="size"
              value="2"
            />
          </div>
        </div>}
        { /* <Dropzone
          className="dropzone"
          style={{ backgroundImage: `url(${sizing.image})` }}
          name="image"
          value={sizing.image}
          multiple={false}
        /> */ }
        <div className="checkbox-group input-wrap">
          <label htmlFor="adjust">
            Align Mode
          </label>
          <input
            id="adjust"
            name="adjust"
            type="checkbox"
            defaultChecked={sizing.adjust}
          />
        </div>
      </form>
    );
  }
}

export default Sizing;
