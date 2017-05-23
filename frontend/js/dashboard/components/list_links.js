import React from 'react'
import PropTypes from 'prop-types'

import LinkItem from './link_item'

const ListLinks = ({links}) => (
  <ul className="list-links">
    { links.map(link => (<LinkItem key={ link.id } link={ link }/>)) }
  </ul>
)

ListLinks.propTypes = {
  links: PropTypes.array.isRequired
}

export default ListLinks
