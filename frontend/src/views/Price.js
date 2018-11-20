import PropTypes from 'prop-types'

function currency(amount) {
  amount = parseFloat(amount).toFixed(0)
  amount = amount.replace(/(\d)(?=(\d{3})+\b)/g, '$1.')
  return 'Rp ' + amount
}

const Price = ({ value }) => currency(value)

Price.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default Price
