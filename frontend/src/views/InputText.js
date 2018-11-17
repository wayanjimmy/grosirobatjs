import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class InputText extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.any,
    autoFocus: PropTypes.bool.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    type: 'text',
    placeholder: '',
    autoFocus: false
  }

  render() {
    const {
      name,
      type,
      placeholder,
      value,
      className,
      onChange,
      autoFocus,
      ...restProps
    } = this.props

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
        {...restProps}
      />
    )
  }
}

export default InputText
