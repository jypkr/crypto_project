import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Text from 'react-bootstrap/FormText'
import Card from 'react-bootstrap/Card'

const ChoiceDisplay = () => {
	const [choice, setChoice] = useState({
		name: ''
	})

	useEffect(() => {
		setChoice({
			name: localStorage.getItem('clicked_coin'),
			price: localStorage.getItem('clicked_coin_price')
		})
	})

	return (
		<Card className="bg-dark border rounded text-white mt-5">
			<Card.Body>
				Current choice 	: <Text style={{ textTransform: 'uppercase', color: 'yellow' }}>{choice.name}</Text> for ${choice.price}
			</Card.Body>
		</Card>
	)
}

export default ChoiceDisplay