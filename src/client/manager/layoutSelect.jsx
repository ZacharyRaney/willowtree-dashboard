import React from 'react';

class LayoutSelect extends React.Component {
  constructor(props) {
    super(props);
    this.callback = props.callback;

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.callback(e.target.id);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <button onClick={this.onClick} className="btn btn-default" id="default">
                <img
                  src="img/layoutDefault.png"
                  className="img-responsive"
                  alt="Test layout"
                />
              </button>
              <button onClick={this.onClick} className="btn btn-default" id="longleft5">
                <img
                  src="img/layoutLongLeft5.png"
                  className="img-responsive"
                  alt="Test layout"
                />
              </button>
              <button onClick={this.onClick} className="btn btn-default" id="longleft4">
                <img
                  src="img/layoutLongLeft5.png"
                  className="img-responsive"
                  alt="Test layout"
                />
              </button>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

LayoutSelect.propTypes = {
  callback: React.PropTypes.func,
};

export default LayoutSelect;
