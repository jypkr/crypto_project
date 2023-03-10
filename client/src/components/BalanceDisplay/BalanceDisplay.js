import { useState, useEffect } from 'react'
import HistoryAPI from '../../utils/HistoryAPI'
import Ingame_weekNumber from '../Ingame_weekNumber/Ingame_weekNumber'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const BalanceDisplay = () => {
	const [balance, setBalance] = useState()

	useEffect(() => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then((data) => {
				setBalance(data.data[0].cash_balance)
			})
	})

	return (
		<Container className="text-center fw-bold text-white" id="balanceDisplayCont">
			<Card className="bg-dark border">
				<Card.Body>{Ingame_weekNumber().currentdate.getFullYear()} Week {Ingame_weekNumber().ingame_weeknumber} Cash Balance : ${balance}</Card.Body>
			</Card>
		</Container>
	)
}

export default BalanceDisplay