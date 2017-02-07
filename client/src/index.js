import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import Router from './routes/Router'
import createStore from './core/createStore'

import './index.less'

const store = createStore()
const state = store.getState()

ReactDOM.render(
  <Provider {...{store}} >
    <IntlProvider key="intl" {...{locale: state.intl.defaultLocale}}>
      <Router />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)
