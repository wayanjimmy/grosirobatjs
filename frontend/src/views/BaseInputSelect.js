import React from 'react'
import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/lib/Async'
import debounce from 'lodash/debounce'

import { useOnMount } from '../hooks'
import ky from '../utils/api'

const controller = new AbortController()
const { signal } = controller

export default function BaseInputSelect({ baseUrl, ...props }) {
  const fetch = debounce(async (inputValue = '', callback) => {
    try {
      const res = await ky
        .get(`${baseUrl}?search=${inputValue}`, { signal })
        .json()
      const { data: categories } = res
      callback(
        categories.map(category => ({
          value: category.id,
          label: category.name
        }))
      )
    } catch (error) {}
  }, 300)

  const handleInputChange = newValue => {
    return newValue.replace(/\W/g, '')
  }

  useOnMount(() => {
    return function cleanup() {
      fetch.cancel()
      controller.abort()
    }
  })

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={fetch}
      onInputChange={handleInputChange}
      {...props}
    />
  )
}

BaseInputSelect.propTypes = {
  baseUrl: PropTypes.string.isRequired
}
