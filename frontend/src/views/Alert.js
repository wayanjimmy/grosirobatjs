import React from 'react'
import cn from 'classnames'

export default function Alert(props) {
  return (
    <div className={cn(props.danger && 'uk-alert-danger')} data-uk-alert>
      {' '}
      <p>{props.children}</p>{' '}
    </div>
  )
}
