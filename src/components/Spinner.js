import React, { Component } from 'react'

import '../assets/css/App.scss'
import logoPng from '../assets/images/logo.png'

class Spinner extends React.Component {
  render() {
    return (
      <div id='loader'>
        <div class="spinner"></div>
      </div>
    )
  }
}

export default Spinner
