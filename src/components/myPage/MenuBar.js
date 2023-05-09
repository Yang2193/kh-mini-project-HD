import React, { useState } from "react";
import styled, {css} from "styled-components";
import {useNavigate } from "react-router-dom";

const categories = [
    {
        name :'menu1',
        text : '내정보 / 수정'
    },
    {
        name :'menu2',
        text : '내가 쓴 리뷰'
    },
    
    {
        name :'menu3',
        text : '찜한 가게'
    },
    
    {
        name :'menu4',
        text : '1:1 문의내역'
    },
    
    {
        name :'menu5',
        text : '예약 현황'
    }
];
const MenuBlock = styled.div`
    background-color: #FBF4EF;
    width : 300px;
    height: auto;
    text-align: center;
    position: relative;
    border-radius: 5px;
    margin-right: 10px;
    .title{
        font-size: 25px;
        font-weight: bold;
        position: relative;
        top: 10px;
        left: 0;
        right: 0;
        margin: auto;
    }
    hr{
        border: 1px solid #FF7F50;
        width: 80%;
        margin-bottom: 2rem;
      
    }
    //로그아웃 버튼
    .btn{
            font: inherit;
            border :none;
            //margin-top: 300px;
            padding: 0;
            cursor: pointer;
            background-color: #FBF4EF;
            //하단에 고정시키기
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            margin: auto;
     } 
  
`;

const Category = styled.div`
    //position: relative;
    //top: 30px;
    cursor: pointer;
    padding-bottom: 2rem;
    text-align: center;
    &:hover {
        color:#FF7F50;
    }
    ${props => 
        props.active && css`
        font-weight: 600;
        color: #FF7F50;
        &:hover {
            color: #FF7F50;
        }
    `}
    & + & {
        margin-bottom: 0.7rem;
    }
    
`;
//마이페이지 카테고리
const MenuBar = ({onSelect,category}) => {
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("userId");
        setUserId(null);
        navigate('/');  
      };

      const handleLinkClick = (path,category) => {
        const queryParams = new URLSearchParams();
        if(category) queryParams.set("category", category);
        navigate({ pathname: path, search: queryParams.toString() }); 
        onSelect(category);
      };


    return(
        <MenuBlock>
            <Category key="nomal" onClick={()=>navigate(0)}>
            <span className="title">마이페이지</span>               
            </Category>
            <hr />
          
        {categories.map(c=>(
            <Category key={c.name} active={category===c.name} onClick={()=>handleLinkClick("/Mypage",c.name)}>
            {c.text}                
            </Category>
        ))}
        {userId ? (
            <button className="btn" onClick={logout}>Logout</button>
                ) : (
            <button className="btn" onClick={()=> {navigate("/Login")}}>Login</button>
         )}
        </MenuBlock>
    );
}

export default MenuBar;