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
        backgroundImage: `url(${this.state.bgImg})`,
        width: props.width,
        height: props.height,
        backgroundSize: 'stretch',
        overflow: 'hidden',
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
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default TextMod;
