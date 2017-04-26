import React from 'react';

class TwitterMod extends React.Component {
  constructor(props) {
    super(props);
    this.twitterLink = props.link;
  }

  render() {
    return (
      <div>
        <a className="twitter-timeline" href={`${this.twitterLink}`}>Tweets</a>
      </div>
    );
  }
}

TwitterMod.propTypes = {
  link: React.PropTypes.string,
};

export default TwitterMod;
