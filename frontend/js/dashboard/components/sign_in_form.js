import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SignInForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    const history  = this.props.history

    const email    = this.refs.login.value
    const password = this.refs.password.value

    this.props.signIn(email, password)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal form-sign-in">
        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" className="form-control" placeholder="Логин" ref="login" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-key"></i></span>
              <input type="password" className="form-control" placeholder="Пароль" ref="password" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-lg btn-primary btn-block">Войти</button>
          </div>
        </div>
      </form>
    )
  }
}

export default SignInForm
