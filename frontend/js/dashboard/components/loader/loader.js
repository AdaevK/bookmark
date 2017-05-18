import React from 'react'

import './loader.css'

const Loader = (props) => (WrappedComponent) => {
  return class Loader extends React.Component {
    render() {
      const { isLoaded, error } = this.props
      if (isLoaded) {
        return (
          <div className="height-cssloader">
            <div className="cssloader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )
      } else if (error !== undefined && error !== null) {
        return (
          <div className="text-center">
            <div className="error-badge">
              <i className="fa fa-3x fa-exclamation" />
            </div>
            <h4>Error...</h4>
          </div>
        )
      } else {
        return  <WrappedComponent { ...this.props }/>
      }
    }
  }
}

export default Loader