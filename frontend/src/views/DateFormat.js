import f from 'date-fns/format'
import PropTypes from 'prop-types'

export const prettyDate = (value, format) => {
  return f(value, format)
}

const DateFormat = ({ value, format }) => prettyDate(value, format)

DateFormat.propTypes = {
  format: PropTypes.string.isRequired
}

DateFormat.defaultProps = {
  format: 'D MMM YYYY HH:ss'
}

export default DateFormat
