import React from 'react'
import PropTypes from 'prop-types'

const LinkItem = ({link}) => (
  <li className="link">
    <i className="dot"/>
    <div>
      <a href={ link.url } target="_blank">{ link.name.length ? link.name : link.url }</a>
    </div>
  </li>
)

LinkItem.propsTypes = {
  link: PropTypes.object.isRequired
}

export default LinkItem
