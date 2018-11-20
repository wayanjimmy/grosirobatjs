import React from 'react'

import BaseInputSelect from './BaseInputSelect'

export default function InputCategorySelect(props) {
  return (
    <BaseInputSelect
      baseUrl="/api/categories"
      placeholder="Kategori"
      defaultOptions
      {...props}
    />
  )
}
