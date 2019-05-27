import React, { PropTypes } from 'react';
import TokenView from './TokenView';

class TokenGroup extends React.Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    sizing: PropTypes.object.isRequired,
    globalIndex: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.renderGroup = this.renderGroup.bind(this);
  }

  renderGroup() {
    const { group, sizing, globalIndex } = this.props;
    let count = 1;
    let index = parseInt(group.count, 10);
    const tokens = [];
    while (count < parseInt(group.count, 10) + 1) {
      const countClass = `item-${(globalIndex - index)}`;
      tokens.push(
        <TokenView
          token={group}
          key={count}
          number={count}
          sizing={sizing}
          countClass={countClass}
        />
      );
      index --;
      count ++;
    }
    return tokens;
  }

  render() {
    const { sizing } = this.props;
    const adjustClass = sizing.adjust ? 'adjust' : '';
    return (
      <div className={`token-group ${adjustClass}`}>
        {this.renderGroup()}
      </div>
    );
  }
}

export default TokenGroup;
