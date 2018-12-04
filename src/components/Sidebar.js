import React, { Component } from 'react'

import '../assets/css/App.scss'
import logoPng from '../assets/images/logo.png'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <div className="peers ai-c fxw-nw">
              <div className="peer peer-greed">
                <a className="sidebar-link td-n" href="index.html">
                  <div className="peers ai-c fxw-nw">
                    <div className="peer">
                      <div className="logo">
                        <img src={logoPng} alt="" />
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
    )
  }
}

export default Sidebar
