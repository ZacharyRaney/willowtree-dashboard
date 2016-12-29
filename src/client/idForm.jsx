import React from 'react';

class IdForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * updates the state whenever the textbox is updated
   */
  handleChange(event) {
    this.setState({ id: event.target.value });
  }

  /**
   * When the user submits the id, save the id to the
   * localStorage and then refresh
   */
  handleSubmit(event) {
    localStorage.setItem('id', this.state.id);
    event.preventDefault();
    window.location.reload(true);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="id">
          Id:
          <input type="text" value={this.state.id} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default IdForm;
