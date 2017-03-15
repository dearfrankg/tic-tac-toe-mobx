import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'mobx-react'

import App from './App'
import game from './store'

render(
  <Provider game={game} >
    <App />
  </Provider>,
  document.querySelector('#app')
)
