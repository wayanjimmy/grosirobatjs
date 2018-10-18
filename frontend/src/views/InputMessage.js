import React from 'react'

const InputMessage = ({ error }) =>
  error ? <small className="uk-text-danger">{error[0]}</small> : null

export default InputMessage
