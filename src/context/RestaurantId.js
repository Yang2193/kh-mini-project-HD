import React, { createContext, useState } from "react";
export const ReviewIdContext=createContext([]);// 리뷰 id
export const RestIdContext = createContext([]);
const RestaurantProvider = ({ children }) => {
  const [restId, setRestId] = useState("");
  const [restName, setRestName] = useState("");  //문의 등록 시 이메일을 보내기 위해 레스토랑 이름 추가
  const [reviewId, setReviewId] = useState(""); // 리뷰 id

  return (
    <RestIdContext.Provider value={{ restId, setRestId, restName, setRestName }}>
      <ReviewIdContext.Provider value={{ reviewId, setReviewId }}>
        {children}
      </ReviewIdContext.Provider>
      </RestIdContext.Provider>

  );
};

export default RestaurantProvider;