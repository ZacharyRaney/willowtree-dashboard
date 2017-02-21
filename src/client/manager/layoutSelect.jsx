import React from 'react';

class LayoutSelect extends React.Component {
  constructor(props) {
    super(props);
    this.callback = props.callback;
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <button className="btn btn-default">
                <img
                  src="img/layoutTest.png"
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
