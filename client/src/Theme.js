import React from 'react'
import { ThemeProvider } from 'styled-components'


const theme = {
  colors:{
    background: "#fffbdf",
    primary: "#34656d",
  },
}

const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme
