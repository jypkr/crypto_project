import { Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './Footer.css'

const Footer = () => {

  const history = useHistory()

  return (
    <Container id="right">
      <Row className="mt-5">
        <p>
          <small className="text-grey-50">
            © 2021. All Rights Reserved. DISCLAIMER! This is just a game, real money isn't involved. Want to find out more about CryptoMaster <a onClick={() => history.push('/AboutUs')} className="link">CLICK HERE</a>
          </small>
        </p>
      </Row>
    </Container>
  )
}
export default Footer