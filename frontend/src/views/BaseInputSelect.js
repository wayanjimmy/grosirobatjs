import React from 'react'
import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/lib/Async'
import debounce from 'lodash/debounce'

import { useOnMount } from '../hooks'
import ky from '../utils/api'

const controller = new AbortController()
const { signal } = controller

function BaseInputSelect({ baseUrl, params, mapOption, ...props }) {
  const fetch = debounce(async (inputValue = '', callback) => {
    try {
      const q = new URLSearchParams()
      Object.keys(params).forEach(key => q.append(key, params[key]))
      const res = await ky
        .get(
          `${baseUrl}?search=${inputValue}${
            q.toString().length > 0 ? '&' + q.toString() : ''
          }`,
          { signal }
        )
        .json()
      const { data: categories } = res
      callback(categories.map(mapOption))
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
  baseUrl: PropTypes.string.isRequired,
  mapOption: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
}

BaseInputSelect.defaultProps = {
  params: {},
  mapOption: option => ({ value: option.id, label: option.name })
}

export default BaseInputSelect
