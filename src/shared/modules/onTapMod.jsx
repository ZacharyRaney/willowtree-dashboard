import React from 'react';
import $ from 'jquery';

class OnTapMod extends React.Component {
  constructor(props) {
    super(props);
    this.taps = [];
    this.state = {
      number: 1,
      name: 'Bumper Crop 2015',
      location: 'South Street Brewery',
      type: 'Pale Double IPA',
      abv: '8.3%',
      description: '500 lbs. of fresh Nelson County Cascade hops layered on top of a spectacular pale double IPA.',
    };
    this.styles = {
      div: {
        alignItems: 'center',
        width: props.width,
        height: props.height,
        overflow: 'hidden',
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#124A55',
        fontFamily: 'BlinkMacSystemFont',
        fontWeight: '100',

      },
      tap: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: '60px',
        color: '#252525',
        margin: '',
        display: '',
        fontFamily: 'BlinkMacSystemFont',
        fontWeight: '100',
        textDecoration: 'underline',
      },
      name: {
        fontSize: 50,
        textAlign: 'center',
        padding: '',
        margin: '',
        color: '#124A55',
        fontFamily: 'BlinkMacSystemFont',
        fontWeight: '600',
      },
      info: {
        fontSize: 30,
        textAlign: 'center',
        padding: '',
        margin: '',
        color: '#124A55',
        display: '',
        fontFamily: 'BlinkMacSystemFont',
        fontWeight: '300',
      },
      desc: {
        fontSize: 30,
        textAlign: 'center',
        padding: '',
        margin: '',
        color: '#124A55',
        display: '',
        fontFamily: 'BlinkMacSystemFont',
        fontWeight: '300',
      },
    };
  }

  componentDidMount() {
    $.getJSON('/ontap', (data) => {
      $.each(data.values, (key, val) => {
        this.taps.push(val);
        this.setState({
          number: key + 1,
          name: this.taps[0][0],
          location: this.taps[0][1],
          type: this.taps[0][2],
          abv: this.taps[0][3],
          description: this.taps[0][4],
        });
      });
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
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default OnTapMod;
