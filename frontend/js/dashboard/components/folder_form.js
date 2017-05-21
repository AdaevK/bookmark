import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

import { Modal, ModalHeader, ModalBody, ModalFooter } from './modal'
import FormGroupWithError from './form_group_with_error'

const FolderForm = (props) => {
  const {
    type,
    errors,
    folder,
    isLoaded,
    isSubmit,
    onSubmit,
    onCancel,
    onChange
  } = props
  return (
    <Modal>
      <form onSubmit={ onSubmit.bind(this) } className="form-horizontal form-modal">
        <ModalHeader handleClose={ onCancel.bind(this) }>
          { I18n.t(`folder_form.page.${type}.header`) }
        </ModalHeader>
        <ModalBody isLoaded={ isLoaded }>
          <FormGroupWithError errors={ errors } field="name" wrapClass="col-xs-12">
            <label className="control-label" htmlFor="name">
              { I18n.t("folder_form.fields.name") }
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={ I18n.t("folder_form.fields.name") }
              value={ folder.name }
              onChange={ onChange }
              name="name"
              disabled={ isSubmit }
            />
          </FormGroupWithError>
        </ModalBody>
        <ModalFooter
          isSubmit={ isSubmit || isLoaded }
          textSubmit={ I18n.t(`folder_form.page.${type}.submit`) }
          textCancel={ I18n.t("folder_form.page.cancel") }
          onCancel={ onCancel.bind(this) }
        />
      </form>
    </Modal>
  )
}

FolderForm.defaultProps = {
  isLoaded: false
}

FolderForm.propTypes = {
  type:     PropTypes.oneOf(['new', 'edit']).isRequired,
  errors:   PropTypes.object,
  folder:   PropTypes.shape({
    name: PropTypes.string,
  }),
  isLoaded: PropTypes.bool.isRequired,
  isSubmit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default FolderForm