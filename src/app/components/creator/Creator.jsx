import React from 'react';
import Header from './header/Header';
import Sizing from './sizing/Sizing';
import Preview from './preview/Preview';
import Controls from './controls/Controls';
import Rebase from 're-base';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { detect } from 'detect-browser';
const browser = detect();

const support = [
  'chrome',
  'firefox'
];

const base = Rebase.createClass({
  apiKey: 'AIzaSyClmAPFj3ZeavFBh7vlvTssbTzNGyJW90s',
  databaseURL: 'https://tokencreator-a9543.firebaseio.com',
});

class Creator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      sizing: {
        margin: 0,
        right: 8.2,
        bottom: 12.3,
        size: '1',
        adjust: false
      },
      showAll: false,
      currentCount: 0,
      totalCount: 0,
      maxCount: 63
    };

    this.saveImage = this.saveImage.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.addToken = this.addToken.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.updateSizing = this.updateSizing.bind(this);
    this.updateCurrentCount = this.updateCurrentCount.bind(this);
    this.updateTotalCount = this.updateTotalCount.bind(this);
  }

  updateSizing(sizing) {
    if (sizing.size === '2' && this.state.sizing.size === '1') {
      sizing.margin = 0;
      sizing.right = 62;
      sizing.bottom = 58.5;
      this.setState({
        maxCount: 12
      });
    } else if (sizing.size === '1' && this.state.sizing.size === '2') {
      sizing.margin = 0;
      sizing.right = 8.2;
      sizing.bottom = 12.3;
      this.setState({
        maxCount: 63
      });
    }
    this.setState({ sizing });
  }

  componentWillMount() {
    base.syncState(process.env.NODE_ENV, {
      context: this,
      state: 'totalCount'
    });
  }

  saveImage() {
    const self = this;
    self.setState({
      showAll: true
    }, () => {
      const preview = document.getElementById('previewContainer');
      domtoimage.toBlob(preview)
      .then((blob) => {
        saveAs(blob, 'tokens.png');
        self.setState({
          showAll: false
        }, () => this.updateTotalCount());
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
        self.setState({
          showAll: false
        });
      });
    });
  }

  addToken() {
    const newTokens = this.state.tokens;
    const empty = {
      image: '',
      base64: null,
      count: 1,
      index: Math.random().toString(36).substr(2, 9),
      showNumber: false,
      showBorder: false,
      borderColor: '#111111',
      backgroundColor: '#333333',
      cropped: true
    };
    newTokens.push(empty);
    this.setState({
      tokens: newTokens
    }, () => this.updateCurrentCount());
  }

  removeToken(index) {
    const newTokens = this.state.tokens;
    const token = newTokens.find((t) => t.index === index);
    const arrayIndex = newTokens.indexOf(token);
    newTokens.splice(arrayIndex, 1);
    this.setState({
      tokens: newTokens
    }, this.updateCurrentCount());
  }

  updateToken(token) {
    const newTokens = this.state.tokens;
    const oldToken = newTokens.find((t) => t.index === token.index);
    const arrayIndex = newTokens.indexOf(oldToken);
    newTokens.splice(arrayIndex, 1, token);
    this.setState({
      tokens: newTokens
    }, () => this.updateCurrentCount());
  }

  updateCurrentCount() {
    let currentCount = 0;
    this.state.tokens.forEach(t => {
      const count = parseInt(t.count, 10);
      currentCount += count;
    });
    this.setState({ currentCount });
  }

  updateTotalCount() {
    const { totalCount, currentCount } = this.state;
    const newTotal = parseInt(totalCount, 10) + parseInt(currentCount, 10);
    this.setState({
      totalCount: newTotal
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (support.indexOf(browser.name) < 0) {
      return (
        <h1 className="browserError">
          Unfortunately this tool does not currently work with
          <span> {browser.name}. </span>
          Please use the desktop version of either
          <a href="https://www.google.com/chrome/">Chrome</a>
          or
          <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>.
          Sorry for the inconvenience.
        </h1>
      );
    }
    const { tokens, sizing, totalCount } = this.state;
    const scaleSize = this.state.showAll ? {
      maxWidth: `${((850 - (sizing.margin * 2)) * 3)}px`,
      width: `${((850 - (sizing.margin * 2)) * 3)}px`,
      height: `${((1100 - (sizing.margin * 2)) * 3)}px`
    } : {};
    const previewClass = this.state.showAll ? 'showAll' : '';
    const processing = this.state.showAll ? (
      <div className="processing">
        <div className="processingContent">
          <h1 className="saving">
            Creating Template
          </h1>
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <div className="main creator">
        {processing}
        <Header />
        <div className="creatorTitle">
          <img src="./static/logo.png" alt="logo" />
          <p>Table Top</p>
          <h1>Token Creator <span>beta</span></h1>
        </div>
        <div className="sizing">
          <Sizing
            sizing={sizing}
            updateSizing={this.updateSizing}
          />
        </div>
        <div className="creatorWrap">
          <div className="container controlsWrap">
            <Controls
              tokens={tokens}
              addToken={this.addToken}
              removeToken={this.removeToken}
              updateToken={this.updateToken}
              saveImage={this.saveImage}
              currentCount={this.state.currentCount}
              maxCount={this.state.maxCount}
            />
            <div className="supplies">
              <a
                className="btn large"
                href="https://www.amazon.com/gp/registry/wishlist/3IMDTIYISS36R/ref=cm_sw_su_w?&_encoding=UTF8&tag=recall02-20&linkCode=ur2&linkId=75058c717394aa040e9750cf88e477b3&camp=1789&creative=9325"
                target="_blank"
              >
                Supplies
              </a>
            </div>
          </div>
          <div
            id="previewContainer"
            className={`container previewWrap ${previewClass}`}
            style={scaleSize}
          >
            <Preview
              tokens={tokens}
              sizing={sizing}
            />
          </div>
          <div className="footer">
            <h3>{this.numberWithCommas(totalCount)} tokens created!</h3>
            <p className="disclaimer">
              This tool is meant to help in creating printing templates,
              however it is not a gaurantee. With all of the different printers,
              lables, settings, browsers, versions, and many other factors
              that could affect the final results there is no guarantee this
              tool will work perfectly in all situations.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Creator;
