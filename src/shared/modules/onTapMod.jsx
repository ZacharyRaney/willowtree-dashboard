import React from 'react';
import $ from 'jquery';

class OnTapMod extends React.Component {
  constructor(props) {
    super(props);
    this.taps = [];
    this.timer = null;
    this.state = {
      number: 1,
      name: 'LOADING...',
      location: '',
      type: '',
      abv: '',
      description: '',
    };
    this.styles = {
      div: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#529DA8',
        color: '#FFFFFF',
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
      },
      tap: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: '60px',
        textDecoration: 'underline',
      },
      name: {
        fontSize: 50,
        textAlign: 'center',
      },
      info: {
        fontSize: 30,
        textAlign: 'center',
      },
      desc: {
        fontSize: 30,
        textAlign: 'center',
      },
    };

    this.updateDrink = this.updateDrink.bind(this);
  }

  componentDidMount() {
    $.getJSON('/ontap', (data) => {
      $.each(data.values, (key, val) => {
        this.taps.push(val);
      });
      this.setState({
        number: 1,
        name: this.taps[0][0],
        location: this.taps[0][1],
        type: this.taps[0][2],
        abv: this.taps[0][3],
        description: this.taps[0][4],
      });

      // Switches the currently displayed drink on a timer
      this.timer = window.setInterval(this.updateDrink, 10000);
    });
  }

  updateDrink() {
    let num = 0;
    if (this.state.number + 1 > this.taps.length) {
      num = 1;
    } else {
      num = this.state.number + 1;
    }
    this.setState({
      number: num,
      name: this.taps[num - 1][0],
      location: this.taps[num - 1][1],
      type: this.taps[num - 1][2],
      abv: this.taps[num - 1][3],
      description: this.taps[num - 1][4],
    });
  }

  render() {
    return (
      <div style={this.styles.div}>
        <h3 style={this.styles.title}>{'WHAT\'S ON TAP?'}</h3>
        <h2 style={this.styles.tap}>{`TAP ${this.state.number}`}</h2>
        <h1 style={this.styles.name}>{this.state.name}</h1>
        <h2 style={this.styles.info}>{`${this.state.location} | ${this.state.type} | ${this.state.abv}`}</h2>
        <h2 style={this.styles.desc}>{this.state.description}</h2>
      </div>
    );
  }
}

OnTapMod.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
};

export default OnTapMod;
