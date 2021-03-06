import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { matchPath } from 'react-router'
import { Link } from 'react-router-dom'

class NavLink extends Component {
  render() {
    let isActive = false
    const { to, children, ...props } = this.props

    const { router } = this.context

    if (to && router) {
      const { location } = router.route
      isActive = matchPath(location.pathname, to) != null
    }

    return (
      <li className={isActive ? 'active' : ''}>
        <Link to={to} {...props}>{children}</Link>
      </li>
    )
  }
}

NavLink.propTypes = {
  router: PropTypes.object
}

export default NavLink