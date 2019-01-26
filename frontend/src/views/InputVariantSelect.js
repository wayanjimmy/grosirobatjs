import React from 'react'

import BaseInputSelect from './BaseInputSelect'

function InputVariantSelect({ productId, ...props }) {
  return (
    <BaseInputSelect
      baseUrl={`/api/variants`}
      params={{ productId }}
      defaultOptions
      {...props}
    />
  )
}

export default InputVariantSelect
