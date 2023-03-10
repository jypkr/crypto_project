import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap'
import Text from 'react-bootstrap/FormText'
import * as ReactBootStrap from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import HistoryAPI from '../../utils/HistoryAPI'
import Ingame_weekNumber from '../Ingame_weekNumber/Ingame_weekNumber'

const CoinOverview = () => {
	const [loading, setLoading] = useState(false)
	const [coinsState, setCoinsState] = useState([])

	const check_loading = (overview) => {
		if (overview.amount > 0) {
			setLoading(true)
		}
	}

	const renderOverview = (overview, index) => {
		if (overview.amount > 0) {
			return (
				<tr key={index}>
					<td><Text style={{ textTransform: 'uppercase', color: 'white' }}>{overview.crypto_name}</Text></td>
					<td>{overview.amount}</td>
				</tr>
			)
		}
	}

	useEffect(() => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then(data => {
				HistoryAPI.getCryptoAmount(data.data[0]._id)
					.then(data => {
						setCoinsState(data.data)
						coinsState.map(check_loading)
					})
			})
	})

	return (
		<Card className="bg-dark border rounded text-white">
			{!loading ? (
				<Card.Body>
					<Text style={{ textTransform: 'uppercase', color: 'red' }}>You don't have any coin in your wallet yet!</Text>
				</Card.Body>
			)
				:
				(
					<Card.Body>
						<Row className="mb-1">
							<Col className="text-center">
								<Text style={{ textTransform: 'uppercase', color: 'white' }} className="me-1">My Coin Wallet </Text><FontAwesomeIcon icon={faWallet} id="homeIcon" />
							</Col>
						</Row>

						<ReactBootStrap.Table striped bordered hover variant="dark" className="text-center">

							<thead>
								<tr>
									<th>Name</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								{
									coinsState.map(renderOverview)
								}
							</tbody>
						</ReactBootStrap.Table>
					</Card.Body>)}
		</Card >
	)
}

export default CoinOverview