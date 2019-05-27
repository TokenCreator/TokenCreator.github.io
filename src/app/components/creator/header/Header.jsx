import React from 'react';
import { Modal } from 'react-bootstrap';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      howTo: false,
      why: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(name) {
    switch (name) {
      case 'howTo':
        this.setState({
          howTo: !this.state.howTo
        });
        break;
      case 'why':
        this.setState({
          why: !this.state.why
        });
        break;
    }
  }

  render() {
    return (
      <div className="header">
        <ul>
          <li
            onClick={() => this.toggleModal('howTo')}
          >
            How To
          </li>
          <li
            onClick={() => this.toggleModal('why')}
          >
            Why?
          </li>
        </ul>
        <Modal
          show={this.state.howTo}
          onHide={() => this.toggleModal('howTo')}
        >
          <div
            className="close"
            onClick={() => this.toggleModal('howTo')}
          />
          <h2>How To</h2>
          <ol>
            <li>
              <h4>Create</h4>
              a printable template image here on Token Creator that is
              customized to the creatures and characters you need for your
              unique adventure.
            </li>
            <li>
              <h4>Print</h4>
              the template file created with Token Creator on round sticker labels.
              <br></br>
              <br></br>
              While there are many ways you could use this tool, because of
              all of the different printers, lables, settings, browsers, and
              other factors that could affect the final results I recommend
              checking out my
              <a
                href="https://www.amazon.com/gp/registry/wishlist/3IMDTIYISS36R/ref=cm_sw_su_w?&_encoding=UTF8&tag=recall02-20&linkCode=ur2&linkId=75058c717394aa040e9750cf88e477b3&camp=1789&creative=9325"
                target="_blank"
              >
                list of supplies
              </a>
              from amazon. While this still cannot guarantee a perfect result,
              Token Creator was created using
              <a
                href="https://www.amazon.com/gp/registry/wishlist/3IMDTIYISS36R/ref=cm_sw_su_w?&_encoding=UTF8&tag=recall02-20&linkCode=ur2&linkId=75058c717394aa040e9750cf88e477b3&camp=1789&creative=9325"
                target="_blank"
              >
                these exact supplies
              </a>
              and will help with a favorable outcome.
            </li>
            <li>
              <h4>Apply</h4>
              the template lables to whatever token base you choose.
            </li>
          </ol>
        </Modal>
        <Modal
          show={this.state.why}
          onHide={() => this.toggleModal('why')}
        >
          <div
            className="close"
            onClick={() => this.toggleModal('why')}
          />
          <h2>Why?</h2>
          <p>
            Short story. A while ago a
            <a
              href="https://www.reddit.com/r/DnD/comments/2m08wq/lost_mine_of_phandelver_tokens_ready_for_you_3/"
              target="_blank"
            >
              post on Reddit
            </a>
            was found with an amazing resorce for all tokens one would need to
            run the entire Lost Mine of Phandelver campaign. These tokens
            looked fantastic and made running the campaign a lot easier and
            more fun. However creating solid and nice tokens from the resource
            proved much harder than hoped. After spending a lot of time
            in PhotoShop painstakingly adjusting each token to fit within a
            template for round lables I knew there had to be a better way.
            Also being a web dev I thought that perhaps I could create that
            better way so here is my attempt at it.
            <br />
            <br />
            Every adventure needs characters and creatures to interact with,
            but shouldn't be limited by the amount of money you have to spend
            on fancy miniatures or your ability to draw amazing artwork.
            Token Creator was created in the hopes to offer an alternate to
            purchasing miniatures or creating "home made" looking tokens by
            hand. With Token Creator you can create amazing looking tokens
            from home without having to pay an arm and a leg.
            <br />
            <br />
            Using this
            <a
              href="https://www.amazon.com/gp/registry/wishlist/3IMDTIYISS36R/ref=cm_sw_su_w?&_encoding=UTF8&tag=recall02-20&linkCode=ur2&linkId=75058c717394aa040e9750cf88e477b3&camp=1789&creative=9325"
              target="_blank"
            >
              list of supplies
            </a>
            from amazon you can create tokens for approximately 10 cents
            per 1 inch token, or approximately 30 cents per 2 inch token.
            <br />
            <br />
            My hope is that with Token Creator many adventures out there get
            a boost of authenticity and fun without hitting too hard on your wallet.
          </p>
        </Modal>
      </div>
    );
  }
}

export default Header;
