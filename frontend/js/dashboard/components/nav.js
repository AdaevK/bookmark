import React from 'react'
import { Link } from 'react-router-dom'
import links from '../constants/links'

const Nav = (props) => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        {/*
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        */}
        { props.isBrandLink ? (
              <Link to={ links.dashboardPath } className="navbar-brand">Bookmarks</Link>
            ) : (
              <a href="/" className="navbar-brand">Bookmarks</a>
            )
        }
      </div>
      {props.children}
    </div>
  </nav>
)

export default Nav
