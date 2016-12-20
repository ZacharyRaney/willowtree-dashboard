import React from 'react';

class Layouts extends React.Component {
  constructor() {
    super();
    this.defaultStyle = {
      grid: {
        width: '960px',
        height: '540px',
        float: 'left',
      },
      div: {
        overflow: 'hidden',
        width: '1920px',
      },
    };
    this.default = (
      <div style={this.defaultStyle.div}>
        <div style={this.defaultStyle.grid} className="mod1" />
        <div style={this.defaultStyle.grid} className="mod2" />
        <div style={this.defaultStyle.grid} className="mod3" />
        <div style={this.defaultStyle.grid} className="mod4" />
      </div>
    );
  }
}

export default Layouts;
