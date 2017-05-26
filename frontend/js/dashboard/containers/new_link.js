import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createLink } from '../actions/links'

import LinkForm from '../components/link_form'

class NewLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      link: {
        url: ''
      },
      errors: {},
      isSubmit: false
    }
  }

  onChange(e) {
    this.setState({ link: { [e.target.name]: e.target.value } })
  }

  onClose(e) {
    e.preventDefault()
    const { router } = this.context

    router.history.goBack()
  }

  onSubmit(e) {
    e.preventDefault()

    const folderId = this.props.match.params['folder_id']
    const { router } = this.context
    const { link } = this.state

    this.setState({ isSubmit: true })
    this.props.createLink(folderId, link).then(
      (res) => { router.history.goBack() },
      (err) => {
        const { data } = err.response
        this.setState({ errors: data.errors, isSubmit: false })
      }
    )
  }

  render() {
    const { link, errors, isSubmit } = this.state
    return (
      <LinkForm
        isSubmit={ isSubmit }
        errors={ errors }
        link={ link }
        onSubmit={ this.onSubmit.bind(this) }
        onCancel={ this.onClose.bind(this) }
        onChange={ this.onChange.bind(this) }
      />
    )
  }
}

NewLink.contextTypes = {
  router: PropTypes.object.isRequired
}

NewLink.propTypes = {
  createLink: PropTypes.func.isRequired
}

export default connect(null, { createLink })(NewLink)