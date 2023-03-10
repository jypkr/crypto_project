import Navbar from '../../components/NavBar'
import './Practice.css'
import Footer2 from '../../components/Footer2'
import LimitBox from '../../components/LimitBox'

const Practice = () => {
	if (!localStorage.getItem('token')) {
		window.location = '/signin'
	}
	return (
		<div className="homePg">
			<Navbar />
			<div className="pgContent">
				<LimitBox />
				<Footer2 />
			</div>
		</div>
	)
}

export default Practice