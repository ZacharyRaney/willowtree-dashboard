import React from 'react';

class Layouts extends React.Component {
  constructor() {
    super();
    this.defaultStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      width: '100%',
    };
    this.default = (
      <table style={this.defaultStyle} >
        <tr>
          <td>
            <div className="mod1" />
          </td>
          <td>
            <div className="mod2" />
          </td>
        </tr>
        <tr>
          <td>
            <div className="mod3" />
          </td>
          <td>
            <div className="mod4" />
          </td>
        </tr>
      </table>
    );
  }
}

export default Layouts;
