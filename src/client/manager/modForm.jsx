import React from 'react';
import $ from 'jquery';
import { FormGroup, ControlLabel, FormControl, Button, ButtonGroup, Form } from 'react-bootstrap';

class ModForm extends React.Component {

  constructor(props) {
    super(props);

    this.modules = [];
    this.id = props.id;
    this.state = {
      layout: '',
      selectedMod: 0,
      props: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $.getJSON(`/screen/${this.id}/data`, (data) => {
      for (const modules of data.modules) {
        this.modules.push(modules);
      }
      this.setState({
        layout: data.layout,
      });
    });
  }

  /**
   * Used by layout buttons to set the current
   * selected module to the state
   */
  handleClick(e) {
    this.setState({
      selectedMod: (e.target.id - 1),
      props: this.modules[e.target.id - 1].props,
    });
  }

  handleChange(e) {
    const tempState = this.state.props;
    tempState[e.target.id] = e.target.value;
    this.setState({
      props: tempState,
    });
  }

  handleSubmit(e) {
    this.modules[this.state.selectedMod] = {
      type: this.modules[this.state.selectedMod].type,
      props: this.state.props,
    };
    e.preventDefault();
    $.post('/screen/all/update', {
      modules: this.modules,
      layout: this.state.layout,
    }, 'json');
  }

  /**
   * Returns form controls based on what type
   * of module is selected. New modules must
   * be added here.
   */
  formControls() {
    if (this.modules.length < 1) {
      return (<div>module length err</div>);
    }
    switch (this.modules[this.state.selectedMod].type) {
      case 'TextMod':
        return (
          <div>
            <div className="form-group">
              <label htmlFor="InputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={this.state.props.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputName">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={this.state.props.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputName">Body</label>
              <textarea
                type="text"
                className="form-control"
                id="body"
                value={this.state.props.body}
                onChange={this.handleChange}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputName">Background URL</label>
              <input
                type="url"
                className="form-control"
                id="bgImg"
                value={this.state.props.bgImg}
                onChange={this.handleChange}
              />
            </div>
          </div>
        );
      case 'OnTapMod':
        return (
          <div>No options...</div>
        );
      default:
        return (<div>Unknown module</div>);
    }
  }

  /**
   * Returns the buttons for the current screen
   * layout. All buttons call this.handleClick
   * onClick. New layouts must be added here.
   */
  buttonLayout() {
    switch (this.state.layout) {
      case 'default':
        return (
          <FormGroup>
            <ButtonGroup>
              <ButtonGroup vertical>
                <Button id={1} onClick={this.handleClick}>1</Button>
                <Button id={3} onClick={this.handleClick}>3</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button id={2} onClick={this.handleClick}>2</Button>
                <Button id={4} onClick={this.handleClick}>4</Button>
              </ButtonGroup>
            </ButtonGroup>
          </FormGroup>
        );
      default:
        break;
    }
    return (<div>btn err</div>);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.buttonLayout()}
        <FormGroup controlId="formControlSelect">
          <ControlLabel>Module</ControlLabel>
          <FormControl componentClass="select" placeholder="Text">
            <option value="TextMod">Text</option>
            <option value="OnTapMod">OnTap</option>
          </FormControl>
        </FormGroup>
        {this.formControls()}
        <input type="submit" value="Save" className="btn btn-default" />
      </Form>
    );
  }

}

ModForm.propTypes = {
  id: React.PropTypes.string,
};

export default ModForm;
