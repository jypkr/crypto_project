import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Auth from './Pages/Auth'
import Register from './Pages/Register'
import Home from './Pages/Home'
// import Header from './components/Header'
import Footer from './components/Footer'
import History from './Pages/History'
// import Crypto from './Pages/Crypto'
import Leaderboard from './Pages/Leaderboard';
import AboutUs from './Pages/AboutUs';
import Ingame_weekNumber from './components/Ingame_weekNumber'
import CoinSummaryPage from './Pages/CoinSummary/CoinSummaryPage'
import CoinDetailPage from './Pages/CoinDetails/CoinDetailPage'
import { WatchListContextProvider } from './context/WatchListContext'
import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo'


import Practice from './Pages/Practice'

function App() {
  console.log(`The week number of the current date (${Ingame_weekNumber().currentdate}) is ${Ingame_weekNumber().ingame_weeknumber}.`)

  return (
    <WatchListContextProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              {/* <Header /> */}
              <BackgroundVideo />
              <Home />
            </Route>
            <Route path='/register'>
              <BackgroundVideo />
              <Register />
            </Route>
            <Route path='/signIn'>
              <BackgroundVideo />
              <Auth />
            </Route>
            {/* <Route path='/Crypto'>
            <Crypto />
          </Route> */}
            <Route path='/history'>
              <BackgroundVideo />
              <History />
            </Route>
            <Route path='/Leaderboard'>
              <BackgroundVideo />
              <Leaderboard />
            </Route>
            <Route path='/AboutUs'>
              <BackgroundVideo />
              <AboutUs />
            </Route>
            <Route path='/practice'>
              <BackgroundVideo />
              <Practice />
            </Route>
            <Route path='/CoinSummaryPage'>
              <CoinSummaryPage />
            </Route>
            <Route path='/CoinDetailPage'>
              <CoinDetailPage />
            </Route>
            <Route>
              
            </Route>


          </Switch>
        </div>
      </Router>
    </WatchListContextProvider>
  );
}

export default App;
