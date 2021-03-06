import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ScrollOnLoad from './components/ScrollOnLoad';
import RadioDataProvider from './contexts/RadioDataContext';
import UserDataProvider from './contexts/UserContext';
import ChannelDetails from './pages/ChannelDetails';
import Home from './pages/Home';
import LoginOrRegister from './pages/LoginOrRegister';
import ProgramDetails from './pages/ProgramDetails';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
        <Router>
          <RadioDataProvider>
            <UserDataProvider>
              <ScrollOnLoad />
              <Navbar />
              <div className="site-container">
                <Route exact path='/' component={Home} />
                <Route exact path='/channels/:channelId' component={ChannelDetails} />
                <Route exact path='/programs/:programId' component={ProgramDetails} />
                <Route exact path='/user' component={UserPage} />
                <Route exact path='/login' component={LoginOrRegister} />
              </div>
              <ScrollToTop />
              <Footer />
            </UserDataProvider>
          </RadioDataProvider>
        </Router>
    </div>
  );
}

export default App;
