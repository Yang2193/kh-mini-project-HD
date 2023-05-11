import './App.css';
import Home from './pages/Home';
import ReviewList from './pages/ReviewList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserStore from './context/UserInfo';
import MemberProvider from './context/MemberContext';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Signup from './pages/Signup';
import Info from './pages/RestaurantInfo';
import RestaurantProvider from './context/RestaurantId';
import Reservation from './pages/Reservation';
import ReviewDetail from './pages/ReviewDetail';
import IdPwFind from './pages/IdPwFind';
import BizSignUp from './pages/BizSignup';
function App() {
  return (
    <UserStore>
      <RestaurantProvider>
        <MemberProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/ReviewList" element={<ReviewList/>}/>
              <Route path='/Login' element={<Login/>}/>
              <Route path="/Info" element={<Info/>} />
              <Route path='/Mypage' element={<Mypage/>}/>
              <Route path='/Reservation' element={<Reservation/>}/>
              <Route path="/Detail" element={<ReviewDetail/>}/>
              <Route path='/IdPwFind' element={<IdPwFind/>}/>
              <Route path="/info" element={<Info/>} />
              <Route path='/Mypage' element={<Mypage/>}/>
              <Route path='/Signup' element={<Signup/>}/>
              <Route path='/BizSignup' element={<BizSignUp/>}/>

            </Routes>
          </Router>
        </MemberProvider>
      </RestaurantProvider>
    </UserStore>
  );
}

export default App;
