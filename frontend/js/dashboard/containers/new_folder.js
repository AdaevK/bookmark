import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import { createFolder } from '../actions/folders'

import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/modal'
import FormGroupWithError from '../components/form_group_with_error'

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

  handleClose(e) {
    e.preventDefault()
    const { router } = this.context

    router.history.goBack()
  }

  handleSubmit(e) {
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
    const { errors, isSubmit } = this.state
    return (
      <Modal>
        <form onSubmit={ this.handleSubmit.bind(this) } className="form-horizontal form-modal">
          <ModalHeader handleClose={ this.handleClose.bind(this) }>
            { I18n.t('modals.add_folder.header') }
          </ModalHeader>
          <ModalBody>
            <FormGroupWithError errors={ errors } field="name" wrapClass="col-xs-12">
              <label htmlFor="name">{ I18n.t("folder_form.fields.name") }</label>
              <input
                type="text"
                className="form-control"
                placeholder={ I18n.t("folder_form.fields.name") }
                value={ this.state.folder.name }
                onChange={ this.onChange.bind(this) }
                name="name"
                disabled={ isSubmit }
              />
            </FormGroupWithError>
          </ModalBody>
          <ModalFooter
            textSubmit={ I18n.t("folder_form.page.submit") }
            textCancel={ I18n.t("folder_form.page.cancel") }
            onCancel={ this.handleClose.bind(this) }
          />
        </form>
      </Modal>
    )
  }
}

NewFolder.contextTypes = {
  router:     PropTypes.object.isRequired,
}

NewFolder.propTypes = {
  createFolder: PropTypes.func.isRequired,
}

export default connect(null, { createFolder })(NewFolder)
