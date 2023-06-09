import React, { useRef, useState, useEffect } from "react";
import styled, {css} from "styled-components";
import MenuImg from "../../images/pngwing.com-removebg-preview.png";
import { FiMenu } from 'react-icons/fi';
import { useNavigate  } from "react-router-dom";
import MessageModal from "../../utils/MessageModal";
const MenuButton = styled.div`
  height  : 100px;
  width : 100px;
  position: absolute;
  border-radius : 20px;
  right: 0px;
  top: 0px;
  cursor: pointer;
`;

const StyledFaBars = styled(FiMenu)`
    color: coral;
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    height  : 60px;
    width : 60px;
    padding: 10px;
    
    &:hover {
      color: lightsalmon;
    }

`;

const Box = styled.div`
    display: none;
    height: 630px;
    width: 260px;
    background-color: coral;
    border-radius: 20px;
    position: absolute;
    top: 0px;
    left: -160px;
    z-index: 1;

    ${({ isOpen }) =>
    isOpen &&
    css`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: center;
     
      .header{
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        color: white;

      }


    
    .box{
        width: 260px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: center;


    }

      .item{
        height: 80px;
        width: 200px;
        color: white;
        border-top: 1px solid ivory;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
            font-weight: bold;
        }
      }

     
    `}

   
`;

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBizMem, setIsBizMem] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();
    const userId = window.localStorage.getItem("userId");
    const memberType = window.localStorage.getItem("memberType");

    //팝업창
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {   

        
        const clickOutside = (event) =>{
            if(ref.current && !ref.current.contains(event.target)){
                setIsOpen(false);
            }
        };

        document.addEventListener("click", clickOutside);
        return () => {
            document.removeEventListener("click", clickOutside);
        };
      
    },[ref]);

    //모달창 닫기
    const onClickClose = () => {
        setModalOpen(false);
    }

    
    const onClickMenu = () => {
        setIsOpen(!isOpen);
    }

    const onClickBox = (event) => {
        event.stopPropagation();
    };

    const handleLinkClick = (path,category) => {
        const queryParams = new URLSearchParams();
        if(category) queryParams.set("category", category);
        navigate({ pathname: path, search: queryParams.toString() }); 
        setIsOpen(false);
      };

    const logout = () =>{
        window.localStorage.setItem("userId", '');
        window.localStorage.setItem("memberType", '');
        console.log(isBizMem);
        navigate("/");
        setIsOpen(!isOpen);
        setModalOpen("logout");
    }
    

    return(
        <MenuButton  onClick={onClickMenu} ref={ref}>
            <StyledFaBars/>
                <Box isOpen={isOpen} >
                   <div className="header">메뉴</div>
                    {memberType==="biz" ? 
                            <div className="box" onClick={onClickBox}>
                            {userId ?
                                <div className="item" onClick={logout}>로그아웃</div>
                            :   <div className="item" onClick={()=> handleLinkClick("/Login")}>로그인/회원가입</div>
                            }
                            <div className="item" onClick={()=> handleLinkClick("/BusinessPage","menu1")}>매장 등록</div>
                            <div className="item" onClick={()=> handleLinkClick("/BusinessPage","menu2")}>고객 1:1 문의</div>
                            <div className="item" onClick={()=> handleLinkClick("/BusinessPage","menu3")}>예약 현황</div>
                            <div className="item" onClick={()=> handleLinkClick("/BusinessPage","menu4")}>메뉴 추가</div>
                            </div>
                    :  <div className="box" onClick={onClickBox}>
                            {userId ?
                                <div className="item" onClick={logout}>로그아웃</div>
                            :   <div className="item" onClick={()=> handleLinkClick("/Login")}>로그인/회원가입</div>
                            }
    
                            <div className="item" onClick={()=> handleLinkClick(!userId ? setModalOpen("login") : "/MyPage")}>마이 페이지</div>
                            <div className="item" onClick={()=> handleLinkClick(!userId ? setModalOpen("login") :"/MyPage","menu1")}>내 정보/수정</div>
                            <div className="item" onClick={()=> handleLinkClick(!userId ? setModalOpen("login") :"/MyPage","menu3")}>찜한 가게</div>
                            <div className="item" onClick={()=> handleLinkClick(!userId ? setModalOpen("login") :"/MyPage","menu4")}>1:1 문의 내역</div>
                            <div className="item" onClick={()=> handleLinkClick(!userId ? setModalOpen("login") :"/MyPage","menu5")}>예약 현황</div>
                    </div>}
                </Box>
                <MessageModal open={modalOpen==="login"} close={()=>navigate('/Login')} header="로그인">로그인이 필요한 페이지입니다.</MessageModal>
                <MessageModal open={modalOpen==="logout"} close={onClickClose} confirm={onClickClose} header="로그아웃">로그아웃 하셨습니다.</MessageModal>
        </MenuButton>
        
    );
}

export default SideMenu;