import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom/dist";
import { useContext } from "react";
import { ReviewIdContext } from "../../context/RestaurantId";
import StarRatings from "react-star-ratings";
const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    height: 360px;
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    font-family: "MalangMalangB";

`;

const Box = styled.div`
  width: 70%;
  height: 300px;
  text-align: center;
`;

const StyledSlider = styled(Slider)`


  .slick-slide {
    display: flex;
    justify-content: center;

  }

  .slick-slide div{
    width : 240px;
    height: 240px;
    margin: 10px;
    background: none;
    color: white;
    display: flex !important;
    //flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-radius: 18px;
  
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 18px;

    }
    .slide-content {
      margin: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      text-align: center;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column  ;
      flex-wrap: wrap;

    }
    .ratingBox{
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      
    }


  }

  
  .slick-list {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

/* Slick 라이브러리 버튼 CSS */
  .slick-prev:before,
  .slick-next:before {
    color: coral;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    font-size: 30px;
    
  }

  .slick-prev {
    left: 0;
    z-index: 1;
    position: absolute;
  }

  .slick-next {
    right: 0;
    z-index: 1;
    position: absolute;
  }

  .slick-dots {

    button::before{
        color: coral;
      }
      .slick-active{

        button::before{
          color: coral;
        }
       }
  }

  
  @media screen and (min-width: 1920px) and (min-height: 1080px) {
  .slick-slide div {
    width: 320px;
    height: 320px;
    }
  }
`;




const RestListCarousel = ({handleType, handleFilter, carouselRestList }) => {
// 페이지이동
  const nav=useNavigate();
  const movePage = (restId) => {
    localStorage.setItem("restId", restId);
    nav("/info");
  };
  const {setReviewId} = useContext(ReviewIdContext)

  const movePageReview = (reviewId) => {
    setReviewId(reviewId);
    nav("/Detail");
  };
  //슬라이드에 따라서 출력 문구 설정
  const [title, setTitle] = useState("어디가 제일 인기 있을까?");

  // 매장목록 세팅을 위한 useState

  const [restList, setRestList] = useState(null);

  //slick 라이브러리 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    beforeChange: (currentSlide, nextSlide) => {
      if (nextSlide === 0) {
        setTitle("어디가 제일 인기 있을까?");
      } else if (nextSlide === 3) {
        setTitle("무슨 매장인지 궁금하다면, 클릭!");
      } else {
        setTitle("클릭하시면 인기매장 목록으로 이동합니다!");
      }
    }
  };

  useEffect(() => {
    setRestList(carouselRestList);
  }, [carouselRestList]);


  const onClickCarousel = () => {
    handleType("List");
  }


    return (
      <Container>
        
        <Box >
            <div>
            <h2>{title} </h2>
            <StyledSlider {...settings} >
              {restList && restList.map(e => (
                <div key={e.restId} onClick={onClickCarousel}>
                  <div className="slide-content">
                    <h2>{e.restName}({e.category})</h2>
                    <span>평점 : {e.rating}</span>
                    <p className="ratingBox">
                    <StarRatings rating={e.rating}
                              starDimension="20px"
                              starSpacing="2px"
                              starRatedColor="gold"/>
                    </p>
                  </div>
                  <img src={e.imageUrl} alt="restaurant-img"/>
                
                </div>
                
              ))}
            </StyledSlider>
            </div>
        </Box>
      </Container>
    );
}

export default RestListCarousel;