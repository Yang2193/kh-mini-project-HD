import React, { useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import imgLogo from "../images/logo-removebg-preview.png";
import styled from 'styled-components';
import AxiosApi from '../api/AxiosApi';
import Modal from '../utils/Modal';
import MessageModal from '../utils/MessageModal';
import { useEffect } from 'react';
import { RestaurantContext } from "../context/RestaurantContext";
const Label = styled.label`
        background-color: ${({ isChecked }) => (isChecked ? 'coral' : 'ivory')};
        color : ${({ isChecked }) => (isChecked ? 'white' : 'black')};
        width : 120px;
        height : 30px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        border: 1px solid coral;
        cursor: pointer;

        input{
          display: none;
        }
`;

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  background-color: ivory;
  height: 100vh;

  .item1 {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item1 img {
    width: 120px;
    height: 120px;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
    width: 500px;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }

  .item4{
    margin: 10px;
    display: flex;
    width: 500px;
    justify-content: center;
    
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      margin-right: 40px;
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }

  .signup-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
    cursor: pointer;
  }

  .enable-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: coral;
    font-weight: 700;
    cursor: pointer;
  }
  .enable-button:active {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
    cursor: pointer;
  }
  .disable-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
  }

`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;


const Login = ({children}) => {
    const navigate = useNavigate();

    // 일반회원 / 사업자회원 구분
    const [memberType, setMemberType] = useState("일반회원");

    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    // 오류 메시지
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState("");
    const [isPw, setIsPw] = useState("");

    //팝업 처리
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };

    //팝업 처리(로그인 환영)
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    //일반회원 / 사업자회원 체크하는 메소드
    const onChangeMemberType = (e) => {
      const value = e.target.value;
      const checked = e.target.checked;
      console.log(value);
      if(checked) setMemberType(value);
    }
    
    
    // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
    const onChangeId = (e) => {
        const regexId = /^\w{5,20}$/;
        setInputId(e.target.value);
        if(!regexId.test(e.target.value)) {
            setIdMessage("5자리 이상 20자리 미만으로 입력해 주세요.");
            setIsId(false);
        } else {
            setIdMessage("올바른 형식 입니다.");
            setIsId(true);
        }
    }

    const onChangePw = (e) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
      const passwordCurrent = e.target.value;
      setInputPw(passwordCurrent)
      if (!passwordRegex.test(passwordCurrent)) {
          setPwMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
          setIsPw(false)
      } else {
          setPwMessage('안전한 비밀번호에요 : )');
          setIsPw(true);
      }
    }

    //로그인할때 객체 저장 
    //레스토랑 정보
    const {setRestValue} =useContext(RestaurantContext);
    const restaurant = async () => {
      const rsp = await AxiosApi.restSelect(localStorage.getItem("userId"));
      if (rsp.status === 200) setRestValue(rsp.data);

    };


    const onClickLogin = async() => {
      //멤버 타입 여부에 따라서 다른 AxiosAPI 호출

      if(memberType==="일반회원"){
        // 로그인을 위한 axios 호출
        const res = await AxiosApi.memberLogin(inputId, inputPw);
        console.log(res.data);
        if(res.data === true) {
          window.localStorage.setItem("userId",inputId);
          setLoginModalOpen(true);
        } else {
          setModalOpen(true);
        }
      } else {
        // 사업자회원 로그인 쪽 axios 호출, 사업자 로그인쪽 여기다가 만드시면 됩니다.
        const res = await AxiosApi.bizMemberLogin(inputId, inputPw);
        console.log(res.data);
        if(res.data === true) {
          window.localStorage.setItem("userId",inputId);
          restaurant();
          navigate('/BusinessPage');  
        } else {
          setModalOpen(true);
        }
      } 
     
    }

    const onClickSignUp = () => {

      if(memberType==="일반회원") navigate('/signup');
      else navigate('/BizSignUp');
    }

    const onClickConfirm = () => {
      setLoginModalOpen(false);
      navigate('/');
    }

    const onKeyDownLogin = (e) => {
      if(e.key === 'Enter'){
        onClickLogin();
      }
    }

    return(
  
        <Container>
          <div className="item1">
            <img src={imgLogo} alt="Logo" onClick={()=>navigate("/")} />
          </div>

          <div><p>{children}</p></div>
        
          <div className='item4'>
            <Label isChecked={"일반회원"===memberType}>
              <input type="radio" name='memberType' value={"일반회원"} onChange={onChangeMemberType} checked={"일반회원"===memberType}/> 일반회원
            </Label>
            <Label isChecked={"사업자회원"===memberType}>
              <input type="radio" name='memberType' value={"사업자회원"} onChange={onChangeMemberType} checked={"사업자회원"===memberType}/> 사업자회원
            </Label>
          </div>
          <div className="item2">
              <Input placeholder="ID" value ={inputId} onChange={onChangeId}/>
          </div>
        

          <div className="item2">
              <Input placeholder="패스워드" type='password' value ={inputPw} onChange={onChangePw} onKeyDown={onKeyDownLogin}/>
          </div>

    
          <div className="item2">
          {(isId && isPw) ?
            <button className="enable-button" onClick={onClickLogin} >로그인</button>  :
            <button className="disable-button" onClick={onClickLogin} >로그인</button>}
          </div>
          
      
          <div className="item2">
            <button className='signup-button' onClick={onClickSignUp}>회원가입</button>
          </div>
          <div className="item2">
            <button className='signup-button' onClick={()=>navigate("/IdPwFind")}>ID/PW 찾기</button>
          </div>
      
          <Modal open={modalOpen} close={closeModal} header="오류">아이디 및 패스워드를 재확인해 주세요.</Modal>
          <MessageModal open={loginModalOpen} close={onClickConfirm} confirm={onClickConfirm} header="로그인 성공">환영합니다!</MessageModal>
   </Container>
    );
}

export default Login;