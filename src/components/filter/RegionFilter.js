import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserInfo";

const regionList = ["서울", "경기", "인천", "대전", "세종", "충북", "충남", "광주", "전북", "전남", "대구", "경북", "부산", "울산", "경남", "강원", "제주"];
const cityList = {
    "서울" : ["강남구", "강북구", "강동구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "종로구", "중구", "중랑구"],
    "경기" : ["가평군", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시 분당구", "성남시 수정구", "성남시 중원구", "수원시 권선구", "수원시 장안구", "수원시 팔달구", "수원시 영통구", "시흥시", "안산시 단원구", "안산시 상록구", "안성시", "안양시 동안구", "안양시 만안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시 기흥구", "용인시 수지구", "용인시 처인구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시" ],
    "인천" : ["강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "옹진군", "중구"], 
    "대전" : ["대덕구", "동구", "서구", "유성구", "중구" ], 
    "세종" : ["세종특별자치시"], 
    "충북" : ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "진천군", "청주시 청원구", "청주시 상당구", "청주시 서원구", "청주시 흥덕구", "충주시", "증평군"], 
    "충남" : ["공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시 동남구", "천안시 서북구", "청양군", "태안군", "홍성군", "계룡시"],
    "광주" : ["광산구", "남구", "동구", "북구", "서구"], 
    "전북" : ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시 덕진구", "전주시 완산구", "정읍시", "진안군"], 
    "전남" : ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"], 
    "대구" : ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"], 
    "경북" : ["경산시", "경주시", "고령군", "구미시", "군위군", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시 남구", "포항시 북구"], 
    "부산" : ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"], 
    "울산" : ["남구", "동구", "북구", "울주군", "중구"], 
    "경남" : ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시 마산합포구", "창원시 마산회원구", "창원시 성산구", "창원시 의창구", "창원시 진해구", "통영시", "하동군", "함안군", "함양군", "합천군"], 
    "강원" : ["강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"], 
    "제주" : ["서귀포시", "제주시"]
};

const FilterStyle = styled.div`
    width: 100%;
    height : 360px;
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

    .small {
        font-size: 12px;
    }

`;

const RegionBox = styled.div`
    width: 40%;
    height: 280px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid coral;
    border-radius: 20px;
    overflow: auto;
    
    justify-content: flex-start;
    align-content: flex-start;

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

const LabelCity = styled.label`
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
`;

const CityBox = styled.div`
    width: 60%;
    height: 280px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid coral;
    border-radius: 20px;
    overflow: auto;
    margin-left: 10px;
    justify-content: flex-start;
    align-content: flex-start;

    input{ display: none;
    }

`;

const RegionFilter = () => {

    //contextAPI에 값을 저장
    const context = useContext(UserContext);
    const {address, setAddress, region, setRegion, checkedCities, setCheckedCities} = context;
    
    // const [region, setRegion] = useState("");
    // const [checkedCities, setCheckedCities] = useState([]);

    const changeRegionName = (e) => {
        if(e === "서울") return "서울특별시";
        else if(e === "경기") return "경기도";
        else if(e === "인천") return "인천광역시";
        else if(e === "대전") return "대전광역시";
        else if(e === "세종") return "세종특별자치시";
        else if(e === "충북") return "충청북도";
        else if(e === "충남") return "충청남도";
        else if(e === "광주") return "광주광역시";
        else if(e === "전북") return "전라북도";
        else if(e === "전남") return "전라남도";
        else if(e === "대구") return "대구광역시";
        else if(e === "경북") return "경상북도";
        else if(e === "부산") return "부산광역시";
        else if(e === "울산") return "울산광역시";
        else if(e === "경남") return "경상남도";
        else if(e === "강원") return "강원도";
        else if(e === "제주") return "제주특별자치도";
    }

    const addAddress = (val) => {
        setAddress(prevAddr => ({
            ...prevAddr,
            [region]: [...(prevAddr[region] || []), val]
        }));
    }

    const removeAddress = (obj, val) => {
        // const regionName = changeRegionName(region);
        if(obj[region]){
            obj[region] = obj[region].filter((item) => item !== val);
            if(obj[region].length === 0) {
                delete obj[region];
            }
        }
        
    }
    
    const onCheckRegion = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        if (checked) {
            setRegion(value);
          } 
          console.log(region);
        };

    
    // 지역 클릭 시 체크박스에 체크하고 불 들어오게 함수
    const onCheckCity = (city) => {
             
        const value = city.target.value;
        const checked = city.target.checked;

        console.log(value);
        console.log(checked);

        if (checked) {
            setCheckedCities([...checkedCities, value]);
            addAddress(value);
            
            } else {
            setCheckedCities(checkedCities.filter((city) => city !== value));
            removeAddress(address, value);

            }
            console.log(region);
            console.log(checkedCities); 
        };
    
    

    const regionMap = () => {
        
        return(
        regionList.map((region1) => (
        <Label key={region1} checked={region === region1}>
            <input type="radio" name="region" value={region1}  onChange={onCheckRegion} checked={region === region1}/>
            {region1}
        </Label>
      )));
    };

      const test = () => {
        console.log(cityList[region]);

    }


    const cityMap = () => {
        const cities = cityList[region];
        return(
            <>
                {cities && cities.map((city) => (
                    <LabelCity key={city} isChecked={checkedCities.includes(city)} className={city.length >= 8 ? 'small' : ''}>
                        <input type="checkbox" value={city} onChange={onCheckCity} checked={checkedCities.includes(city)}/>
                        {city}
                    </LabelCity>
                ))}
            </>
        );
    };
 
   
    return(
        <FilterStyle>
            <p onClick={test}>지역</p>
            <div className="flex-box">
                <RegionBox>
                    {regionMap()}
                </RegionBox>
                <CityBox>
                    {cityMap()}
                </CityBox>
            </div>
        </FilterStyle>
    );

}

export default RegionFilter;