import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/sessions'
import links from '../constants/links'

import Nav from '../components/nav'
import NavLink from '../components/nav_link'
import SignOutLink from '../components/sign_out_link'

const Header = (props) => (
  <Nav isBrandLink={ props.authenticated }>
    {props.authenticated ? (
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <NavLink to={ links.dashboardPath }>Главная</NavLink>
          </ul>
          <ul className="nav navbar-nav pull-right">
            <li><a>{ `${props.currentUser.first_name} ${props.currentUser.last_name}` }</a></li>
            <SignOutLink signOut={ props.logout } />
          </ul>
        </div>
      ) : null
    }
  </Nav>
)

Header.propTypes = {
  currentUser:   PropTypes.object,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { session } = state
  const { authenticated, currentUser } = session
  return {
    currentUser:   currentUser,
    authenticated: authenticated
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Header))
