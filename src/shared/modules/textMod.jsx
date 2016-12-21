import React from 'react';

class TextMod extends React.Component {
  constructor(name, title, body, bgImg) {
    super();
    this.name = name;
    this.title = title;
    this.body = body;
    this.bgImg = bgImg;
  }
  getView(width, height) {
    const styles = {
      div: {
        alignItems: 'center',
        backgroundImage: `url(${this.bgImg})`,
        width,
        height,
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
    return (
      <div style={styles.div}>
        <h3 style={styles.name}>{this.name}</h3>
        <h1 style={styles.title}>{this.title}</h1>
        <h2 style={styles.body}>{this.body}</h2>
      </div>
    );
  }
}
export default TextMod;
