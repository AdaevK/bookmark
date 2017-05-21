import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editFolder, updateFolder } from '../actions/folders'

import FolderForm from '../components/folder_form'

class EditFolder extends React.Component {
  constructor(props) {
    super(props)
    const { id } = props.match.params

    this.state = {
      id: id,
      folder: {},
      errors: {},
      isSubmit: false,
      isLoaded: true
    }
  }

  componentDidMount() {
    const { history } = this.props
    this.props.editFolder(this.state.id).then(
      (res) => { this.loadFolder(res.data.folder) },
      (err) => { history.goBack() }
    )
  }

  loadFolder(folder) {
    this.setState({ folder: folder, isLoaded: false })
  }

  onChange(e) {
    this.setState({ folder: { [e.target.name ]: e.target.value } })
  }

  onClose(e) {
    e.preventDefault()
    const { router } = this.context

    router.history.goBack()
  }

  onSubmit(e) {
    e.preventDefault()
    const { router } = this.context
    const { id, folder } = this.state

    this.setState({ isSubmit: true })
    this.props.updateFolder(id, folder).then(
      (res) => { router.history.goBack() },
      (err) => {
        const { data } = err.response
        this.setState({ errors: data.errors, isSubmit: false })
      }
    )
  }

  render() {
    const { folder, errors, isSubmit, isLoaded } = this.state
    return (<FolderForm
      type="edit"
      isLoaded={ isLoaded }
      isSubmit={ isSubmit }
      errors={ errors }
      folder={ folder }
      onSubmit={ this.onSubmit.bind(this) }
      onCancel={ this.onClose.bind(this) }
      onChange={ this.onChange.bind(this) }
    />)
  }
}

EditFolder.contextTypes = {
  router: PropTypes.object.isRequired
}

EditFolder.propTypes = {
  folders:      PropTypes.array.isRequired,
  updateFolder: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { folders } = state
  return {
    folders: folders.items
  }
}

export default connect(mapStateToProps, { editFolder, updateFolder })(EditFolder)