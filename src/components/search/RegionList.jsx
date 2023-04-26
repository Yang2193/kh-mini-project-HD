import { useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";

const ListBox = styled.div`
    display: none;

    ${({isAppear}) =>
    isAppear &&
    css`
        display: flex;
        width: 300px;
        height: 300px;
        
    `}

`;


const RegionList = ({region, isAppear}) => {
    const regionList = {
        "서울" : ["강남구", "강북구", "강동구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "종로구", "중구", "중랑구"],
        "경기" : ["가평군", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시 분당구", "성남시 수정구", "성남시 중원구", "수원시 권선구", "수원시 장안구", "수원시 팔달구", "수원시 영통구", "시흥시", "안산시 단원구", "안산시 상록구", "안성시", "안양시 동안구", "안양시 만안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시 기흥구", "용인시 수지구", "용인시 처인구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시" ],
        "인천" : [], 
        "대전" : [], 
        "세종" : [], 
        "충북" : [], 
        "충남" : [],
        "광주" : [], 
        "전북" : [], 
        "전남" : [], 
        "대구" : [], 
        "경북" : [], 
        "부산" : [], 
        "울산" : [], 
        "경남" : [], 
        "강원" : [], 
        "제주" : []
    }

    const filteredRegionList = regionList[region];
   
 

    return(
        <ListBox isAppear={isAppear}>
            {regionList[region]?.map((item) => (
                <label key={item}>
                <input type="checkbox"
                value={item}/>
                {item}
                </label>
            ))}
        </ListBox>
    );
    
}

export default RegionList;