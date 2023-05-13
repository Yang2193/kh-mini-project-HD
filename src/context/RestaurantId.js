import React, { createContext, useState } from "react";
export const ReviewIdContext=createContext([]);// 리뷰 id

const RestaurantProvider = ({ children }) => {
  const [reviewId, setReviewId] = useState(""); // 리뷰 id

  return (
      <ReviewIdContext.Provider value={{ reviewId, setReviewId }}>
        {children}
      </ReviewIdContext.Provider>
  );
};

export default RestaurantProvider;