import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import RestaurantList from './page/RestaurantList';
import ReviewList from './page/ReviewList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserStore from './components/context/UserInfo';
import MemberProvider from './context/MemberContext';
import Login from './page/Login';
import Mypage from './page/Mypage';
function App() {
  return (
    <UserStore>
      <MemberProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/RestaurantList" element={<RestaurantList/>}/> */}
          <Route path="/ReviewList" element={<ReviewList/>}/>
          <Route path='/Login' element={<Login/>}/>
        <Route path='/Mypage' element={<Mypage/>}/>
        </Routes>
      </Router>
      </MemberProvider>
    </UserStore>
  );
}

export default App;
