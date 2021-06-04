import React from 'react'
import styled from 'styled-components'
import {Button} from '../components/Button'
import ReactTooltip from 'react-tooltip'

const Header = () => {
  return (
      <Wrapper>
        <LogoContainer>
          <Logo>TodoAPP</Logo>
        </LogoContainer>
        <TitleContainer>
          <Title>
            John Doe Todo's APP Board
          </Title>
        </TitleContainer>
        <InfoContainer>
          <NavItem>
            <Button
              bgColor='rgba(255, 255, 255, 0.2)'
              bgHover='rgba(255, 255, 255, 0.4)'
              data-tip
              data-for='crproject'
            >
              <i class="fas fa-plus"></i>
            </Button>
            <ReactTooltip id="crproject" place="top" effect="solid">
              Tambah Project
            </ReactTooltip>
          </NavItem>
          <NavItem>
            <DropdownToggle 
              caret={false}
              href='#'
              role='button'
              aria-haspopup={true}
              aria-expanded={false}
            >
              <Avatar>
                <AvatarImage
                  alt='use@mail.com'
                  src='https://picsum.photos/seed/picsum/200/200'
                />
              </Avatar>
            </DropdownToggle>
          </NavItem>
        </InfoContainer>
      </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: rgba(0,0,0,0.1);
  min-height: 40px;
  max-height: 70px;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  padding: 5px 15px 5px 15px;
  justify-content: space-between;
  align-items:center;
`
const LogoContainer = styled.div`
  display: flex;
  flex-basis: 20%;
  justify-content: flex-start;
`

const TitleContainer = styled.div`
  display: flex;
  flex-grow: 4;
  flex-basis: 100%;
`
const Logo = styled.h1`
  font-weight: 500;
`
const Title = styled.h1`
  font-size: 1.5rem;
`

const InfoContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 56px;
  padding: 0;
  margin-bottom: 0;
  list-style: none;
  margin-top: 0px;
`
const NavItem = styled.li`
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
`
const DropdownToggle = styled.a`
  text-decoration: none;
  background-color: transparent;
`
const Avatar = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50em;
  width: 36px;
  height: 36px;
  font-size: 14.4px;
`
const AvatarImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50em;
`

export default Header
