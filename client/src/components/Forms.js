import styled from 'styled-components'

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  margin-bottom: 1.5rem;
`
export const InputIcon = styled.span`
  display: flex;
  align-items: center;
  padding: .375rem .75rem;
  margin-bottom: 0;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  border: 1px solid;
  border-radius: .25rem;
  color: #768192;
  background-color: #ebedef;
  border-color: #d8dbe0;
`
export const InputGroupPrepend = styled.div`
  white-space: nowrap;
  vertical-align: middle;
  display: flex;
`
export const InputField = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: .375rem .75rem;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  color: #768192;
  background-color: #fff;
  border-color: #d8dbe0;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`
export const Message = styled.label`
  margin-bottom: 0.5em;
  color: red;
  display: block;
  font-size: 12px;
`