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
    };

    this.handleClick = this.handleClick.bind(this);
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
    });
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
                id="InputName"
                placeholder={this.modules[this.state.selectedMod].props.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputName">Title</label>
              <input
                type="text"
                className="form-control"
                id="InputTitle"
                placeholder={this.modules[this.state.selectedMod].props.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputName">Body</label>
              <textarea
                type="text"
                className="form-control"
                id="InputBody"
                placeholder={this.modules[this.state.selectedMod].props.body}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputName">Background URL</label>
              <input
                type="url"
                className="form-control"
                id="InputBgImg"
                placeholder={this.modules[this.state.selectedMod].props.bgImg}
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
                <Button id={2} onClick={this.handleClick}>2</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button id={3} onClick={this.handleClick}>3</Button>
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
      <Form>
        {this.buttonLayout()}
        <FormGroup controlId="formControlSelect">
          <ControlLabel>Module</ControlLabel>
          <FormControl componentClass="select" placeholder="Text">
            <option value="text">Text</option>
            <option value="ontap">OnTap</option>
          </FormControl>
        </FormGroup>
        {this.formControls()}
        <button type="submit" className="btn btn-default">
          Save
        </button>
      </Form>
    );
  }

}

ModForm.propTypes = {
  id: React.PropTypes.string,
};

export default ModForm;
