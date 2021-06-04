import React from 'react'
import styled from 'styled-components'
import {
  Route,
  Switch
} from 'react-router-dom'

// routes
import routes from '../routes'

// component
import Header from './Header'

const Layout = () => {

  return (
    <>
      <Header/>
      <div style={{flexGrow: 1}}>
        <Wrapper>
          <MainContent>
            <Switch>
              {routes.map((route, index) => {
                return route.component && (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component {...props}/>
                    )}
                  />
                )
              })}
            </Switch>
          </MainContent>
        </Wrapper>
      </div>
    </>
  )
}

const MainContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  position: relative;
  transition: margin .1s ease-in;
`
const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10;
`


export default Layout
