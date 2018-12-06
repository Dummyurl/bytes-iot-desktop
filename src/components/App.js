import React, { Component } from 'react'
const { ipcRenderer } = require('electron');

import Spinner from './Spinner'
import Sidebar from './Sidebar'
import Header from './Header'
import MainContainer from './MainContainer'
import Footer from './Footer'

import '../assets/styles/App.scss'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      bytesNetworks: [],
      selectedNetwork: null,
      error: null
    }

    this.onNetworkSelect = this.onNetworkSelect.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('app');
    require('../assets/scripts')

    ipcRenderer.on('get-bytes-networks-resp', (event, error, bytesNetworks) => {
      if(error) {
        console.log("Error fetching networks", error)
        this.setState({ selectedNetwork: null, error})
        return
      }
      this.setState({ bytesNetworks })
    })
    ipcRenderer.send('get-bytes-networks');
  }

  onNetworkSelect(error, selectedNetwork) {
    if (error) {
      this.setState({ error })
      this.setState({ selectedNetwork: null })
    }

    this.setState({ selectedNetwork })
  }

  render() {
    const { bytesNetworks, selectedNetwork, error } = this.state

    return (
      <div>
        <Spinner />
        <Sidebar />
        <div className="page-container">
          <Header bytesNetworks={bytesNetworks} onSelect={this.onNetworkSelect} />
          <MainContainer selectedNetwork={selectedNetwork} />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
