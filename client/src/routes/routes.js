import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import HitSreen from '../screens/HitScreen'
import HomeScreen from '../screens/HomeScreen'
import FloatingTile from '../screens/FloatingTile'

export const routes = (
  <Route name="app" path="/" component={App}>
    {<IndexRoute component={ HomeScreen }/>}
    <Route path="/hitTile" name="hitTile" component={ HitSreen }/>
    <Route path="/floatingTile" component={ FloatingTile }/>
  </Route>
)

export default routes
