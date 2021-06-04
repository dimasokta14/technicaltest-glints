import styled from 'styled-components'

export const CardGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`
export const Card = styled.div`
  position: relative;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  min-width: ${props => props.minWidth || '0px'};
  margin-bottom: 1.5rem;
  word-wrap: break-word;
  background-clip: border-box;
  border: 1px solid;
  border-radius: .25rem;
  background-color: #fff;
  border-color: #d8dbe0;
  padding: 20px;
  max-width: 500px;
`
export const CardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
`