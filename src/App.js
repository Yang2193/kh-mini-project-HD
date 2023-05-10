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
import Info from './page/RestaurantInfo';
import RestaurantProvider from './context/RestaurantId';
function App() {
  return (
    <UserStore>
      <RestaurantProvider>
      <MemberProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/RestaurantList" element={<RestaurantList/>}/> */}
          <Route path="/ReviewList" element={<ReviewList/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path="/info" element={<Info/>} />
          <Route path='/Mypage' element={<Mypage/>}/>
          <Route path='/Signup' element={<Signup/>}/>
        </Routes>
      </Router>
      </MemberProvider>
      </RestaurantProvider>
    </UserStore>
  );
}

export default App;
