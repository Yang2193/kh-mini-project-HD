import { useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";

// 상세정보 버튼 누를 시 그 박스 내부 지역 컴포넌트

const Box = styled.div`
    display: none;
    width: 20%;
    background-color: ivory;
    height: 80%;
    border-radius: 20px;
    border: 1px solid black;
    position: relative;
    ${({isOpen}) =>
    isOpen &&
    css`
        display: flex;
        flex-direction: column;

    `}

    label{
        color: black;
    }

    .title {
        width: 100%;
        height: 20px;
        color: black;
        display: flex;
        justify-content: center;

    }

    .checkBox{
        width: 100%;
        border-radius: 20px;
        margin-top: 10px;
        height: 90%;

    }

    @media (max-width: 768px){
        width: 300px;
        height: 240px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

`;
// 배열을 이용해서 리스트 나열하기.
// useState에 값을 담아서 서버에 날린 후 전송받기.

const BoxRegion = ({isOpen}) => {


    const [region, setRegion] = useState("");

    const onClickRegion = (e) => {
        const target = e.target;
        if(target.checked){
            setRegion(target.value);
            console.log(target.value);
        } else{
            setRegion("");
            console.log("해제");
        }
    }

    const check = () => {
        console.log(region);
    }
    return (
        <Box isOpen={isOpen}>
            <div className="title" onClick={check}>지역</div>
            <div className="checkBox">
                <input type="checkbox" id="Seoul" name="region" onChange={onClickRegion}/>
                <label htmlFor="Seoul">서울</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">경기</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">인천</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">대전</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">세종</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">충북</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">충남</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">광주</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">전북</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">전남</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">대구</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">경북</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">부산</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">울산</label>
                <input type="checkbox" id="Gyeonggi" name="region" onChange={onClickRegion}/>
                <label htmlFor="Gyeonggi">경남</label>
                <input type="checkbox" id="gangwon" name="region" onChange={onClickRegion}/>
                <label htmlFor="gangwon">강원</label>
                <input type="checkbox" id="jeju" name="region" onChange={onClickRegion}/>
                <label htmlFor="jeju">제주</label>

            </div>
        </Box>
    );
}

export default BoxRegion;