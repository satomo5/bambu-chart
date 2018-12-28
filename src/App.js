import React, { Component } from 'react';
import Navbar from './components/contents/menus/Navbar';
import Footer from './components/contents/menus/Footer';
import MainContent from './components/contents/menus/Main';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
