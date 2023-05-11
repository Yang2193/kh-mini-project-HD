import React, {useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from "../images/logo-removebg-preview.png";
import AxiosApi from "../api/AxiosApi";
import Modal from '../utils/Modal';
import styled from "styled-components";

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
    background-color: orange;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
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
    background-color: lightsalmon;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
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

  .prev-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: orange;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
    cursor: pointer;
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




const IdPwFind = () => {
    const navigate = useNavigate();

    const Login = () => {
        navigate("/Login");
    }

    // ID/PW 찾기 선택
    const [findType, setFindType] = useState("ID찾기");

    //회원가입된 ID가 없을 시 출력할 문구
    const [checkId, setCheckId] = useState(true);

    //ID 혹은 PW 찾기 성공 시 문구를 출력하기 위한 useState
    const [isSuccess, setIsSuccess] = useState(false);
    
    // 키보드 입력 받기
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputMail, setInputMail] = useState("");
    



    // 오류메시지
    const [PwMessage, setPwMessage] = useState("");
    const [MailMessage, setMailMessage] = useState("");


    // 유효성 검사
    const [isPw, setIsPw] = useState("");
    const [isMail, setIsMail] = useState("");


    //ID입력
    const onChangeId = (e) => {
        setInputId(e.target.value);
    }


    // 이메일
    const onChangeMail = e => {
        setInputMail(e.target.value);
        setIsMail(true);
    }

    const onChangeFindType = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value);
        if(checked) setFindType(value);
    }


    const onClickFindId = async() => {

        // 로그인을 위해 axios 호출
        const response = await AxiosApi.findIdStep1(inputMail);
        console.log(response.data);
        if(response.data === true) {
            setCheckId(true);
            const rsp = await AxiosApi.findIdStep2(inputMail);
            if(rsp.data === true){
                setIsSuccess(true);
            }
            
        } else {
            setCheckId(false);
        }
    }

    const onClickPrev = () => {
        navigate('/login');
    }

    return (
        <Container>
            <div className="logo">
                <img src={imgLogo} alt="로고" onClick={()=>navigate("/")}/>
            </div>
            <div className='item4'>
                <Label isChecked={"ID찾기"===findType}>
                    <input type="radio" name='memberType' value={"ID찾기"} onChange={onChangeFindType} checked={"ID찾기"===findType}/>ID찾기
                </Label>
                <Label isChecked={"PW찾기"===findType}>
                    <input type="radio" name='memberType' value={"PW찾기"} onChange={onChangeFindType} checked={"PW찾기"===findType}/>PW찾기
                </Label>
             </div>
            {findType==="ID찾기" ?
                <>
                    <div className='item2'>
                        <p>가입하실 때 입력하신 이메일 주소를 입력해주세요.</p>
                    </div>
                    <div className="item2">
                        <Input placeholder="이메일" value ={inputMail} onChange={onChangeMail} />
                    </div>
                
                    {checkId===false && <p>가입되지 않은 이메일입니다.</p>}
                    {isSuccess===true && <p>입력하신 이메일로 ID를 보냈습니다.</p>}
                    <div className="item2">
                        {(isMail) ?
                        <button className="enable-button" onClick={onClickFindId}>ID찾기</button> :
                        <button className="disable-button" >ID찾기</button>}
                    </div>
                </>
            :
                <>
                    <div className='item2'>
                        <p>가입하실 때 입력하신 ID와 이메일 주소를 입력해주세요.</p>
                    </div>
                    <div className="item2">
                        <Input placeholder="이름" value ={inputId} onChange={onChangeId}/>
                    </div>
                    <div className="item2">
                        <Input placeholder="이메일" value ={inputMail} onChange={onChangeMail} />
                    </div>
                    <div className="hint">
                        {inputMail.length > 0 && (
                        <span className={`${isMail ? "success" : "error"}`}>{MailMessage}</span>)}
                    </div>
                    <div className="item2">
                        {(isMail) ?
                        <button className="enable-button" >PW찾기</button> :
                        <button className="disable-button" >PW찾기</button>}
                    </div>
                </>
            }
            <div className="item2">
                <button className="prev-button" onClick={onClickPrev}>PREV</button>
            </div>
        </Container>
    );
}
export default IdPwFind;