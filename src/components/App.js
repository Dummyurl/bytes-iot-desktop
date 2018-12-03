import '../assets/css/App.scss'
import React, { Component } from 'react'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-logo">
              <div className="peers ai-c fxw-nw">
                <div className="peer peer-greed">
                  <a className="sidebar-link td-n" href="index.html">
                    <div className="peers ai-c fxw-nw">
                      <div className="peer">
                        <div className="logo">
                          <img src="src/assets/images/logo.png" alt="" />
                        </div>
                      </div>
                      <div className="peer peer-greed">
                        <h5 className="lh-1 mB-0 logo-text">Adminator</h5>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="peer">
                  <div className="mobile-toggle sidebar-toggle">
                    <a href="" className="td-n">
                    <i className="ti-arrow-circle-left"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <ul className="sidebar-menu scrollable pos-r">
              <li className="nav-item mT-30 active">
                <a className="sidebar-link" href="index.html">
                <span className="icon-holder">
                <i className="c-blue-500 ti-home"></i>
                </span>
                <span className="title">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a className='sidebar-link' href="forms.html">
                <span className="icon-holder">
                <i className="c-light-blue-500 ti-pencil"></i>
                </span>
                <span className="title">Forms</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="sidebar-link" href="ui.html">
                <span className="icon-holder">
                <i className="c-pink-500 ti-palette"></i>
                </span>
                <span className="title">UI Elements</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="dropdown-toggle" href="javascript:void(0);">
                <span className="icon-holder">
                <i className="c-orange-500 ti-layout-list-thumb"></i>
                </span>
                <span className="title">Tables</span>
                <span className="arrow">
                <i className="ti-angle-right"></i>
                </span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className='sidebar-link' href="basic-table.html">Basic Table</a>
                  </li>
                  <li>
                    <a className='sidebar-link' href="datatable.html">Data Table</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-container">
          <div className="header navbar">
            <div className="header-container">
              <ul className="nav-left">
                <li>
                  <a id='sidebar-toggle' className="sidebar-toggle" href="javascript:void(0);">
                  <i className="ti-menu"></i>
                  </a>
                </li>
                <li>
                  <form className="was-validated">
                    <select className="custom-select" required>
                      <option value="">Device</option>
                      <option value="1">Raspbery Pie - 00:80:41:ae:fd:7e</option>
                      <option value="2">Lenovo T400s - 00:80:41:ae:fd:7e</option>
                      <option value="3">Three</option>
                    </select>
                    <div className="invalid-feedback">Example invalid custom select feedback</div>
                  </form>
                </li>
              </ul>
              <ul className="nav-right">
                <li className="notifications dropdown">
                  <span className="counter bgc-red">3</span>
                  <a href="" className="dropdown-toggle no-after" data-toggle="dropdown">
                  <i className="ti-bell"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="pX-20 pY-15 bdB">
                      <i className="ti-bell pR-10"></i>
                      <span className="fsz-sm fw-600 c-grey-900">Notifications</span>
                    </li>
                    <li className="pX-20 pY-15 ta-c bdT">
                      <span>
                      <a href="" className="c-grey-600 cH-blue fsz-sm td-n">View All Notifications <i className="ti-angle-right fsz-xs mL-10"></i></a>
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
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
                        A great raspberry pie.
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
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                Share connectivity
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                Buy connectivity
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                Idle
                                </label>
                              </div>
                              <div className="alert alert-success collapse" role="alert">
                                Device is currently connected to a buyer/seller. 
                              </div>
                              <div className="alert alert-info" role="alert">
                                Device is looking for a buyer/seller.
                              </div>
                              <hr></hr>
                              <div className="layer w-100 mB-10">
                                <h6 className="lh-1"> Price </h6>
                              </div>
                              <form>
                                <div className="form-group">
                                  <label for="customRange3">Ask price:</label>
                                  <input type="range" className="custom-range" min="0" max="5" step="0.5" id="customRange3" />
                                </div>
                              </form>
                              <form>
                                <div className="form-group">
                                  <label for="formControlRange">Bid price:</label>
                                  <input type="range" className="form-control-range" id="formControlRange" />
                                </div>
                              </form>
                              <hr></hr>
                              <div className="layer w-100 mB-10">
                                <h6 className="lh-1"> Bandwidth Usage </h6>
                              </div>
                              <form>
                                <div className="form-group">
                                  <label for="formControlRange">Throttle:</label>
                                  <input type="range" className="form-control-range" id="formControlRange" />
                                </div>
                              </form>
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
                              Balance: 10 dollars.
                            </div>
                            <div className="peer">
                              <span className="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">+10%</span>
                            </div>
                          </div>
                        </div>
                        
                        <hr></hr>
                        <div className="layer w-100 mB-10">
                          <h6 className="lh-1"> Deposit </h6>
                          <div className="form-group">
                            Device Adress: XYZ <br />
                            <button onclick="myFunction()">Copy </button>
                          </div>
                          <h6 className="lh-1"> Withdraw </h6>
                          <div className="form-group">
                            Beneficiary: <input type="text" value="" id="myInput" />  <br />
                            Amount: <input type="text" value="" id="myInput" /> <br />
                            <button onclick="myFunction()">Send </button>
                          </div>
                          <a href="#">Visualise past activity.</a>
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
                                    <td className="fw-600">Rasp Pie</td>
                                    <td><span className="badge bgc-red-50 c-red-700 p-10 lh-0 tt-c badge-pill">Defect</span> </td>
                                    <td> Nov 18</td>
                                    <td><span className="text-success">Medium</span></td>
                                  </tr>
                                  <tr>
                                    <td className="fw-600">Rasp Pie 3</td>
                                    <td><span className="badge bgc-deep-purple-50 c-deep-purple-700 p-10 lh-0 tt-c badge-pill">New</span></td>
                                    <td>Nov 19</td>
                                    <td><span className="text-info">Bad</span></td>
                                  </tr>
                                  <tr>
                                    <td className="fw-600">Rasp Pie 3</td>
                                    <td><span className="badge bgc-green-50 c-green-700 p-10 lh-0 tt-c badge-pill">Connectd</span></td>
                                    <td>Nov 21</td>
                                    <td><span className="text-success">Good</span></td>
                                  </tr>
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
                            <tr>
                              <td>x0323</td>
                              <td>.032$</td>
                              <td>Confirmed</td>
                              <td>612dsqdqd232</td>
                            </tr>
                            <tr>
                              <td>x0323</td>
                              <td>.032$</td>
                              <td>Confirmed</td>
                              <td>612dsqdqd232</td>
                            </tr>
                            <tr>
                              <td>x0323</td>
                              <td>.032$</td>
                              <td>Confirmed</td>
                              <td>612dsqdqd232</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
            <span>Copyright © 2017 Designed by <a href="https://colorlib.com" target='_blank' title="Colorlib">Colorlib</a>. All rights reserved.</span>
          </footer>
        </div>
      </div>
    )
  }
}

export default App
