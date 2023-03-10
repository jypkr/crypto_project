import RegisterForm from '../../components/RegisterForm'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
// import CopyRightFooter from '../../components/CopyRightFooter'
import './Register.css'

function Register() {
  return (
    <>
      <Card className="text-center" bg="dark" text="white">
        <Card.Body size="lg">
          <Card.Title>CryptoMaster</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted" text="white">New to CryptoMaster? Sign-up is free and it's easy!</Card.Footer>
      </Card>
      <div>
        <Container id="registerCont">
          <RegisterForm sm={3} id="Register" />
        </Container>
        {/* <CopyRightFooter /> */}
      </div>
    </>
  )
}

export default Register
