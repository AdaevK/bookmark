import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createFolder } from '../actions/folders'

import FolderForm from '../components/folder_form'

class NewFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folder: {
        name: ''
      },
      errors: {},
      isSubmit: false
    }
  }

  onChange(e) {
    this.setState({ folder: { [e.target.name]: e.target.value } })
  }

  onClose(e) {
    e.preventDefault()
    const { router } = this.context

    router.history.goBack()
  }

  onSubmit(e) {
    e.preventDefault()
    const { router } = this.context
    const { folder } = this.state

    this.setState({ isSubmit: true })
    this.props.createFolder(folder).then(
      (res) => { router.history.goBack() },
      (err) => {
        const { data } = err.response
        this.setState({ errors: data.errors, isSubmit: false })
      }
    )
  }

  render() {
    const { folder, errors, isSubmit } = this.state
    return (<FolderForm
        type="new"
        isSubmit={ isSubmit }
        errors={ errors }
        folder={ folder }
        onSubmit={ this.onSubmit.bind(this) }
        onCancel={ this.onClose.bind(this) }
        onChange={ this.onChange.bind(this) }
      />)
  }
}

NewFolder.contextTypes = {
  router: PropTypes.object.isRequired
}

NewFolder.propTypes = {
  createFolder: PropTypes.func.isRequired,
}

export default connect(null, { createFolder })(NewFolder)
