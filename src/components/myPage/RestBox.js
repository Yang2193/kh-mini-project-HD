import React, { useEffect, useState } from "react";
import restSampleImg from "../../images/restSample.jpg"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
const RsetBlock = styled.div`
      
    
    .container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;  
        .box{
        width: 200px;
        height: 250px;
        background-size: cover;
        margin: 0 auto;
        margin-bottom: 30px;
        border-radius: 2rem;
        color : white;
        font-size: 2rem;
        cursor: pointer;
        p{
            text-align: center;
            display: none;
        }
        .ratingBox{
           display: none;
        }

        &:hover{

            .hoverBox{
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: inherit;
                border-radius: inherit;
                background-color: rgb(0,0,0,0.3);
            }
           p{
            display: block;
            font-weight: bold;
           }
           .ratingBox{
            display: block;
            display: flex;
            flex-direction:row;
            justify-content: center;
           }
           
           
        
        }
         
    }  
    }
    button{
        background-color: rgb(0,0,0,0);
        border : none;
        text-align: center;
        width: 100%;
        cursor: pointer;

    }
    
   
   
    
`;
const RestBox = ({value}) => {
// 페이지 이동
const nav = useNavigate();
const movePage=(restId)=>{
    localStorage.setItem("restId",restId);
    nav("/Info");
}
    const [visibleLike, setVisibleLike] = useState([]); // 화면에 보이는 찜한 데이터
	const [count, setCount] = useState(3); // 기본 개수
    // onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    const [height, setHeight] = useState('');

    // 화면에 나올 리뷰 수 관리
    useEffect(() => {
        setVisibleLike(value.slice(0, count));
    }, [value, count]);
    // onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    function handleLoadMore() {
        setCount(count + 3);  // 개수 추가
        setHeight(height + 250); // 높이를 250 증가시킴
    }

    return(
        <RsetBlock >
        <div className="container" style={{height: height}}>
        {visibleLike && visibleLike.map(rest=>(
            <div onClick={()=>movePage(rest.restId)}  key={rest.restId} className="box" style={{backgroundImage: `url(${restSampleImg})`}}>
            <div className="hoverBox">
            <p>{rest.restName}</p> 
            <span className="ratingBox">
              <StarRatings rating={rest.restRating}
                starDimension="30px"
                starSpacing="4px"
                starRatedColor="yellow"/>
            </span>
            <p>{rest.restRating}</p> 
            </div>
            </div>
        ))}
        </div>
         {visibleLike.length ===value.length ? <></>  : <button onClick={handleLoadMore}>▼ 더보기</button>}
        </RsetBlock>
    );
}

export default RestBox;