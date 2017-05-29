import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { removeNotification, clearAllNotification } from '../actions/notifications'

import Notification from '../components/notification'

class NotificationManager extends React.Component {
  render() {
    const { notifications, removeNotification } = this.props
    return (
      <ReactCSSTransitionGroup
        transitionName="animation"
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        className="notifications top-right"
        component="div"
      >
        { notifications.map(item => (
          <Notification
            key={ item.id }
            type={ item.type }
            title={ item.title }
            content={ item.content }
            timeOut={ item.timeOut }
            i18n={ item.i18n }
            onClose={ removeNotification.bind(this, item.id) }
          />
        ))}
      </ReactCSSTransitionGroup>
    )
  }
}

NotificationManager.propTypes = {
  notifications:        PropTypes.array.isRequired,
  removeNotification:   PropTypes.func.isRequired,
  clearAllNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { notifications } = state
  return {
    notifications
  }
}

export default connect(mapStateToProps, {
  removeNotification,
  clearAllNotification
})(NotificationManager)
