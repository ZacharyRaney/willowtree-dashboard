import React from 'react';
import $ from 'jquery';

class NewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      building: '',
      floor: '',
      room: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    $.post('/screen/new', {
      name: this.state.name,
      building: this.state.building,
      floor: this.state.floor,
      room: this.state.room,
    }, () => {
      window.location.reload(true);
    }).fail(() => {
      window.alert('Invalid input');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="building">Building</label>
          <input
            type="text"
            className="form-control"
            id="building"
            value={this.state.building}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="floor">Floor</label>
          <input
            type="text"
            className="form-control"
            id="floor"
            value={this.state.floor}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="room">Room</label>
          <input
            type="text"
            className="form-control"
            id="room"
            value={this.state.room}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn=default">Create</button>
      </form>
    );
  }
}

export default NewScreen;
