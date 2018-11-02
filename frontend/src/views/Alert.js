import React from 'react'
import cn from 'classnames'

function Alert(props) {
  return (
    <div className={cn(props.danger && 'uk-alert-danger')} data-uk-alert>
      <p>{props.children}</p>
    </div>
  )
}

export default Alert
