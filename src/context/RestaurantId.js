import React, { createContext, useState } from "react";
export const ReviewIdContext=createContext([]);// 리뷰 id
export const RestIdContext = createContext([]);

const RestaurantProvider = ({ children }) => {
  const [restId, setRestId] = useState("");
  const [reviewId, setReviewId] = useState(""); // 리뷰 id

  return (
    <RestIdContext.Provider value={{ restId, setRestId}}>
        <ReviewIdContext.Provider value={{ reviewId, setReviewId }}>
        {children}
        </ReviewIdContext.Provider>
      </RestIdContext.Provider>

  );
};

export default RestaurantProvider;