import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import axios from 'axios'
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNetwork: null,
      deviceInfo: null,
      deviceState: null,
      gatewayIp: null,
      walletData: null,
      askPrice: 3,
      bidPrice: 3,
      loading: false,
      error: null
    }

    this.onDeviceStateChange = this.onDeviceStateChange.bind(this)
    this.onAskPriceChange = this.onAskPriceChange.bind(this)
    this.onBidPriceChange = this.onBidPriceChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const selectedNetwork = nextProps.selectedNetwork

    if (selectedNetwork && selectedNetwork !== '') {
      this.setState({ gatewayIp: null })
      this.setState({ deviceInfo: null })
      this.setState({ deviceState: null })
      this.setState({ walletData: null })
      this.setState({ loading: true })

      ipcRenderer.on('connect-network-resp', async (event, error, gatewayIp) => {
        if(error) {
          console.log("Error connecting to",selectedNetwork, error)
          this.setState({ selectedNetwork: null, loading: false, error})
          return
        }

        const deviceInfo = await this.getDeviceInfo(gatewayIp)
        const deviceState = await this.getDeviceState(gatewayIp)
        const walletData = await this.getWalletData(gatewayIp)

        this.setState({ gatewayIp })
        this.setState({ deviceInfo })
        this.setState({ deviceState })
        this.setState({ walletData })
        this.setState({ loading: false })
      })
      ipcRenderer.send('connect-network', {ssid: selectedNetwork});
    }
  }

  async getDeviceInfo(gatewayIp) {
    const response = await axios.get(`http://${gatewayIp}:3000/device-info`)
    return response.data
  }

  async getDeviceState(gatewayIp) {
    const response = await axios.get(`http://${gatewayIp}:3000/device-state`)
    return response.data.state
  }

  async getWalletData(gatewayIp) {
    const response = await axios.get(`http://${gatewayIp}:3000/wallet/data`)
    return response.data.accountData
  }

  renderDeviceInfo(deviceInfo) {
    return (
      <div>
        <div>Gateway IP: {deviceInfo.gateway_ip}</div>
        <div>Interface: {deviceInfo.name}</div>
        <div>Mac Address: {deviceInfo.mac_address}</div>
        <div>Netmask: {deviceInfo.netmask}</div>
        <div>Connection Type: {deviceInfo.type}</div>
      </div>
    )
  }

  getTxLink(hash) {
    return `https://thetangle.org/transaction/${hash}`
  }

  renderTxTable(walletData) {
    let transfers = walletData && walletData.transfers
    transfers = transfers || []

    return (
      <table id="dataTable" className="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>From/To</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        {transfers.map(tx => {
          return (
            <tr>
              <td>{tx[0].address.substring(0, 8)}...</td>
              <td>${tx[0].value}</td>
              <td>Pending</td>
              <td><a target="_blank" href={this.getTxLink(tx[0].hash)}>{tx[0].hash.substring(0, 8)}...</a></td>
            </tr>
          )
        })}
      </tbody>
    </table>
    )
  }

  async onDeviceStateChange(event) {
    const deviceState = event.target.value

    let response
    if(deviceState === 'sell') {
      response = await axios.get(`http://${this.state.gatewayIp}:3000/start-selling`)
    } else if(deviceState === 'buy') {
      await axios.get(`http://${this.state.gatewayIp}:3000/stop-selling`)
      response = await axios.get(`http://${this.state.gatewayIp}:3000/buy`)
    } else {
      response = await axios.get(`http://${this.state.gatewayIp}:3000/stop-selling`)
    }
    this.setState({deviceState: response.data.state});
  }

  onAskPriceChange(value) {
    this.setState({
      askPrice: value
    });
  }

  onBidPriceChange(value) {
    this.setState({
      bidPrice: value
    });
  }

  render() {
    const {
      selectedNetwork,
      deviceInfo,
      gatewayIp,
      walletData,
      askPrice,
      bidPrice,
      loading,
      error
    } = this.state

    return (
      <main className='main-content bgc-grey-100'>
        <div id='mainContent'>
          <div className="row gap-20 masonry pos-r">
            <div className="masonry-sizer col-md-6"></div>
            <div className="masonry-item  w-100">
              <div className="row gap-20">
                <div className='col-md-5'>
                  <div className="layers bd bgc-grey-200 p-20">
                    <div className="layer w-100 mB-10">
                      <h6 className="lh-1">Device description</h6>
                    </div>
                    {deviceInfo && this.renderDeviceInfo(deviceInfo)}
                  </div>
                </div>
              </div>
              <div className="row gap-20">
                <div className='col-md-6'>
                  <div className="layers bd bgc-white p-20">
                    <div className="layer w-100 mB-10">
                      <h4 className="lh-1"> Network Control </h4>
                    </div>
                    <div className="layer w-100 mB-10">
                      <h6 className="lh-1"> Mode </h6>
                    </div>
                    <div className="layer w-100">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-check">
                            <label className="form-check-label">
                            <input className="form-check-input" type="radio"
                              name="deviceMode"
                              id="deviceModeSell"
                              value="sell"
                              checked={this.state.deviceState === 'sell'}
                              onChange={this.onDeviceStateChange} />
                            Share connectivity
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                            <input className="form-check-input" type="radio"
                              name="deviceMode"
                              id="deviceModeBuy"
                              value="buy"
                              checked={this.state.deviceState === 'buy'}
                              onChange={this.onDeviceStateChange} />
                            Buy connectivity
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                            <input className="form-check-input" type="radio"
                              name="deviceMode"
                              id="deviceModeIdle"
                              value="idle"
                              checked={this.state.deviceState === 'idle'}
                              onChange={this.onDeviceStateChange} />
                            Idle
                            </label>
                          </div>
                          {/* <div className="alert alert-success collapse" role="alert">
                            Device is currently connected to a buyer/seller. 
                          </div>
                          <div className="alert alert-info" role="alert">
                            Device is looking for a buyer/seller.
                          </div> */}
                          <hr></hr>
                          <div className="layer w-100 mB-10">
                            <h6 className="lh-1"> Price </h6>
                          </div>
                          <form>
                            <div className="form-group">
                              <label for="customRange3">Ask price: ${askPrice}</label>
                              <Slider min={0} max={5} defaultValue={askPrice} onChange={this.onAskPriceChange} />
                            </div>
                          </form>
                          <form>
                            <div className="form-group">
                              <label for="formControlRange">Bid price: ${bidPrice}</label>
                              <Slider min={0} max={5} defaultValue={bidPrice} onChange={this.onBidPriceChange} />
                            </div>
                          </form>
                          {/* <hr></hr>
                          <div className="layer w-100 mB-10">
                            <h6 className="lh-1"> Bandwidth Usage </h6>
                          </div>
                          <form>
                            <div className="form-group">
                              <label for="formControlRange">Throttle:</label>
                              <input type="range" className="custom-range" min="0" max="5" value="4" step="0.5" id="throttleRange" disabled/>
                            </div>
                          </form> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="layers bd bgc-white p-20">
                    <div className="layer w-100 mB-10">
                      <h4 className="lh-1">Wallet</h4>
                    </div>
                    <div className="layer w-100">
                      <div className="peers ai-sb fxw-nw">
                        <div className="peer peer-greed">
                          Balance: {walletData && walletData.balance}i
                        </div> 
                        <div className="peer">
                          {/* <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">+10%</span> */}
                        </div>
                      </div>
                    </div>
                    
                    <hr/>

                    <div className="layer w-100 mB-10">
                      <h6 className="lh-1"> Device Address </h6>
                      <div className="form-group">
                        {walletData && (walletData.latestAddress).substring(0, 26)}... 
                        <button style={{float: "right"}} onclick="myFunction()" type="button" class="btn btn-light">Copy</button>
                      </div>
                      <hr/>

                      <h6 className="lh-1"> Withdraw </h6>
                      <div className="form-group">
                        Beneficiary: <input type="text" value="" id="myInput" />  <br />
                        Amount:     <input type="text" style={{marginLeft: "23px"}} value="" id="myInput" /> 
                        <button style={{float: "right"}} onclick="myFunction()" type="button" class="btn btn-light">Send</button>
                      </div>
                      <a target="_blank" href="https://thetangle.org/address/">Visualise past activity.</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gap-20">
                <div className="col-md-6">
                  <div className="bd bgc-white">
                    <div className="layers">
                      <div className="layer w-100 p-20">
                        <h4 className="lh-1">Connections</h4>
                      </div>
                      <div className="layer w-100">
                        <div className="table-responsive p-20">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className=" bdwT-0">Device</th>
                                <th className=" bdwT-0">Status</th>
                                <th className=" bdwT-0">Time</th>
                                <th className=" bdwT-0">Reliability</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="fw-600">Rasp Pie 1</td>
                                <td><span className="badge bgc-green-50 c-green-700 p-10 lh-0 tt-c badge-pill">Connected</span></td>
                                <td> Dec 15</td>
                                <td><span className="text-success">Medium</span></td>
                              </tr>
                              <tr>
                                <td className="fw-600">Rasp Pie 2</td>
                                <td><span className="badge bgc-deep-purple-50 c-deep-purple-700 p-10 lh-0 tt-c badge-pill">New</span></td>
                                <td>Dec 15</td>
                                <td><span className="text-success">Good</span></td>

                              </tr>
                              {/* <tr>
                                <td className="fw-600">Rasp Pie 3</td>
                                <td><span className="badge bgc-red-50 c-red-700 p-10 lh-0 tt-c badge-pill">Defect</span> </td>
                                <td><span className="badge bgc-red-50 c-red-700 p-10 lh-0 tt-c badge-pill">Defect</span> </td>
                                <td>Nov 21</td>
                                <td><span className="text-success">Good</span></td>
                                <td><span className="text-info">Bad</span></td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="ta-c bdT w-100 p-20">
                      <a href="#">Check connection report</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bgc-white bd bdrs-3 p-20 mB-20">
                    <h4 className="c-grey-900 mB-20">Transactions Table</h4>
                    {this.renderTxTable(walletData)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main> 
    )
  }
}

export default MainContainer
