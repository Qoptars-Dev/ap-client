import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import DetailsPage from './components/Details/Details.jsx';
import Footer from './components/Footer/Footer.jsx';
import { GlobalStateProvider } from './context/GlobalStateProvider.jsx'; // Import your provider


const App = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <div className='w-screen h-screen'>
          <Routes>
            {/* Define the default route for Dashboard */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Define the route for the DetailsPage */}
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
