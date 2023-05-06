import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";

const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    margin-bottom: 60px;

`;

const Box = styled.div`
  width: 80%;
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
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  
  }

  .slick-list {
    width: 100%;
    margin: 0 auto;
    padding-left: 50px;
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
  
`;




const HomeCarousel = () => {

  const [title, setTitle] = useState("");


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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

    return (
      <Container>
        <Box>
            <div>
            <h2> {title} </h2>
            <StyledSlider {...settings}>
              <div className="box">
                1
              </div>
              <div className="box">
                2
              </div>
              <div className="box">
                3
              </div>
              <div className="box">
                4
              </div>
              <div className="box">
                <h3>5</h3>
              </div>
              <div className="box">
                <h3>6</h3>
              </div>
              <div className="box">
                <h3>7</h3>
              </div>
              <div className="box">
                <h3>8</h3>
              </div>
              <div>
                <h3>9</h3>
              </div>
            </StyledSlider>
            </div>
        </Box>
      </Container>
    );
}

export default HomeCarousel;