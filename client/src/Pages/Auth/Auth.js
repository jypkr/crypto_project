import { useState } from 'react'
import SignInForm from '../../components/SignInForm'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'


const Auth = () => {
  return (
    <>
      <Card className="text-center" bg="dark" text="white">
        <Card.Body size="lg">
          <Card.Title>CryptoMaster</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted" text="white">New to CryptoMaster? Sign-up is free and it's easy!</Card.Footer>
      </Card>
      <> 
      <Container id="signInFormCont">
            <SignInForm sm={3} id="signIn"/>
      </Container>
      </>
    </>
  )
}

export default Auth
