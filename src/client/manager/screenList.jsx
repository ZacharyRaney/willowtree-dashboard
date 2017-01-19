import React from 'react';
import $ from 'jquery';
import TreeView from 'react-treeview';

class ScreenList extends React.Component {
  constructor(props) {
    super(props);

    this.callback = props.callback;
    this.buildings = [];
    this.floors = [];
    this.rooms = [];
    this.state = {
      currentSelected: 'all',
      screenMap: null,
      screenData: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    $.getJSON('/screen/all/list', (data) => {
      const screens = new Map();
      for (const s of data) { // Create a multilevel map to keep track of building, floor, etc...
        if (screens.has(s.building)) {
          if (screens.get(s.building).has(s.floor)) {
            if (screens.get(s.building).get(s.floor).has(s.room)) {
              screens.get(s.building).get(s.floor).get(s.room).push(s.name);
            } else {
              screens.get(s.building).get(s.floor).set(s.room, []);
              screens.get(s.building).get(s.floor).get(s.room).push(s.name);
            }
          } else {
            screens.get(s.building).set(s.floor, new Map());
            screens.get(s.building).get(s.floor).set(s.room, []);
            screens.get(s.building).get(s.floor).get(s.room).push(s.name);
          }
        } else {
          screens.set(s.building, new Map());
          screens.get(s.building).set(s.floor, new Map());
          screens.get(s.building).get(s.floor).set(s.room, []);
          screens.get(s.building).get(s.floor).get(s.room).push(s.name);
        }
        // Keep track of buildings, floors, and rooms
        if (!this.buildings.includes(s.building)) { this.buildings.push(s.building); }
        if (!this.floors.includes(s.floor)) { this.floors.push(s.floor); }
        if (!this.rooms.includes(s.room)) { this.rooms.push(s.room); }
      }
      this.setState({
        screenMap: screens,
        screenData: data,
      });
    });
  }

  handleClick(e) {
    if (this.buildings.includes(e.target.id)) {
      this.callback(e.target.id, 'building');
    } else if (this.floors.includes(e.target.id)) {
      this.callback(e.target.id, 'floor');
    } else if (this.rooms.includes(e.target.id)) {
      this.callback(e.target.id, 'room');
    } else {
      this.callback(e.target.id, 'screen');
    }
  }

  /**
   * Recursively creates a TreeView for the buildings,
   * floors, rooms, and screens.
   */
  renderList(map) {
    const result = [];
    if (map instanceof Array) {
      map.forEach((val) => {
        result.push(<a href={`#${val}`} className="node" id={val} onClick={this.handleClick}>{val}</a>);
      });
    } else if (map instanceof Map) {
      map.forEach((val, key) => {
        const label = (<a href={`#${key}`} className="node" id={key} onClick={this.handleClick}>{key}</a>);
        result.push(
          <TreeView nodeLabel={label} >
            {this.renderList(val)}
          </TreeView>
        );
      });
    }
    return (<div>{result}</div>);
  }

  render() {
    return (
      <div>
        {this.renderList(this.state.screenMap)}
      </div>
    );
  }
}

ScreenList.propTypes = {
  callback: React.PropTypes.func,
};

export default ScreenList;
