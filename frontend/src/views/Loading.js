import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

function Loading({ isLoading, fullWidth, minHeight, children }) {
  return (
    <div
      className={cn('uk-inline', fullWidth && 'uk-width-1-1')}
      style={{ height: `${minHeight || window.innerHeight}px` }}
    >
      {!isLoading && children}
      {isLoading && (
        <Fragment>
          <div className="uk-overlay-default uk-position-cover" />
          <div className="uk-overlay uk-position-center">
            <span data-uk-spinner={'ratio: 2'} />
          </div>
        </Fragment>
      )}
    </div>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  minHeight: PropTypes.number,
  children: PropTypes.node
}

Loading.defaultProps = {
  isLoading: true,
  fullWidth: false
}

export default Loading
