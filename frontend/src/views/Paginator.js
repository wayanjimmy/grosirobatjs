import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ky from '../utils/api'
import {useOnMount} from '../hooks'

function buildQueryString(url, params, page, pageSize) {
  const q = new URLSearchParams()
  q.append('page', page)
  q.append('pageSize', pageSize)
  Object.keys(params).forEach(key => {
    q.append(key, params[key])
  })
  return url + '?' + q.toString()
}

function Pagination({page, lastPage, handlePageChange}) {
  return (
    <ul className="uk-pagination" data-uk-margin>
      <li className={cn(page === 1 && 'uk-disabled')}>
        <a
          href="/"
          onClick={e => {
            e.preventDefault()
            handlePageChange(page - 1)
          }}
        >
          <span data-uk-pagination-previous={''} />
        </a>
      </li>
      <li className={cn(lastPage === page && 'uk-disabled')}>
        <a
          href="/"
          onClick={e => {
            e.preventDefault()
            handlePageChange(page + 1)
          }}
        >
          <span data-uk-pagination-next={''} />
        </a>
      </li>
    </ul>
  )
}

function Paginator({url, params, render}) {
  let controller = new AbortController()
  let {signal} = controller

  let [items, setItems] = useState([])
  let [page, setPage] = useState(1)
  let [pageSize, setPageSize] = useState(10)
  let [lastPage, setLastPage] = useState(1)

  let fetch = async () => {
    try {
      let res = await ky
        .get(buildQueryString(url, params, page, pageSize), {signal})
        .json()
      let {data: items, meta} = res
      setItems(items)
      setPage(meta.page)
      setPageSize(meta.pageSize)
      setLastPage(meta.lastPage)
    } catch (_error) {}
  }

  let handlePageChange = p => {
    if (p > lastPage || p < 1 || p === page) {
      return
    }

    setPage(p)
    fetch()
  }

  useOnMount(() => {
    fetch()
  })

  useEffect(
    () => {
      fetch()

      return function cleanup() {
        controller.abort()
      }
    },
    [JSON.stringify(params)]
  )

  return (
    <Fragment>
      {render({
        items,
        fetch,
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

export default Paginator
