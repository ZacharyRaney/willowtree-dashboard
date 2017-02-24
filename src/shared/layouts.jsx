import React from 'react';

class Layouts {
  constructor() {
    this.default = {
      style: {
        grid: {
          width: '960px',
          height: '540px',
          float: 'left',
        },
        div: {
          overflow: 'hidden',
          width: '1920px',
        },
      },
      modules: [
        {
          width: 960,
          height: 540,
        },
        {
          width: 960,
          height: 540,
        },
        {
          width: 960,
          height: 540,
        },
        {
          width: 960,
          height: 540,
        },
      ],
    };
    this.default.layout = (
      <div style={this.default.style.div}>
        <div style={this.default.style.grid} className="mod1" />
        <div style={this.default.style.grid} className="mod2" />
        <div style={this.default.style.grid} className="mod3" />
        <div style={this.default.style.grid} className="mod4" />
      </div>
    );
  }
}

export default Layouts;
