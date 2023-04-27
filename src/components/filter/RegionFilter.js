import React, { useEffect, useState } from "react";
import styled from "styled-components";

const regionList = ["서울", "경기", "인천", "대전", "세종", "충북", "충남", "광주", "전북", "전남", "대구", "경북", "부산", "울산", "경남", "강원", "제주"];
const cityList = {
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
};

const FilterStyle = styled.div`
    width: 100%;
    height : 400px;
    display:flex;
    flex-direction: column;

    p{
        text-align: center;
    }

    .flex-box{
        display:flex;
        flex-direction: row;
        width: 100%;
        height : 360px;
    }

`;

const RegionBox = styled.div`
    width: 40%;
    height: 360px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid coral;
    border-radius: 20px;
    overflow: auto;
    
    justify-content: center;
    align-content: space-between;

    ul{
        list-style: none;
    }

    input{ display: none;
    }


`;

const Label = styled.label`
    background-color: ${({ checked }) => (checked ? 'coral' : 'ivory')};
        color : ${({ checked }) => (checked ? 'white' : 'black')};
        width : 70px;
        height : 30px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        border: 1px solid coral;
        cursor: pointer;

`;

const CityBox = styled.div`
    width: 60%;
    height: 360px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid coral;
    border-radius: 20px;
    overflow: auto;
    margin-left: 10px;
`;

const RegionFilter = () => {

    const [address, setAddress] = useState([]);
    const [region, setRegion] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [checkedRegions, setCheckedRegions] = useState([]);
    const [checkedCities, setCheckedCities] = useState([]);
    
    
    const onCheckRegion = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value);
        console.log(checked);
        if (checked) {
            setRegion(value);
          } 
        }

    
    
        const onCheckCity = (e) => {
            const value = e.target.value;
            const checked = e.target.checked;
            console.log(value);
            console.log(checked);
    
    
    
            if (checked) {
                setCheckedCities([...checkedCities, value]);
              } else {
                setCheckedCities(checkedCities.filter((city) => city !== value));
              }
              
              console.log(checkedCities);
            }
        

    const regionMap = regionList.map((region1) => (
        <Label key={region1} checked={region === region1}>
            <input type="radio" name="region" value={region1}  onChange={onCheckRegion}/>
            {region1}
        </Label>
      ));

      const test = () => {
        console.log(cityList[region]);

    }

    const CityMap = () => {
        const cities = cityList[region];
        console.log(cityList[region]);

        return(
            <>
                {cities && cities.map((city) => (
                    <Label>
                        {city}
                    </Label>
                ))}
            </>
        );
    };
   




    

    return(
        <FilterStyle>
            <p onClick={test}>지역</p>
            <div className="flex-box">
                <RegionBox>
                    {regionMap}
                </RegionBox>
                <CityBox>
                    <CityMap/>
                </CityBox>
            </div>
        </FilterStyle>
    );

}

export default RegionFilter;