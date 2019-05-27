import React, { PropTypes } from 'react';

class TokenGroup extends React.Component {
  static propTypes = {
    token: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    sizing: PropTypes.object.isRequired,
    countClass: PropTypes.string.isRequired
  };

  render() {
    const { token, number, sizing, countClass } = this.props;
    const numberText = token.showNumber ? <p className="text-offset token-number">{number}</p> : null;
    const shadowText = token.showNumber ? <p className="text-offset token-shadow">{number}</p> : null;
    const shadowText2 = token.showNumber ? <p className="text-offset token-shadow2">{number}</p> : null;
    const shadowText3 = token.showNumber ? <p className="text-offset token-shadow3">{number}</p> : null;
    const shadowText4 = token.showNumber ? <p className="text-offset token-shadow4">{number}</p> : null;
    const sizeClass = sizing.size === '2' ? 'double' : '';
    const borderClass = token.showBorder ? '' : "no-border";
    const img = token.base64 ? <img src={token.base64} role="presentation"></img> : null;
    return (
      <div
        className={`token-view ${countClass}`}
        style={{
          marginRight: `${sizing.right}px`,
          marginBottom: `${sizing.bottom}px`
        }}
      >
        <div
          className={`token-wrap ${sizeClass} ${borderClass}`}
          style={{
            borderColor: `${token.borderColor}`,
            backgroundColor: `${token.backgroundColor}`
          }}
        >
          {img}
          {numberText}
        </div>
      </div>
    );
  }
}

export default TokenGroup;
