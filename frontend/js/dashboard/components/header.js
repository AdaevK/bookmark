import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/sessions'

import Nav from './nav'
import NavLink from './nav_link'
import SignOutLink from './sign_out_link'

const Header = (props) => (
  <Nav isBrandLink={ props.session.authenticated }>
    {props.session.authenticated ? (
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <NavLink to="/dashboard">Главная</NavLink>
          </ul>
          <ul className="nav navbar-nav pull-right">
            <SignOutLink signOut={ props.logout } />
          </ul>
        </div>
      ) : null
    }
  </Nav>
)

const mapStateToProps = (state) => {
  const { session } = state
  return {
    session: session
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Header))
