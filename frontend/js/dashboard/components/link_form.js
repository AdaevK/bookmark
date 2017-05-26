import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

import { Modal, ModalHeader, ModalBody, ModalFooter } from './modal'
import FormGroupWithError from './form_group_with_error'

const LinkForm = (props) => {
  const {
    errors,
    link,
    isSubmit,
    onSubmit,
    onCancel,
    onChange
  } = props
  return (
    <Modal>
      <form onSubmit={ onSubmit } className="form-horizontal form-modal">
        <ModalHeader handleClose={ onCancel }>
          { I18n.t("link_form.page.header")}
        </ModalHeader>
        <ModalBody>
          <FormGroupWithError errors={ errors } field="url" wrapClass="col-xs-12">
            <label className="control-label" htmlFor="url">
              { I18n.t("link_form.fields.url") }
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={ I18n.t("link_form.fields.url") }
              value={ link.url }
              onChange={ onChange }
              name="url"
              disabled={ isSubmit }
            />
          </FormGroupWithError>
        </ModalBody>
        <ModalFooter
          isSubmit={ isSubmit }
          textSubmit={ I18n.t("link_form.page.submit") }
          textCancel={ I18n.t("link_form.page.cancel") }
          onCancel={ onCancel }
        />
      </form>
    </Modal>
  )
}

LinkForm.defaultProps = {
  isLoaded: false
}

LinkForm.propTypes = {
  errors:   PropTypes.object,
  link:     PropTypes.shape({
    url: PropTypes.string
  }),
  isSubmit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default LinkForm