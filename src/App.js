import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import RestaurantList from './page/RestaurantList';
import ReviewList from './page/ReviewList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/RestaurantList" element={<RestaurantList/>}/>
        <Route path="/ReviewList" element={<ReviewList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
