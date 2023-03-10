import { useState, useEffect } from 'react'
import DropdownWeeknumForm from '../../components/DropdownWeekNumForm'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import HistoryAPI from '../../utils/HistoryAPI'
import Navbar from '../../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import * as ReactBootStrap from 'react-bootstrap'
import './Leaderboard.css'
import Footer from '../../components/Footer'
import Text from 'react-bootstrap/FormText'
import Ingame_weekNumber from '../../components/Ingame_weekNumber/Ingame_weekNumber'


const Leaderboard = () => {
	if (!localStorage.getItem('token')) {
		window.location = '/signin'
	}
	const [historyState, setHistoryState] = useState({
		weekNumber: '',
		historys: []
	})

	const [rankingState, setRankingState] = useState({
		ranks: []
	})

	const [weekNumState, setWeekNumState] = useState(0)
	const [loading, setLoading] = useState(false)

	const getRankings = (weekNum) => {
		setWeekNumState(weekNum)
		HistoryAPI.getRankingforSpecificWeek(weekNum)
			.then(({ data: ranks }) => {
				setRankingState({ ...rankingState, ranks })
				setLoading(true)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const renderRank = (rank, index) => {
		if (rank.rank === 1) {
			return (
				<tr key={index}>
					<td><FontAwesomeIcon icon={faTrophy} id="topRankIcon" /></td>
					<td><Text style={{ textTransform: 'uppercase', color: 'white' }}>{rank.username}</Text></td>
					<td>{rank.profit}</td>
				</tr>
			)
		}
		else {
			return (
				<tr key={index}>
					<td>{rank.rank}</td>
					<td><Text style={{ textTransform: 'uppercase', color: 'white' }}>{rank.username}</Text></td>
					<td>{rank.profit}</td>
				</tr>
			)
		}
	}

	useEffect(() => {
		HistoryAPI.getWeekNum()
			.then(({ data: historys }) => {
				historys = historys.sort()
				setHistoryState({ ...historyState, historys })
			})
			.catch(err => {
				console.log(err)
				window.location = '/'
			})

		getRankings(Ingame_weekNumber().ingame_weeknumber)
	}, [])

	return (
		<div className="leaderboardPg">
			<Navbar />
			<div className="pgContent">
				<Container id="lbHeader">
					<Row>
						<Col id="lbTitle">
							<FontAwesomeIcon icon={faTrophy} id="lbIcon" />
							Leaderboard
						</Col>
					</Row>
				</Container>
				<Container id="lbTableCont">
					<br />
					<Row>
						<Col className="d-flex justify-content-center align-items-center">
							<Dropdown>
								<Dropdown.Toggle className="weekTogBtn" variant="dark" id="dropdown-basic">
									Week
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{
										historyState.historys.map((weekNumber) => (<DropdownWeeknumForm
											weekNum={weekNumber}
											getfunction={getRankings} />))
									}
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>
					{loading ?
						(
							<div>
								<Row>
									<Col className="d-flex justify-content-center align-items-center mt-2" id="lbTableTitle">
										Week {weekNumState}'s Ranking
									</Col>
								</Row>
								<br />
								<Row>
									<div className="tableScroll">
										<ReactBootStrap.Table striped bordered hover variant="dark" className="text-center">
											<thead>
												<tr>
													<th>Rank</th>
													<th>Username</th>
													<th>Profit</th>
												</tr>
											</thead>
											<tbody>
												{
													rankingState.ranks.map(renderRank)
												}
											</tbody>
										</ReactBootStrap.Table>
									</div>
								</Row>
							</div>
						)
						: (
							// Loader needs to be placed where table will be placed
							<div className="d-flex justify-content-center align-items-center mt-2 text-white">
								Select week number...
								<ReactBootStrap.Spinner animation="grow" />
							</div>
						)
					}
				</Container>
				<Footer />
			</div>
		</div>
	)
}

export default Leaderboard