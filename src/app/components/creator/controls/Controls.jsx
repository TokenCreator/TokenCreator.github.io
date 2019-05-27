import React, { PropTypes } from 'react';
import TokenForm from './token-form/TokenForm';

class Controls extends React.Component {
  static propTypes = {
    tokens: PropTypes.array.isRequired,
    addToken: PropTypes.func.isRequired,
    removeToken: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
    saveImage: PropTypes.func.isRequired,
    currentCount: PropTypes.number.isRequired,
    maxCount: PropTypes.number.isRequired
  };

  render() {
    const { tokens, currentCount, maxCount } = this.props;
    const remaining = maxCount - (currentCount || 0);
    const counterText = remaining === 1 ? 'slot' : 'slots';
    const disabledClass = remaining <= 0 ? 'disabled' : '';
    const addBtnText = remaining <= 0 ? 'Max Tokens' : 'New Token';
    const hideClass = tokens.length <= 0 ? 'hide' : '';
    return (
      <div className="controls">
        <div className="controlsTitle">
          <h3>Controls</h3>
          <p>{remaining} {counterText} remaining.</p>
        </div>
        <div className="forms">
          {tokens.map((t, i) =>
            <TokenForm
              token={t}
              key={i}
              removeToken={this.props.removeToken}
              updateToken={this.props.updateToken}
              remaining={remaining}
            />
          )}
        </div>
        <div
          className={`btn small ${disabledClass}`}
          onClick={this.props.addToken}
        >
          {addBtnText}
        </div>
        <div
          className={`btn small ${hideClass}`}
          onClick={this.props.saveImage}
        >
          Save Image
        </div>
      </div>
    );
  }
}

export default Controls;
