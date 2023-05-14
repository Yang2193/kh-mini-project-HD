import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
   
  }
`;

const RatingUI = ({rating}) => {
  //상품 평균 평점 
  //rating = 3.5; 
  //고유 ID
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  //별점 리스트 상태
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
      const tempStarRatesArr = [0, 0, 0, 0, 0];
      const fullStarCount = Math.floor(rating); // 정수 부분은 전체 별 갯수로 설정
      const halfStarExist = rating - fullStarCount > 0; // 반 별이 존재하는지 확인
  
      for (let i = 0; i < fullStarCount; i++) {
        tempStarRatesArr[i] = 14; // 전체 별은 너비 14로 설정
      }
  
      if (halfStarExist) {
        tempStarRatesArr[fullStarCount] = 7; // 반 별은 너비 7로 설정
      }
  
      return tempStarRatesArr;
    };
  
    useEffect(() => {
      setRatesResArr(calcStarRates());
    }, [rating]);

  return(
  
          <StarRateWrap>
            {STAR_IDX_ARR.map((item, idx) => {
              return <span className='star_icon' key={`${item}_${idx}`}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='40' height='39' viewBox='0 0 14 13' fill='#cacaca'>
                      <clipPath id={`${item}StarClip`}>
                          <rect width={`${ratesResArr[idx]}`} height='39' />
                      </clipPath>
                      <path
                          id={`${item}Star`}
                          d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                          transform='translate(-2 -2)'
                      />
                      <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#ffcc00'
                      />
                  </svg>
              </span>
          })
          }
          </StarRateWrap>
    
  );
}


export default RatingUI;