/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ky from '../utils/api'
import Loading from '../views/Loading'

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

export default function Paginator({ url, render, params }) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [lastPage, setLastPage] = useState(1)

  const fetch = async () => {
    setIsLoading(true)
    try {
      const res = await ky
        .get(buildQueryString(url, params, page, pageSize))
        .json()
      setItems(res.data)
      setPage(res.meta.page)
      setPageSize(res.meta.pageSize)
      setLastPage(res.meta.pageTotal)
    } catch (error) {}

    setIsLoading(false)
  }

  const handlePageChange = page => {
    setPage(page)
  }

  useEffect(fetch, [page, params])

  if (isLoading) {
    return <Loading fullWidth />
  }

  return (
    <Fragment>
      {render({
        items,
        isLoading,
        page,
        getPaginationProps: (props = {}) => ({
          ...props,
          page,
          lastPage,
          handlePageChange
        })
      })}
    </Fragment>
  )
}

Paginator.Pagination = Pagination

Paginator.propTypes = {
  url: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
}

Paginator.defaultProps = {
  params: {},
  render: () => {}
}
