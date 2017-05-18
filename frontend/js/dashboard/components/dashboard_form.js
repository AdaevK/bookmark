import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import { createFolder } from '../actions/folders'

import FormGroupWithError from './form_group_with_error'

class DashboardForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()

    const folder = {
      name: this.refs.name.value
    }

    this.props.createFolder(folder)
  }

  onChangeType(e) {
    console.log(e.target.value)
  }

  render() {
    const { errors, submitting } = this.props

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
        {/*<div className="form-group">
          <select className="form-control" onChange={this.onChangeType}>
            <option value="folder">Папка</option>
            <option value="link">Ссылка</option>
          </select>
        </div> */}
        <FormGroupWithError errors={ errors } field="name" wrapClass="col-xs-12">
          <div className="col-sm-2 control-label">{ I18n.t("folder_form.fields.name") }</div>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder={ I18n.t("folder_form.fields.name") }
              ref="name"
              disabled={ submitting }
            />
          </div>
        </FormGroupWithError>
        <div className="form-group">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-success">
              { I18n.t('folder_form.page.submit') }
            </button>
          </div>
        </div>
      </form>
    )
  }
}

DashboardForm.propTypes = {
  errors:       PropTypes.object,
  submitting:   PropTypes.bool.isRequired,
  createFolder:    PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { newFolder } = state
  const { errors, submitting } = newFolder
  return {
    errors,
    submitting
  }
}

export default connect(mapStateToProps, { createFolder })(DashboardForm)