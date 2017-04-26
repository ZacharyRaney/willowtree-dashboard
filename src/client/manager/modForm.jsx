import React from 'react';
import $ from 'jquery';
import { FormGroup, ControlLabel, FormControl, Button, ButtonGroup, Form } from 'react-bootstrap';
import TextMod from '../../shared/modules/textMod';
import OnTapMod from '../../shared/modules/onTapMod';
import TwitterMod from '../../shared/modules/twitterMod';
import Layouts from '../../shared/layouts';

class ModForm extends React.Component {

  constructor(props) {
    super(props);

    this.id = props.id;
    this.type = props.type;

    this.layouts = new Layouts();
    this.moduleTypes = { // Add new modules here
      TextMod,
      OnTapMod,
      TwitterMod,
    };
    this.modules = [];
    this.state = {
      layout: '',
      selectedMod: -1,
      selectedType: '',
      props: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModuleChange = this.handleModuleChange.bind(this);
  }

  componentDidMount() {
    let url = '';
    if (this.type === 'screen') {
      url = `/screen/${this.id}/data`;
    } else {
      url = `/screen/group/${this.type}/${this.id}/data`;
    }
    $.getJSON(url, (data) => {
      for (const modules of data.modules) {
        this.modules.push(modules);
      }
      this.setState({
        layout: data.layout,
      });
    });
  }

  /**
   * Used when the id is updated or the layout
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.layout) { // Updating the layout of the current screen
      for (let i = this.modules.length; i < this.layouts[nextProps.layout].modules.length; i += 1) {
        const newObject = {
          type: 'TextMod',
          props: {
            name: 'New Module',
            title: 'Please update!',
            body: '',
            bgImg: '',
          },
        };
        this.modules.push(newObject); // Add the missing modules if size differs
      }
      this.setState({
        layout: nextProps.layout,
      });
    } else { // Updating the currently selected screen
      this.modules = [];
      this.id = nextProps.id;
      this.type = nextProps.type;
      this.setState({
        layout: '',
        selectedMod: -1,
        selectedType: '',
        props: {},
      });
      let url = '';
      if (this.type === 'screen') {
        url = `/screen/${this.id}/data`;
      } else {
        url = `/screen/group/${this.type}/${this.id}/data`;
      }
      $.getJSON(url, (data) => {
        for (const modules of data.modules) {
          this.modules.push(modules);
        }
        this.setState({
          layout: data.layout,
        });
      });
    }
  }

  /**
   * Used by layout buttons to set the current
   * selected module to the state
   */
  handleClick(e) {
    this.setState({
      selectedMod: (e.target.id - 1),
      selectedType: this.modules[e.target.id - 1].type,
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

    let url = '';
    if (this.type === 'screen') { // Are we updating a group?
      url = `/screen/${this.id}/update`;
    } else {
      url = `/screen/group/${this.type}/${this.id}/update`;
    }
    $.post(url, {
      modules: this.modules,
      layout: this.state.layout,
    }, 'json');
  }

  handleModuleChange(e) {
    if (this.modules[this.state.selectedMod].type !== e.target.value) {
      const props = Object.keys(this.moduleTypes[e.target.value].propTypes);
      const newModule = {
        type: e.target.value,
        props: {},
      };
      for (const p of props) {
        if (p === 'width') { // Get the width from the layout sizes
          newModule.props[p] = this.layouts[this.state.layout]
          .modules[this.state.selectedMod]
          .width;
        } else if (p === 'height') {
          newModule.props[p] = this.layouts[this.state.layout]
          .modules[this.state.selectedMod]
          .height;
        } else {
          newModule.props[p] = '';
        }
      }
      this.modules[this.state.selectedMod] = newModule;
      this.setState({
        props: this.modules[this.state.selectedMod].props,
        selectedType: e.target.value,
      });
    }
  }

  /**
   * Returns form controls based on what type
   * of module is selected.
   */
  formControls() {
    if (this.modules.length < 1) {
      return (<div>module length err</div>);
    }
    if (this.state.selectedMod === -1) {
      return (<div>Select a slot</div>);
    }

    const keys = Object.keys(this.modules[this.state.selectedMod].props);
    const response = [];
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== 'width' && keys[i] !== 'height') {
        response.push(
          <div className="form-group" key={i}>
            <label htmlFor="InputName">{`${keys[i]}`}</label>
            <input
              type="text"
              className="form-control"
              id={keys[i]}
              value={this.state.props[`${keys[i]}`]}
              onChange={this.handleChange}
            />
          </div>
        );
      }
    }
    return (
      <div>
        {response}
      </div>
    );
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
      case 'longleft5':
        return (
          <FormGroup>
            <ButtonGroup>
              <ButtonGroup vertical>
                <Button id={1} onClick={this.handleClick}>1</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button id={2} onClick={this.handleClick}>2</Button>
                <Button id={4} onClick={this.handleClick}>4</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button id={3} onClick={this.handleClick}>3</Button>
                <Button id={5} onClick={this.handleClick}>5</Button>
              </ButtonGroup>
            </ButtonGroup>
          </FormGroup>
        );
      case 'longleft4':
        return (
          <FormGroup>
            <ButtonGroup>
              <ButtonGroup vertical>
                <Button id={1} onClick={this.handleClick}>1</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button id={2} onClick={this.handleClick}>2</Button>
                <Button id={4} onClick={this.handleClick}>4</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button id={3} onClick={this.handleClick}>3</Button>
              </ButtonGroup>
            </ButtonGroup>
          </FormGroup>
        );
      default:
        break;
    }
    return (<div>btn err</div>);
  }

  /**
   * Renders the dropdown list of all availble modules
   * that the user can select
   */
  selectModuleRender() {
    if (this.state.selectedMod === -1) {
      return (<div />);
    }
    const keys = Object.keys(this.moduleTypes);
    const options = [];
    for (const k of keys) {
      options.push(<option value={k} key={k}>{k}</option>);
    }
    return (
      <FormGroup controlId="formControlSelect">
        <ControlLabel>Module</ControlLabel>
        <FormControl
          componentClass="select"
          value={this.state.selectedType}
          onChange={this.handleModuleChange}
        >
          {options}
        </FormControl>
      </FormGroup>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.buttonLayout()}
        {this.selectModuleRender()}
        {this.formControls()}
        <input type="submit" value="Save" className="btn btn-default" />
      </Form>
    );
  }

}

ModForm.propTypes = {
  id: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default ModForm;
