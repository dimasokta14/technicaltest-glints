import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Button} from '../components/Button'
import {InputField, InputGroup, Message} from '../components/Forms'
import {CardGroup, CardBody, Card} from '../components/Cards'
import {withStore} from '../store'
import PropTypes from 'prop-types'
import API from '../utils/api'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    email: '',
    password: ''
  })
  const [showMessage, setShowMessage] = useState(false)

  const handleChange = prop => event => {
    validateValue(prop)
    setValues({...values, [prop]: event.target.value})
  }

  const handleSubmit = prop => event => {
    event.preventDefault()
    const { history, store } = prop

    const hasErrors = error.length > 0
    if(!values || hasErrors) return

    API.post('auth/login', values)
      .then(({data}) => {
        setError(null)
        store.set('user', data.user)
        localStorage.setItem('token', data.token)
        history.push('/')
      })
      .catch((error) => {
        setError(error)
      })
  }

  const validateValue = (fieldName) => {
    let valid
    switch (fieldName) {
      case 'email':
        valid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        error.email = valid ? '' : 'Email invalid'
        setError({...error, ['email']: error.email})
        break;
      case 'password':
        valid = values.password.length >= 6
        error.password = valid ? '' : 'Password terlalu pendek'
        setError({...error, ['password']: error.password})
      default:
        break;
    }
  }


  return (
    <Container>
      <Wrapper>
        <Row>
          <Box>
            <CardGroup>
              <Card minWidth='400px'>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p>Masuk sebelum melanjutkan</p>
                    <InputGroup>
                      <InputField
                        placeholder='Email'
                        type='text'
                        onChange={handleChange('email')}
                        autoFocus
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputField
                        placeholder='Password'
                        type='password'
                        onChange={handleChange('password')}
                        autoFocus
                        required
                      />
                    </InputGroup>
                    <Row style={{justifyContent: 'space-around'}}>
                      <Button>
                        Login
                      </Button>
                      <p>Belum punya akun? Daftar</p>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </CardGroup>
          </Box>
        </Row>
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin: auto;
`
const Row = styled.div`
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
`
const Box = styled.div`
  justify-content: center;
`


const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`
Login.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}


export default withStore(Login)
