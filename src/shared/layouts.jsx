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

    this.longleft5 = {
      style: {
        tall: {
          height: '100%',
          width: '20%',
          float: 'left',
        },
        grid: {
          width: '40%',
          height: '50%',
          float: 'left',
        },
        mainDiv: {
          overflow: 'hidden',
          height: `${window.innerHeight}px`,  // Force div to be window height
        },
      },
      modules: [
        { // This is the larger side module
          width: '20%',
          height: '100%',
        },
        {
          width: '40%',
          height: '50%',
        },
        {
          width: '40%',
          height: '50%',
        },
        {
          width: '40%',
          height: '50%',
        },
        {
          width: '40%',
          height: '50%',
        },
      ],
    };
    this.longleft5.layout = (
      <div style={this.longleft5.style.mainDiv}>
        <div style={this.longleft5.style.tall} className="mod1" />
        <div style={this.longleft5.style.grid} className="mod2" />
        <div style={this.longleft5.style.grid} className="mod3" />
        <div style={this.longleft5.style.grid} className="mod4" />
        <div style={this.longleft5.style.grid} className="mod5" />
      </div>
    );

    this.longleft4 = {
      style: {
        tall: {
          height: '100%',
          width: '30%',
          float: 'left',
        },
        long: {
          height: '50%',
          width: '70%',
          float: 'left',
        },
        grid: {
          width: '35%',
          height: '50%',
          float: 'left',
        },
        mainDiv: {
          overflow: 'hidden',
          height: `${window.innerHeight}px`,  // Force div to be window height
        },
      },
      modules: [
        { // This is the larger side module
          width: '30%',
          height: '100%',
        },
        {
          width: '35%',
          height: '50%',
        },
        {
          width: '35%',
          height: '50%',
        },
        { // Long module
          width: '70%',
          height: '50%',
        },
      ],
    };
    this.longleft4.layout = (
      <div style={this.longleft4.style.mainDiv}>
        <div style={this.longleft4.style.tall} className="mod1" />
        <div style={this.longleft4.style.grid} className="mod2" />
        <div style={this.longleft4.style.grid} className="mod3" />
        <div style={this.longleft4.style.long} className="mod4" />
      </div>
    );
  }
}

export default Layouts;
