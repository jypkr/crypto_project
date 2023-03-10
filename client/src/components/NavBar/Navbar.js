import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faHome, faUsers, faTrophy, faSignOutAlt, faWallet } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserAPI from '../../utils/UserAPI/UserAPI'
import Avatar from 'react-avatar'
import './Navbar.css'

const Navbar = () => {

	const history = useHistory()
	const [usernameState, setUsernameState] = useState()

	useEffect(() => {
		UserAPI.getUser()
			.then(data => {
				setUsernameState(data.data.username)
			})
	})

	const handleSignOut = () => {
		localStorage.removeItem('token')
		window.location = '/signin'
	}


	return (
		<div className="sideNavbar">

			<ul className="navLi">
				<li className="navTog">
					<section className="navLink">
						<span className="navSpan">cryptomaster</span>
						<FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: "gold" }} id="togIcon" />
					</section>
				</li>

				<li className="navTab">
					<div onClick={() => history.push('/')} className="navLink">
						<FontAwesomeIcon icon={faHome} id="navIcon" />
						<span className="navSpan">Home</span>
					</div>
				</li>

				<li className="navTab">
					<div onClick={() => history.push('/history')} className="navLink">
						<FontAwesomeIcon icon={faWallet} id="navIcon" />
						<span className="navSpan">History</span>
					</div>
				</li>

				<li className="navTab">
					<div onClick={() => history.push('/Leaderboard')} className="navLink">
						<FontAwesomeIcon icon={faTrophy} id="navIcon" />
						<span className="navSpan">Leaderboard</span>
					</div>
				</li>

				<li className="navTab">
					<div onClick={() => history.push('/Aboutus')} className="navLink">
						<FontAwesomeIcon icon={faUsers} id="navIcon" />
						<span className="navSpan">About Us</span>
					</div>
				</li>

				<li className="navTab" id="userTab">
					<div className="navLink">
						<Avatar name={usernameState} size='45' round={true} />
						<span className="navSpan">{usernameState}</span>
					</div>
				</li>

				<li className="navTab">
					<div onClick={handleSignOut} className="navLink">
						<FontAwesomeIcon icon={faSignOutAlt} id="navIcon" />
						<span className="navSpan">Log out</span>
					</div>
				</li>

			</ul>
		</div>
	)
}

export default Navbar