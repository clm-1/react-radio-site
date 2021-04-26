import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RadioDataProvider from './contexts/RadioDataContext';
import UserDataProvider from './contexts/UserContext';
import ChannelDetails from './pages/ChannelDetails';
import Home from './pages/Home';
import LoginOrRegister from './pages/LoginOrRegister';
import ProgramDetails from './pages/ProgramDetails';
import ProgramList from './pages/ProgramList';

function App() {
  return (
    <div className="App">
        <Router>
          <UserDataProvider>
          <RadioDataProvider>
            <Navbar />
            <div className="site-container">
              <Route exact path='/' component={Home} />
              {/* <Route exact path='/programs' component={ProgramList} /> */}
              <Route exact path='/channels/:channelId' component={ChannelDetails} />
              <Route exact path='/programs/:programId' component={ProgramDetails} />
              <Route exact path='/login' component={LoginOrRegister} />
            </div>
          </RadioDataProvider>
          </UserDataProvider>
        </Router>
    </div>
  );
}

export default App;
