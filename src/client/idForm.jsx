import React from 'react';

class IdForm extends React.Component {
  constructor(props) {
    super(props);
    this.callback = props.callback;
    this.state = { id: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ id: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.callback}>
        <label htmlFor="id">
          Id:
          <input type="text" value={this.state.id} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

IdForm.propTypes = {
  callback: React.PropTypes.func,
};

export default IdForm;
