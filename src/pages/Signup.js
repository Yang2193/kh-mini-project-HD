import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import AddressModal from "../utils/AddressModal";
import MessageModal from "../utils/MessageModal";
import ActionButton from "../utils/Button/ActionButton";

const Container = styled.div`
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  background-color: ivory;
  height: 100vh;
  .sign {
    margin-top: 10px;
    font-family: "MalangMalangB";
    font-weight: 600;
    font-size: 80px;
    color :#FF7F50;
    margin-bottom : 20px;

  }
  .box{
    display:flex;
    flex-wrap: wrap;
    flex-direction: column;
    width:500px;
    align-items: center;
    background-color: ivory;
  }

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

  .item5{
    margin: 10px;
    display: flex;
    align-items: center;
    width: 500px;
     & > button {
        width: 120px;
        height: 30px;
        
     }
     & > input {
        margin-right: 10px;
     }
  }

  .item6{
    margin: 10px;
    display: flex;
    justify-content: right;
    width: 500px;
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      margin-right: 40px;
      width: 460px;
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
    font-size: 26px;
    font-weight: bold;
    width: 100%;
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
    font-size: 26px;
    font-weight: bold;
    width: 120px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: coral;
    font-weight: 700;
  }
  .enable-button:active {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 15px;
    font-weight: bold;
    width: 120px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  .disable-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 15px;
    font-weight: bold;
    width: 120px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-weight: 400;
    border-radius: 18px;
    border: coral;
  }

  .prev-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 15px;
    font-weight: bold;
    width: 120px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #FFA07A;
    border-radius: 18px;
    border: coral;
    cursor: pointer;
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
  margin-right: 10px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;


const SignUp = () => {

    const navigate = useNavigate();

    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputConPw, setInputConPw] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputNickname, setInputNickname] = useState("");
    const [inputKey, setInputKey] = useState("");
    const [inputAddress, setInputAddress] = useState("");

    // 이메일 인증 키 코드 
    const [authKey, setAuthKey] = useState("");
    // 오류 메시지
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [mailMessage, setMailMessage] = useState("");
    const [keyMessage, setKeyMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [nicknameMessage, setNicknameMessage] = useState("");
 
     // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isNick, setIsNick] = useState(false);
    const [isKey, setIsKey] = useState(false);
    const [isSend, setIsSend] = useState(false);

    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModelText] = useState("중복된 아이디 입니다.");
    // 주소찾기 팝업 및 조건부 렌더링 용
    const [isOpenPost, setIsOpenPost] = useState(false);

    // 회원가입 시 환영 팝업
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);

    // modal의 close, confirm에 들어갈 함수 -> 엔터와 ESC를 눌렀을 때 서로 다른 동작을 하게 하려면 다른 함수를 넣으면 된다.
    const closeSignUpModal = () => {
        setSignUpModalOpen(false);
        navigate("/login");
    }


  
    const openPost = () => {
        setIsOpenPost(true);
      };
    
    const closePost = () => {
        setIsOpenPost(false);
    }

    const searchAddress = (address) => {
        setInputAddress(address);
    }

 
    const closeModal = () => {
        setModalOpen(false);
        navigate("/login");
    };

  
    const onChangeId = (e) => {
        setInputId(e.target.value)
        if (e.target.value.length < 5 || e.target.value.length > 12) {
            setIdMessage("5자리 이상 12자리 미만으로 입력해 주세요.");
            setIsId(false);    
        } else {
            setIdMessage("올바른 형식 입니다.");
            setIsId(true);
        }
    }

    const onChangePw = (e) => {
        //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value ;
        setInputPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }        
    }
    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputPw) {
            setConPwMessage('비밀 번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setConPwMessage('비밀 번호가 일치 합니다. )')
            setIsConPw(true);
        }      
    }
    const onChangeName = (e) => {
        setInputName(e.target.value);
        setIsName(true);
    }
    const onChangeMail = (e) => {
        // 이메일 정규식 추가
        const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        const email = e.target.value;
        setInputEmail(email);
        setIsSend(false);
        if(emailRegex.test(email)){
            setMailMessage("올바른 형식입니다.")
            setIsMail(true);
        } else{
            setMailMessage("올바른 형식이 아닙니다.")
            setIsMail(false);
        }
        
    }

      // 이메일 인증 체크 함수 
      const onClickEmail = async() => {

        const rsp = await AxiosApi.mailConfirm(inputEmail);
        setAuthKey(rsp.data);
        setMailMessage("이메일로 인증코드가 전송되었습니다.");
        setIsSend(true);
    }

    const onChangeKey = (e) => {
        const key = e.target.value
        setInputKey(key);
        if(authKey === key){
            setIsKey(true);
            setKeyMessage("인증되었습니다.");
        } else {
            setIsKey(false);
            setKeyMessage("잘못된 인증번호입니다.")
        }
    }
    const onChangePhone = (e) => {
        // 전화번호 정규식 추가
        const phoneRegex = /^\+?[0-9]{2,4}-?[0-9]{3,4}-?[0-9]{4}$/;
        const phone = e.target.value;
        setInputPhone(phone);
        if(phoneRegex.test(phone)){
            setIsPhone(true);
            setPhoneMessage("올바른 형식입니다.");
        } else{
            setIsPhone(false);
            setPhoneMessage("올바르지 않은 형식입니다.");
        }
        }

    const onChangeNickname = (e) => {
        setInputNickname(e.target.value);
        setIsNick(true);
    }

    const onChangeAddress = (e) => {
        setInputAddress(e.target.value);
    }
 

    const onClickSignUp = async() => {
        console.log("Click 회원가입");
        // 가입 여부 우선 확인
        const memberCheck = await AxiosApi.memberRegCheck(inputId);
        console.log("가입 가능 여부 확인 : ", memberCheck.data);
        // 가입 여부 확인 후 가입 절차 진행

        if (memberCheck.data === true) {
            console.log("가입된 아이디가 없습니다. 다음 단계 진행 합니다.");
            const memberReg = await AxiosApi.memberReg(inputId, inputPw, inputName, inputEmail, inputPhone, inputNickname, inputAddress);
            console.log(memberReg.data);
            if(memberReg.data === true) {
                setSignUpModalOpen(true);
            } else {
                setModalOpen(true);
                setModelText("회원 가입에 실패 했습니다.");
            }

        } else {
            console.log("이미 가입된 회원 입니다.")
            setModalOpen(true);
            setModelText("이미 가입된 회원 입니다.");
        } 
    }

  
  

    const onClickPrev = () => {
        navigate('/login');
    }

    const onKeyDownSignUp = (e) => {
        if(e.key === 'Enter'){
            onClickSignUp();
          }
    }



    return(
        <Container>   
            <div className="box">
                    <div className="sign">
                        <span>회원가입</span>
                    </div>

                    <div className="item2">
                        <Input placeholder="아이디" value ={inputId} onChange={onChangeId}/>
                    </div>
                    <div className="hint">
                            {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
                    </div>
                    <div className="item2">
                        <Input type="password" placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
                    </div>
                    <div className="hint">
                            {inputPw.length > 0 && (
                            <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
                    </div>
                    <div className="item2">
                        <Input type="password" placeholder="패스워드 확인" value ={inputConPw} onChange={onChangeConPw}/>
                    </div>
                    <div className="hint">
                            {inputConPw.length > 0 && (
                            <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
                    </div>
                    <div className="item2">
                        <Input type="text" placeholder="이름" value ={inputName} onChange={onChangeName}/>
                    </div>
                    <div className="item5">
                        <Input type="email" placeholder="이메일" value ={inputEmail} onChange={onChangeMail}/>
                        <ActionButton onClick={onClickEmail}>이메일 인증</ActionButton>
                    </div>
                    <div className="hint">
                        {(inputEmail.length > 0 && !isSend) && (
                            <span className={`message ${isMail ? 'success' : 'error'}`}>{mailMessage}</span>
                        )}
                        {isSend && <span className="success">{mailMessage}</span>}    
                    </div>
                    <div className="item6">
                        <Input className="input2" type="text" placeholder="인증코드를 입력하세요" onChange={onChangeKey}/>
                    </div>
                    <div className="hint">
                        {inputKey.length > 0 && (
                                <span className={`message ${isKey ? 'success' : 'error'}`}>{keyMessage}</span>
                        )}
                    </div>
                    <div className="item2">
                        <Input type="text" placeholder="전화번호 '-' 포함해서 입력해주세요." value={inputPhone} onChange={onChangePhone}/>
                    </div>
                    <div className="hint">
                        {inputPhone.length > 0 && (
                                <span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>
                        )}
                    </div>
                    <div className="item2">
                        <Input type="text" placeholder="닉네임" value={inputNickname} onChange={onChangeNickname} onKeyDown={onKeyDownSignUp} />
                    </div>
                    <div className="item5">
                        <Input type="text" placeholder="주소" value={inputAddress} onChange={onChangeAddress} onKeyDown={onKeyDownSignUp} />
                        <ActionButton onClick={openPost}>주소찾기</ActionButton>
                        {isOpenPost && <AddressModal open={isOpenPost} onClose={closePost} searchAddress={searchAddress}/>}
                    </div>
                
                    <div className="btnBox">
                        {(isId && isPw && isConPw && isName && isMail && isPhone && isNick && isKey) ? 
                        <input type="button" className="enable-button" onClick={onClickSignUp} onKeyDown={onKeyDownSignUp} value="회원가입"/> :
                        <button className="disable-button">회원가입</button>}
                        <Modal open={modalOpen} close={closeModal} header="오류">{modalText}</Modal>
                        <MessageModal open={signUpModalOpen} confirm={closeSignUpModal} close={closeSignUpModal} header="회원가입">회원가입을 환영합니다!</MessageModal>
                        <button className="prev-button" onClick={onClickPrev}>이전으로</button>
                    </div>
                </div>
            
        </Container>
    );
};
export default SignUp;