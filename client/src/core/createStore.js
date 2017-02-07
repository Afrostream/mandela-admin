import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createAPI from './createAPI'
import * as middleWare from '../middleware'
import * as reducers from '../reducers'
import * as UserActionCreators from '../actions/user'
import _ from 'lodash'
import moment from 'moment'
import { intlReducer } from 'react-intl-redux'
import { addLocaleData } from 'react-intl'
import window from 'global/window'
import frLocaleData from 'react-intl/locale-data/fr'
import enLocaleData from 'react-intl/locale-data/en'

const localesData = [
  ...frLocaleData,
  ...enLocaleData,
]

addLocaleData(localesData)

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage || 'FR'
// Split locales with a region code
const clientLocale = language.toLowerCase().split(/[_-]+/)[0]
//Set locale date //TODO une fois le site multilingue formater au pays courant
moment.locale(clientLocale)

export default function () {

  const api = createAPI(
    /**
     * Client's createRequest() method
     */
    ({
      method = 'GET',
      headers = {},
      pathname = '',
      query = {},
      body = {},
    }) => {

      let url = `${pathname}`

      if (method === 'GET') {
        return fetch(url, {
          method,
          headers,
          query: JSON.stringify(query)
        })
      }

      return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      })

    }
  )

  const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(
      middleWare.promise.bind(null, api),
    )
  )(createStore)

  const reducer = combineReducers({
    ...reducers,
    intl: intlReducer
  })

  const mergedState = _.merge({
    intl: {
      defaultLocale: 'fr',
      locales: localesData
    }
  })

  const store = createStoreWithMiddleware(reducer, mergedState)
  store.dispatch(UserActionCreators.getProfile())
  return store
}
