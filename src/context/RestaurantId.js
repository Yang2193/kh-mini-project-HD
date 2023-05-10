import React, { createContext, useState } from "react";
export const RestIdContext= createContext([]); // 매장 id
export const ReviewIdContext=createContext([]);// 리뷰 id

const RestaurantProvider = ({ children }) => {
  const [restId, setRestId] = useState("");
  const [reviewId, setReviewId] = useState(""); // 리뷰 id

  return (
    <RestIdContext.Provider value={{ restId, setRestId }}>
      <ReviewIdContext.Provider value={{ reviewId, setReviewId }}>
        {children}
      </ReviewIdContext.Provider>
    </RestIdContext.Provider>
  );
};

export default RestaurantProvider;