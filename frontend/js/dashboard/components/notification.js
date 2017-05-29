import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

class Notification extends React.Component {
  constructor(props) {
    super(props)

    if(props.timeOut) {
      this.dismissTimeout = setTimeout(
        props.onClose,
        props.timeOut
      )
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout)
  }

  renderTitle() {
    let { type, title } = this.props
    if (!title.length) title = I18n.t(`notifications.title.${type}`)

    return (title && title.length) ?
      (<div className="title">{ title }</div>) : null
  }

  render() {
    const { type, onClose, i18n } = this.props

    let content = this.props.content
    if(i18n) content = I18n.t(`notifications.${content}`)

    return (
      <div className={ `notification notif-${type}` } onClick={ onClose }>
        <button type="button" className="close-button">×</button>
        { this.renderTitle() }
        <div className="content">{ content }</div>
      </div>
    )
  }
}
Notification.defaultProps = {
  title: '',
  i18n: false,
}

Notification.propTypes = {
  type:    PropTypes.string.isRequired,
  title:   PropTypes.string,
  content: PropTypes.string.isRequired,
  i18n:    PropTypes.bool,
  timeOut: PropTypes.number,
  onClose: PropTypes.func.isRequired,
}

export default Notification