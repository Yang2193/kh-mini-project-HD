import React, {useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from "../images/허당Logo(login).png";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import DisableBtn from '../utils/Button/DisableBtn';
import Backbtn from '../utils/Button/BackBtn';
import InputBtn from '../utils/Button/InputBtn';
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
  .title {
    margin-top: 10px;
    font-family: "MalangMalangB";
    font-weight: 600;
    font-size: 50px;
    color :#FF7F50;
    margin-bottom : 20px;

  }
  .logo{
    margin-top: 100px;
    width: 300px;
    height: 300px;
    &> * {
      width: 100%;
    }
  }
  .item1 {
    margin-top: 60px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 1920px) and (min-height: 1080px) {
      margin-top: 100px;
  }

  @media (max-width: 1600px) and (max-height: 900px) {
    margin-top: 20px;
  }
  }
  .item1 img {
  width: 240px; /* 기본 이미지 크기 */
  height: 240px; /* 기본 이미지 크기 */

  @media (min-width: 1920px) and (min-height: 1080px) {
    width: 300px; /* 1920x1080 이상일 때 큰 이미지 크기 */
    height: 300px; /* 1920x1080 이상일 때 큰 이미지 크기 */
  }

  @media (max-width: 1600px) and (max-height: 900px) {
    width: 160px; /* 1600x900 이하일 때 작은 이미지 크기 */
    height: 160px; /* 1600x900 이하일 때 작은 이미지 크기 */
  }
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
  .btnBox{
    width: 100%;
    display: flex;
    flex-direction : row;
    justify-content: center;
    align-items: center;
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
    const [isSuccessPw, setIsSuccessPw] = useState(false);
    
    // 키보드 입력 받기
    const [inputId, setInputId] = useState("");
    const [inputMail, setInputMail] = useState("");
    
    // 오류메시지
    const [checkMessage, setCheckMessage] = useState("");
    const [MailMessage, setMailMessage] = useState("");


    // 유효성 검사
    const [isPw, setIsPw] = useState("");
    const [isMail, setIsMail] = useState("");
    const [isCheck, setIsCheck] = useState("");


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

        // 아이디 존재여부를 확인하기 위해 axios 호출
        const response = await AxiosApi.findIdStep1(inputMail);
        console.log(response.data);
        if(response.data === true) {
            setCheckId(true);
            const rsp = await AxiosApi.findIdStep2(inputMail);
            if(rsp.data === true){
                setIsSuccess(true);
                setCheckMessage("입력하신 이메일로 ID를 보냈습니다.");
                setIsCheck("success");
            }
        } else {
            setCheckId(false);
            setCheckMessage("가입되지 않은 이메일입니다.");
            setIsCheck("error");
        }
    }

    const onClickFindPw = async() => {
      //아이디 존재여부를 확인하기 위해 axios호출
      const response = await AxiosApi.findPwStep1(inputId, inputMail);
      console.log(response.data);
      if(response.data === true){
          setCheckId(true);
          const rsp = await AxiosApi.findPwStep2(inputId, inputMail);
          if(rsp.data === true){
            setIsSuccessPw(true);
            setCheckMessage("입력하신 이메일로 임시 비밀번호를 발급하였습니다.");
            setIsCheck("success");
          }
      } else {
          setCheckId(false);
          setCheckMessage("가입되지 않은 이메일이거나 ID입니다.");
          setIsCheck("error");
      }
    }

    const onClickPrev = () => {
        navigate('/login');
    }

    const handleKeyDownId = (e) =>{
      if(e.keyCode === 13){
        onClickFindId();
      }
    }

    const handleKeyDownPw = (e) => {
      if(e.keyCode === 13){
        onClickFindPw();
      }
    }

    return (
        <Container>
            <div className="item1">
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
                    <div className="title">회원 ID 찾기</div>
                    <div className='item4'>
                        <p>가입하실 때 입력하신 이메일 주소를 입력해주세요.</p>
                    </div>
                    <div className="item2">
                        <Input placeholder="이메일" value ={inputMail} onChange={onChangeMail} onKeyDown={handleKeyDownId} />
                    </div>
                    <div className='hint'>
                      {checkId===false && <span className="error">{checkMessage}</span>}
                      {isSuccess===true && <span className="success">{checkMessage}</span>}
                    </div>
                    
                    <div className="btnBox">
                        {(isMail) ?
                        <InputBtn onClick={onClickFindId} value="ID찾기"/> :
                        <DisableBtn className="disable-button" >ID찾기</DisableBtn>}
                        <Backbtn onClick={onClickPrev}>로그인 화면으로 <br/> 돌아가기</Backbtn>
                    </div>
                </>
            :
                <>
                    <div className="title">회원 PW 찾기</div>
                    <div className='item4'>
                        <p>가입하실 때 입력하신 ID와 이메일 주소를 입력해주세요.</p>
                    </div>
                    <div className="item2">
                        <Input placeholder="ID" value ={inputId} onChange={onChangeId}/>
                    </div>
                    <div className="item2">
                        <Input placeholder="이메일" value ={inputMail} onChange={onChangeMail} onKeyDown={handleKeyDownPw}/>
                    </div>
                    <div className="hint">
                        {checkId===false && <span className='error'>{checkMessage}</span>}
                        {isSuccessPw===true && <span className='success'>{checkMessage}</span>}
                    </div>
                    <div className="hint">
                        {inputMail.length > 0 && (
                        <span className={`${isMail ? "success" : "error"}`}>{MailMessage}</span>)}
                    </div>
                    <div className="btnBox">
                        {(isMail) ?
                        <InputBtn onClick={onClickFindPw} value="PW찾기"/> :
                        <DisableBtn className="disable-button" >PW찾기</DisableBtn>}
                         <Backbtn className="prev-button" onClick={onClickPrev}>로그인 화면으로 <br/> 돌아가기</Backbtn>
                    </div>
                </>
            }
        </Container>
    );
}
export default IdPwFind;