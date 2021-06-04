import { createGlobalStyle } from 'styled-components'

const Globalstyles = createGlobalStyle`
  body {
    color: #172b4d;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    text-align: left;
    margin: 0px;
    overflow-x: hidden;
  };
  html {
    min-height: 100%;
    background-color: rgb(75, 191, 107);
  }
`

export default Globalstyles
