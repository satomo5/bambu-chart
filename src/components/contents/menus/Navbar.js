import React, { Component } from 'react';

// render the navigation bar
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
          <div className="navbar-menu">
              <a href="/">
                <p className="navbar-logo">Bambu Life</p>
              </a>
          </div>
      </nav>
    );
  }
}

export default Navbar;