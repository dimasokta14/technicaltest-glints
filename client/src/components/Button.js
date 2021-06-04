import styled from 'styled-components'

export const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  color: ${props => props.colorText || 'white'};
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  background-color: ${props => props.bgColor || '#321fdb'};
  &:hover{
    color: ${props => props.colorHover || 'white'};
    background-color: ${props => props.bgHover || '#2a1ab9'};
  }
`
