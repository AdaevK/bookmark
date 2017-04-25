import React from 'react'

const SignOutLink = (props) => {
  const logoutHandler = (e) => {
    e.preventDefault()
    props.signOut()
  }

  return (
      <li><a href="#" onClick={logoutHandler.bind(this)}>Выйти</a></li>
  )
}

export default SignOutLink
