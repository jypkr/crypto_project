import Navbar from '../../components/NavBar'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ControlledCarousel from '../../components/ControlledCarousel'
import './AboutUs.css'
import Footer2 from '../../components/Footer2'
import { faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
function AboutUs() {
	return (
		<div className="aboutUsPg">
			<Navbar />
			<div className="pgContent text-center">
				<Container className="aboutUsCont mb-4" id="aboutUsHeader">
					<Col id="aboutUsTitle">
						<p class="text-warning" FontAwesomeIcon icon={"fas fa-user"} id="aboutUsIcon" />
						About Us
					</Col>
				</Container>
				<Container className="aboutUsCont" id="howToPlay">
					<Row top="xs" xs={12}>
						<Col id="howToPlay">
							<h3>How to Play CryptoMaster</h3>
						</Col>
					</Row>
				</Container>
				<Container className="aboutUsCont" id="Instructions">
					<Row sm={8}>
						<Col id="Instructions">
							<br></br>
							<p><h5>Register for a CryptoMaster account. Sign-up is free and it's easy!</h5></p>
							<p><h5>CryptoMaster is a fun way to learn how to trade cryptocurrencies, without risking your own money. No investment required.</h5></p> 
							<p><h5>Each week, you'll get $1,000 in play money, and simulate buying and selling crypto. Great practice for becoming a CryptoMaster. </h5></p>
							<p><h5>You'll have real time data at your fingertips, you can view your full trading history and weekly progress.</h5></p>
							<p><h5>Bring your best trading strategies and earn your way to the top of the Leaderboard!</h5></p>
							<p><h5><strong>Invite your friends to join, and see how fast you become a CryptoMaster!</strong></h5></p>
							<br></br>
							<br></br>
						</Col>
					</Row>
				</Container>
				<Container className="aboutUsCont" id="ControlledCarousel">
					<Row xs={12}>
						<Col id="Carousel">
							<ControlledCarousel />
						</Col>
					</Row>
				</Container>
				   <Container className="text-white" id="ContactInfo">
          <Row top="xs" xs={12}>
            <Col id="Contact">
              <h3>Get In Touch </h3>
            </Col>
          </Row>
        </Container>
        <Container className="text-white" id="ContactInfo">
          <Row sm={8}>
            <Col id="ContactInfo">
              <p><h5>Comments, Question or Concerns, feel free to contact us at:  </h5>
                <h5><li className="list-unstyled">
                  {/* <p className="mb-0"> */}
                <FontAwesomeIcon icon={faPhone} className="icon2 me-1" />(541) 754-3010
                {/* </p> */}
                  </li>
                  </h5>
                  </p>
                  <h5><li className="list-unstyled">
                    {/* <p className="mb-0"> */}
                <FontAwesomeIcon icon={faEnvelope} className="icon2 me-1" />CryptoMaster@gmail.com
                {/* </p> */}
                </li>
                </h5>
            </Col>
          </Row>
        </Container>
				<Footer2 />
			</div>
		</div>)
}

export default AboutUs