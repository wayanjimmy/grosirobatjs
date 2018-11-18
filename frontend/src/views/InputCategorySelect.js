import React from 'react'
import AsyncSelect from 'react-select/lib/Async'
import debounce from 'lodash/debounce'

import { useOnMount } from '../hooks'
import ky from '../utils/api'

const controller = new AbortController()
const { signal } = controller

export default function InputCategorySelect(props) {
  const fetch = debounce(async (inputValue = '', callback) => {
    try {
      const res = await ky
        .get(`/api/categories?search=${inputValue}`, { signal })
        .json()
      const { data: categories } = res
      callback(
        categories.map(category => ({
          value: category.id,
          label: category.name
        }))
      )
    } catch (error) {}
  })

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
      placeholder="Kategori"
      cacheOptions
      defaultOptions
      loadOptions={fetch}
      onInputChange={handleInputChange}
      {...props}
    />
  )
}
