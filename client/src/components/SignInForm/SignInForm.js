import { useState } from 'react'
import UserAPI from '../../utils/UserAPI'
import HistoryAPI from '../../utils/HistoryAPI'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Ingame_weekNumber from '../Ingame_weekNumber'
import './SignIn.css'

const SignInForm = () => {

	const history = useHistory()

	const [userState, setUserState] = useState({
		username: '',
		password: ''
	})

	const handleInputChange = ({ target: { name, value } }) => setUserState({ ...userState, [name]: value })

	const checkHistory = () => {
		HistoryAPI.getHistory(Ingame_weekNumber().ingame_weeknumber)
			.then(data => {
				if (data.data.length === 0) {
					HistoryAPI.create()
					setUserState({ ...userState, name: '', email: '', username: '', password: '' })
				}
				window.location = '/'
			})
			.catch(err => console.log(err))
	}

	const handleLoginUser = event => {
		event.preventDefault()
		UserAPI.login(userState)
			.then(({ data: token }) => {
				if (token) {
					// Check if there is existed history model
					localStorage.setItem('token', token)
					checkHistory()
				}
				else {
					alert('User unable to login')
				}
			})
			.catch(err => console.error(err))
	}

	return (

		<div className="olor-overlay d-flex justify-content-center align-items-center">
			<Form classname="rounded p-4 p-sm-3">
				<Form.Group className="mb-3 signInWidthBox" controlId="username">
					<Form.Control
						type="text"
						placeholder="Enter your username"
						name="username"
						value={userState.username}
						onChange={handleInputChange} />
				</Form.Group>
				<Form.Group className="mb-3 signInWidthBox" controlId="password">
					<Form.Control
						type="password"
						placeholder="Enter your password"
						name="password"
						value={userState.password}
						onChange={handleInputChange} />
				</Form.Group>
				<Form.Group className="mb-3"
					controlId="formBasicCheckbox">
					<Form.Check className="text-white" type="checkbox" label="Remember Me" />
				</Form.Group>
				<Button id="signIn"
					className="me-3"
					variant="warning"
					type="submit"
					onClick={handleLoginUser} >
					Sign In
				</Button>
				<Button id="register"
					variant="outline-warning"
					type="button">
					<div onClick={() => history.push('/register')} className="Register">
						<span className="Register">Register</span>
					</div>
				</Button>
			</Form>
		</div>
	)
}

export default SignInForm
