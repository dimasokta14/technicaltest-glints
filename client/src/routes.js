import React from 'react'

const Project = React.lazy(() => import('./containers/Project'))
const Task = React.lazy(() => import('./containers/Task'))

const routes = [
  {path :'/', exact: true, name: 'User Board', component: Project},
  {path: '/project/:id/:title', name: 'User Project', exact: true, component: Task}
]

export default routes