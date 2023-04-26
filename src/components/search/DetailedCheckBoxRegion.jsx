import { useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";
import RegionList from "./RegionList";

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

    const regionArr = ["서울", "경기", "인천", "대전", "세종", "충북", "충남", "광주", "전북", "전남", "대구", "경북", "부산", "울산", "경남", "강원", "제주"];

    const [region, setRegion] = useState("");
    const [isAppear, setIsAppear] = useState(false);

    const onClickRegion = (e) => {
        const target = e.target;
        if(target.checked){
            setRegion(target.value);
            console.log(target.value);
            setIsAppear(!isAppear);
        } else{
            setRegion("");
            console.log("해제");
            setIsAppear(!isAppear);
        }
    }

    const check = () => {
        console.log(region);
    }
    
    const regionMap = regionArr.map((region) => (
        <label key={region}>
            <input type="checkbox"
            value={region}
            onChange={onClickRegion}/>
            {region}
        </label>
      )
    );

    return (
        <Box isOpen={isOpen}>
            <div className="title" onClick={check}>지역</div>
            <div className="checkBox">
              {regionArr.map((region) => (
                <label key={region}>
                    <input type="checkbox"
                    value={region}
                    onChange={onClickRegion}/>
                    {region}
                    <RegionList region={region} isAppear={isAppear}/>
                </label>
              ))}
            </div>
        </Box>
    );
}

export default BoxRegion;