import React from 'react';

class TextMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      title: props.title,
      body: props.body,
      bgImg: props.bgImg,
    };
    this.styles = {
      div: {
        alignItems: 'center',
        background: `url(${this.state.bgImg}) no-repeat`,
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100%', // Make sure the background fits
        overflow: 'hidden',
        color: '#000000',
      },
      name: {
        fontSize: 20,
        textAlign: 'center',
      },
      title: {
        paddingTop: '100px',
        fontSize: 50,
        textAlign: 'center',
      },
      body: {
        fontSize: 30,
        textAlign: 'center',
      },
    };
    if (this.state.bgImg !== '') {
      this.styles.div.color = '#FFFFFF';
      this.styles.div.textShadow = '2px 2px #000000';
    } else {
      this.styles.div.color = '#000000';
    }
  }
  render() {
    return (
      <div style={this.styles.div}>
        <h3 style={this.styles.name}>{this.state.name}</h3>
        <h1 style={this.styles.title}>{this.state.title}</h1>
        <h2 style={this.styles.body}>{this.state.body}</h2>
      </div>
    );
  }
}

TextMod.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  body: React.PropTypes.string,
  bgImg: React.PropTypes.string,
};

export default TextMod;
