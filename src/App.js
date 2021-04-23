import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RadioDataProvider from './contexts/RadioDataContext';
import ChannelDetails from './pages/ChannelDetails';
import Home from './pages/Home';
import ProgramList from './pages/ProgramList';

function App() {
  return (
    <div className="App">
        <Router>
          <RadioDataProvider>
            <Navbar />
            <div className="site-container">
              <Route exact path='/' component={Home} />
              <Route exact path='/programs' component={ProgramList} />
              <Route exact path='/channels/:channelId' component={ChannelDetails} />
            </div>
          </RadioDataProvider>
        </Router>
    </div>
  );
}

export default App;
