import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'

import Root from './routes/Root'
import * as serviceWorker from './serviceWorker'
import * as authUtil from './utils/auth'

UIkit.use(Icons)

axios.defaults.baseURL = '/api'

authUtil.setDefaultAuthHeaders()

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
