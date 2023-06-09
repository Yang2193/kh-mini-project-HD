import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
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
    margin-bottom: 100px;
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




const HomeCarousel = ({weeklyTop3Rest, monthlyTop3Rest, weeklyTop3Review}) => {
// 페이지이동
  const nav=useNavigate();
  const movePage = (restId,reservation) => {
    localStorage.setItem("restId", restId);
    localStorage.setItem("resPossible",reservation);

    nav("/info");
  };
  const {setReviewId} = useContext(ReviewIdContext)

  const movePageReview = (reviewId,reservation) => {
    setReviewId(reviewId);
    localStorage.setItem("resPossible",reservation);
    console.log(reservation);
    nav("/Detail");
  };
  //슬라이드에 따라서 출력 문구 설정
  const [title, setTitle] = useState("이 주의 인기 매장");

  //TOP3 세팅을 위한 useState
  const [wt3r, setWt3r] = useState(null);
  const [mt3r, setMt3r] = useState(null);
  const [wt3review, setWt3review] = useState(null);

  //slick 라이브러리 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 15000,  
    beforeChange: (currentSlide, nextSlide) => {
      if (nextSlide === 0) {
        setTitle("이 주의 인기 매장");
      } else if (nextSlide === 3) {
        setTitle("이 달의 인기 매장");
      } else {
        setTitle("이 주의 인기 리뷰");
      }
    }
  };

  useEffect(()=>{
    setWt3r(weeklyTop3Rest);
    setMt3r(monthlyTop3Rest);
    setWt3review(weeklyTop3Review);
  },[weeklyTop3Rest, monthlyTop3Rest, weeklyTop3Review]);


    return (
      <Container>
        <Box>
            <div>
            <h2> {title} </h2>
            <StyledSlider {...settings}>
              {wt3r && wt3r.map(e => (
                <div onClick={()=>movePage(e.restId,e.reservation)} key={e.restId}>
                  <div className="slide-content">
                    <h3>{e.restName}({e.category})</h3>
                    <p>평점 : {e.rating}</p>
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
               {mt3r && mt3r.map(e => (
                <div onClick={()=>movePage(e.restId,e.reservation)} key={e.restId}>
                  <div className="slide-content">
                    <h3>{e.restName}({e.category})</h3>
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
              {wt3review && wt3review.map(e=>(
                 <div onClick={()=>movePageReview(e.reviewId,e.reservation)} key={e.reviewId}>
                 <div className="slide-content">
                   <h2>{e.restName}</h2>
                   <h3>{e.reviewTitle}</h3>
                 </div>
                 {e.reviewFileName && <img src={e.reviewFileName} alt="review-img"/>}
               </div>
              ))}
           
            </StyledSlider>
            </div>
        </Box>
      </Container>
    );
}

export default HomeCarousel;