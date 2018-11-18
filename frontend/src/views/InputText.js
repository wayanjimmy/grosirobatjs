import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

function InputText({
  name,
  type,
  placeholder,
  value,
  className,
  onChange,
  autoFocus,
  ...props
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      className={cn('uk-input', className)}
      autoComplete="off"
      onChange={onChange}
      {...props}
    />
  )
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any,
  autoFocus: PropTypes.bool.isRequired,
  onChange: PropTypes.func
}

InputText.defaultProps = {
  type: 'text',
  placeholder: '',
  autoFocus: false
}

export default InputText
