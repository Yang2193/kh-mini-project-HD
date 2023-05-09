import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import RestaurantList from './page/RestaurantList';
import ReviewList from './page/ReviewList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserStore from './context/UserInfo';
import MemberProvider from './context/MemberContext';
import Login from './page/Login';
import Mypage from './page/Mypage';
import Signup from './page/Signup';
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
          <Route path='/Signup' element={<Signup/>}/>
        </Routes>
      </Router>
      </MemberProvider>
    </UserStore>
  );
}

export default App;
