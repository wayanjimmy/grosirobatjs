import ky from 'ky'

import * as authUtil from './auth'

const api = ky.extend(authUtil.getAuthHeader())

export default api
