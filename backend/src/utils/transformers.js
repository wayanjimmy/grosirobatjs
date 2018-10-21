const userTransformer = user => ({
  object: 'user',
  ...user
})

const distributorTransformer = distributor => ({
  object: 'distributor',
  ...distributor
})

const productTransformer = product => {
  const transform = {
    object: 'product',
    ...product,
    variants_count: Number(product.variants_count),
    category: categoryTransformer(product.category)
  }

  if (product.variants) {
    transform.variants = product.variants.map(variant =>
      variantTransformer(variant)
    )
  }

  return transform
}

const categoryTransformer = category => ({
  object: 'category',
  ...category
})

const variantTransformer = variant => ({
  object: 'variant',
  ...variant
})

module.exports = {
  userTransformer,
  productTransformer,
  categoryTransformer,
  variantTransformer,
  distributorTransformer
}
