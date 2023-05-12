import React,{ useState, useContext} from "react";
import Modal from "./Modal";
import styled from "styled-components";
import { MemberContext } from "../context/MemberContext";
const Container = styled.div`
text-align: center;
border: 2px solid gray;
border-radius: 20px;
margin : 20px auto;
padding: 20px;
max-width: 400px;
display: flex;
flex-direction: column;
align-items: center;
.pwdTitle {
    font-size: 40px;
    font-family: inherit;
    font-weight : bold;
}
.content{
    color: blue;
}
  .enable-button {
    margin : 0 auto;
    font-size: 26px;
    font-weight: bold;
    width: 150px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #FF7F50;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
    cursor: pointer;
  }
  & > * {
    margin: 10px;
  }
 
`;

const Input = styled.input`
  margin : 0 auto;
  margin-bottom: 20px;
  width: 70%; 
  height: auto;
  line-height : normal;
  padding: .8em .5em; 
  font-family: inherit; 
  border: 1px solid #999;
  border-radius: 18px;
  outline-style: none; 
`;
const Password = ({children , type , setIsPwd, memberDelete}) => { 
    //키보드입력
    const [inputPw, setInputPw] = useState("");
    const [inputConPw, setInputConPw] = useState("");
    //오류메세지
    const [pwMessage, setPwMessage] = useState(false);

    const {memberValue} =useContext(MemberContext);
     //팝업 처리
     const [modalOpen, setModalOpen] = useState(false);
     const closeModal = () => {
         setModalOpen(false);
     };

    const onChangePw = (e) => {
        setInputPw(e.target.value);
    }
    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent);
        if (passwordCurrent !== inputPw) {
            setPwMessage(false);
            
        } else {
            setPwMessage(true)
        }      
    }
   
    const isPwd = () => {
        //로그인 되어있는 아이디의 비번과 일치하는지 체크
      if(type==="pwd" && memberValue.pwd === inputPw) setIsPwd(true);
      else if (type ==="del" && pwMessage && memberValue.pwd === inputPw) memberDelete();
      else setModalOpen(true);
    }


    return(
        <Container>
            <div className="pwdTitle">비밀번호 입력</div>
            <div className="content">{children}</div>
            <Input type="password" placeholder="패스워드" value={inputPw} onChange={onChangePw}/>
            {type ==="del" &&<Input type="password" placeholder="패스워드 재입력"  value ={inputConPw} onChange={onChangeConPw} />}
            <button className="enable-button" onClick={isPwd}>확인</button> 
            <Modal open={modalOpen} close={closeModal} header="오류" type="ok">{type ==="del" && inputConPw===""? "패스워드를 한번 더 입력 해주세요" :"패스워드를 잘못 입력 하셨습니다."}</Modal>   
        </Container>
    );
}

export default Password;