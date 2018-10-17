/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import cn from 'classnames'

import Loading from '../views/Loading'

function transformExtraParamsIntoQueryString(extraParams) {
  return Object.keys(extraParams)
    .filter(key => extraParams[key] !== '')
    .map(key => `${key}=${extraParams[key]}`)
    .join('&')
}

function Pagination({ currentPage, hasMore, handlePageChange }) {
  return (
    <ul className="uk-pagination" data-uk-margin>
      <li className={cn(currentPage === 1 && 'uk-disabled')}>
        <a onClick={() => handlePageChange(currentPage - 1)}>
          <span data-uk-pagination-previous={''} />
        </a>
      </li>
      <li className={cn(!hasMore && 'uk-disabled')}>
        <a onClick={() => handlePageChange(currentPage + 1)}>
          <span data-uk-pagination-next={''} />
        </a>
      </li>
    </ul>
  )
}

class Paginator extends Component {
  canceller = axios.CancelToken.source()

  state = {
    items: [],
    isLoading: false,
    hasMore: false,
    currentPage: 1
  }

  static Pagination = Pagination

  static propTypes = {
    url: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
    extraParams: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired
  }

  static defaultProps = {
    perPage: 10,
    extraParams: {}
  }

  buildQueryString = () => {
    const { currentPage } = this.state
    const { extraParams } = this.props
    return [
      `?page=${currentPage}&limit=10`,
      transformExtraParamsIntoQueryString(extraParams)
    ].join('&')
  }

  fetch = () => {
    this.setState({ isLoading: true })

    axios
      .get(this.props.url + this.buildQueryString(), {
        cancelToken: this.canceller.token
      })
      .then(res => {
        const { data: items, has_more: hasMore } = res.data
        this.setState({ isLoading: false, items, hasMore })
      })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page }, this.fetch)
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.extraParams, prevProps.extraParams)) {
      this.fetch()
    }
  }

  render() {
    const { isLoading } = this.state
    const { render } = this.props

    if (isLoading) {
      return <Loading fullWidth />
    }

    return render({
      ...this.state,
      fetch: this.fetch,
      handlePageChange: this.handlePageChange,
      getPaginationProps: (props = {}) => {
        return {
          handlePageChange: this.handlePageChange,
          ...this.state,
          ...props
        }
      }
    })
  }
}

export default Paginator
