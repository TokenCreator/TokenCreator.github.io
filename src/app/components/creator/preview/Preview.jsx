import React, { PropTypes } from 'react';
import TokenGroup from './token-group/TokenGroup';

class Preview extends React.Component {
  static propTypes = {
    tokens: PropTypes.array.isRequired,
    sizing: PropTypes.object.isRequired
  }

  render() {
    const { tokens, sizing } = this.props;
    const defaultPadding = sizing.size === '1' ? 50 : 63;
    const sizeClass = sizing.size === '1' ? 'one-inch' : 'two-inch';
    let globalIndex = 1;
    return (
      <div
        id="preview"
        className={`preview ${sizeClass}`}
        style={{
          paddingTop: `${defaultPadding - sizing.margin}px`,
          paddingLeft: `${defaultPadding - sizing.margin}px`,
          width: `${850 - (sizing.margin * 2)}px`,
          height: `${1100 - (sizing.margin * 2)}px`
        }}
      >
        {tokens.map((t, i) => {
          globalIndex = globalIndex + parseInt(t.count, 10);
          return (
            <TokenGroup
              group={t}
              key={i}
              globalIndex={globalIndex}
              sizing={sizing}
            />
          );
        })}
      </div>
    );
  }
}

export default Preview;
