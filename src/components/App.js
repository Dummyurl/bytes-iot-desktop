import React, { Component } from 'react'

import Spinner from './Spinner'
import Sidebar from './Sidebar'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import '../assets/styles/App.scss'

class App extends React.Component {
  componentDidMount() {
    document.body.classList.add('app');
    require('../assets/scripts')
  }

  render() {
    return (
      <div>
        <Spinner />
        <Sidebar />
        <div className="page-container">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
