/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEqual from 'lodash/isEqual'

import ky from '../utils/api'

function buildQueryString(url, params, page, pageSize) {
  const q = new URLSearchParams()
  q.append('page', page)
  q.append('pageSize', pageSize)
  Object.keys(params).forEach(key => {
    q.append(key, params[key])
  })
  return url + '?' + q.toString()
}

function Pagination({ page, lastPage, handlePageChange }) {
  return (
    <ul className="uk-pagination" data-uk-margin>
      <li className={cn(page === 1 && 'uk-disabled')}>
        <a onClick={() => handlePageChange(page - 1)}>
          <span data-uk-pagination-previous={''} />
        </a>
      </li>
      <li className={cn(lastPage === page && 'uk-disabled')}>
        <a onClick={() => handlePageChange(page + 1)}>
          <span data-uk-pagination-next={''} />
        </a>
      </li>
    </ul>
  )
}

export default class Paginator extends React.Component {
  static Pagination = Pagination
  state = {
    items: [],
    page: 1,
    pageSize: 10,
    lastPage: 1
  }

  fetch = async () => {
    const { url, params } = this.props
    try {
      const res = await ky
        .get(
          buildQueryString(url, params, this.state.page, this.state.pageSize)
        )
        .json()
      const { page, pageSize, pageTotal: lastPage } = res.meta
      this.setState({ items: res.data, page, pageSize, lastPage })
    } catch (error) {}
  }

  handlePageChange = page => {
    this.setState({ page }, this.fetch)
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.params, prevProps.params)) {
      this.fetch()
    }
  }

  render() {
    const { items, page, lastPage } = this.state
    const { render } = this.props
    return (
      <Fragment>
        {render({
          items,
          fetch: this.fetch,
          page,
          getPaginationProps: (props = {}) => ({
            ...props,
            page,
            lastPage,
            handlePageChange: this.handlePageChange
          })
        })}
      </Fragment>
    )
  }
}

Paginator.propTypes = {
  url: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
}

Paginator.defaultProps = {
  params: {},
  render: () => {}
}
