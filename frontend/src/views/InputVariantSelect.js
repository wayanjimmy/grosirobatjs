import React from 'react'

import BaseInputSelect from './BaseInputSelect'

function InputVariantSelect({ productId, ...props }) {
  return (
    <BaseInputSelect
      baseUrl={`/api/variants?product_id=${productId}`}
      placeholder="Satuan"
      defaultOptions
      {...props}
    />
  )
}

export default InputVariantSelect
