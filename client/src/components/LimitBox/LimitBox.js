import { useState, useEffect } from 'react'
import HistoryAPI from '../../utils/HistoryAPI/HistoryAPI'
import { Container, Card, CardGroup, Form, Button } from 'react-bootstrap'
import './LimitBox.css'
import CoinOverview from '../CoinOverview/CoinOverview'
import ChoiceDisplay from '../ChoiceDisplay'
import Ingame_weekNumber from '../Ingame_weekNumber/Ingame_weekNumber'
import { ButtonGroup } from 'react-bootstrap'


const LimitBox = () => {
	const crypto_name = localStorage.getItem('clicked_coin')
	const real_time_price = localStorage.getItem('clicked_coin_price')

	const [priceState, setPriceState] = useState({
		cyrpto_name: '',
		real_time_price: 0.0,
		sell_amount: 0.0,
		buy_amout: 0.0
	})
	const [balance, setBalance] = useState()


	const handleInputChange = ({ target: { name, value } }) => setPriceState({ ...priceState, [name]: value })

	const handleSell = event => {
		event.preventDefault()

		if (priceState.sell_amount === 0.0 || priceState.sell_amount === 0) {
			alert('Put Amount!')
		}
		else {
			let body = {
				"crypto_name": crypto_name,
				"side": "sell",
				"price": real_time_price,
				"amount": priceState.sell_amount
			}

			HistoryAPI.pushTransaction(body)
				.then(data => {
					console.log(data)
					alert('Selling Transaction success!')
					window.location.reload(false);
					setPriceState({
						...priceState, real_time_price: real_time_price,
						sell_amount: 0.0,
						buy_amout: 0.0
					})
				})
				.catch(err => console.log(err))
		}
	}

	const handleBuy = event => {
		event.preventDefault()

		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then((data) => {
				if (data.data[0].cash_balance < priceState.buy_amout * real_time_price) {
					alert(`You don't have enough balance to buy the amount!`)
				}
			})

		if (priceState.buy_amout === 0.0 || priceState.buy_amout === 0) {
			alert('Put Amount!')
		}
		else {
			let body = {
				"crypto_name": crypto_name,
				"side": "buy",
				"price": real_time_price,
				"amount": priceState.buy_amout
			}

			HistoryAPI.pushTransaction(body)
				.then(data => {
					window.location.reload(false);
					setPriceState({
						...priceState, real_time_price: real_time_price,
						sell_amount: 0.0,
						buy_amout: 0.0
					})
				})
				.catch(err => console.log(err))
		}

	}

	const max_buy = event => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then((data) => {
				if (data.data[0].cash_balance > 0) {
					setBalance(data.data[0].cash_balance)
					setPriceState({ buy_amout: balance / real_time_price })
				}
				else {
					setPriceState({ buy_amout: 0 })
				}
			})
	}
	
	const half_buy = event => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then((data) => {
				if (data.data[0].cash_balance > 0) {
					setBalance(data.data[0].cash_balance)
					setPriceState({ buy_amout: (balance / real_time_price) / 2 })
				}
				else {
					setPriceState({ buy_amout: 0 })
				}
			})
	}

	const max_sell = event => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then(data => {
				HistoryAPI.getCryptoAmount(data.data[0]._id)
					.then(data => {
						if (data.data.find(coin => coin.crypto_name === crypto_name)) {
							let amount = data.data.find(coin => coin.crypto_name === crypto_name).amount
							setPriceState({ sell_amount: amount })
						}
						else {
							setPriceState({ sell_amount: 0 })
						}
					})
			})
	}

	const half_sell = event => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then(data => {
				HistoryAPI.getCryptoAmount(data.data[0]._id)
					.then(data => {
						if (data.data.find(coin => coin.crypto_name === crypto_name)) {
							let amount = data.data.find(coin => coin.crypto_name === crypto_name).amount
							setPriceState({ sell_amount: amount / 2 })
						}
						else {
							setPriceState({ sell_amount: 0 })
						}
					})
			})
	}

	return (
		<Container id="limitBoxCont" className="mt-5">
			<CoinOverview />
			<ChoiceDisplay />
			<CardGroup>
				<Card style={{ width: '20rem' }} className="bg-dark border rounded text-white m-0">
					<Card.Body>
						<Form.Group className="mb-3" controlId="buy_amout">
							<Form.Label column sm="3" id="amountSpace">
								Amount
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Amount"
								name="buy_amout"
								value={priceState.buy_amout}
								onChange={handleInputChange} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="total">
							<Form.Label column sm="3" id="totalSpace">
								Total
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Total"
								name="total"
								value={priceState.buy_amout * real_time_price} />
						</Form.Group>
						<ButtonGroup id="btnPosition">
							<Button
								variant="warning"
								onClick={max_buy}>
								Max</Button>
							<Button
								variant="warning"
								onClick={half_buy}>
								50%</Button>
							<Button
								variant="warning"
								onClick={handleBuy}>
								Buy</Button>
						</ButtonGroup>
					</Card.Body>
				</Card>
				<Card style={{ width: '20rem' }} className="bg-dark border rounded text-white">
					<Card.Body>
						<Form.Group className="mb-3" controlId="sell_amount">
							<Form.Label column sm="3" id="amountSpace">
								Amount
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Amount"
								name="sell_amount"
								value={priceState.sell_amount}
								onChange={handleInputChange} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="total">
							<Form.Label column sm="3" id="totalSpace">
								Total
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Total"
								name="total"
								value={priceState.sell_amount * real_time_price} />
						</Form.Group>
						<ButtonGroup id="btnPosition">
							<Button
								variant="warning"
								onClick={max_sell}>
								Max</Button>
							<Button
								variant="warning"
								onClick={half_sell}>
								50%</Button>
							<Button
								variant="warning"
								onClick={handleSell}>
								Sell</Button>
						</ButtonGroup>
					</Card.Body>
				</Card>
			</CardGroup>
		</Container>
	)
}

export default LimitBox