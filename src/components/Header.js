import React, { Component } from 'react'

class Header extends React.Component {
  render() {
    return (
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
                <div className="invalid-feedback">Please select a device</div>
              </form>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="notifications dropdown">
              {/* <span className="counter bgc-red">3</span> */}
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
    )
  }
}

export default Header
