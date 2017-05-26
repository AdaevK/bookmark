import React from 'react'
import PropTypes from 'prop-types'

import LinkItem from './link_item'

const ListLinks = ({ links, deleteItem }) => (
  <ul className="list-links">
    { links.map(link => (<LinkItem key={ link.id } link={ link } deleteItem={ deleteItem }/>)) }
  </ul>
)

ListLinks.propTypes = {
  links:      PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default ListLinks
