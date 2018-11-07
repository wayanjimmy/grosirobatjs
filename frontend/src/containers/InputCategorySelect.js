import React, { useEffect } from 'react'
import debounce from 'lodash/debounce'
import Select from 'react-select/lib/Async'
import axios from 'axios'

export default function InputCategorySelect(props) {
  const canceller = axios.CancelToken.source()

  const fetch = debounce((input = '', callback) => {
    axios
      .get(`/categories?search=${input}`, { cancelToken: canceller.token })
      .then(res => {
        const { data: items } = res.data
        callback(
          items.map(item => ({
            value: item.id,
            label: item.name
          }))
        )
      })
  }, 1000)

  const handleInputChange = value => value.replace(/\W/g, '')

  useEffect(
    () => {
      return function cleanup() {
        canceller.cancel()
      }
    },
    [true]
  )

  return (
    <Select
      cacheOptions
      loadOptions={fetch}
      onInputChange={handleInputChange}
      {...props}
    />
  )
}
