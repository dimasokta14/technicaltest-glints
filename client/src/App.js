import React from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import PropTypes from 'prop-types'

import {createStore} from './store'
import PrivateRoute from './utils/privateRoute'
import API from './utils/api'

const Layout = React.lazy(() => import('./containers/Layout'))
const Login = React.lazy(() => import('./views/Login'))
const Task = React.lazy(() => import('./containers/Task'))




const App = ({store}) => {
  const user = store.get('user')
  console.log(user)
  if(!user) {
    API.get('auth/user')
      .then(({data}) => {
        store.set('user', data)
      }).catch(() => {
        store.set('user', {})
      })
    return null
  }
  return (
    <Router>
      <React.Suspense fallback={null}>
        <Switch>
          <Route exact path='/login' name='Login Users' render={props => <Login {...props}/>}/>
          <Route path='/' name='Your Todos' render={props => <Layout {...props}/>}/>
          <Route path='/project/:id/:title' render={props => <Task {...props}/>}/>
        </Switch>
      </React.Suspense>
    </Router>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default createStore(App)

