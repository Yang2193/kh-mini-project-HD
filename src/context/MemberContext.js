import React, { createContext, useState } from "react";

export const MemberContext = createContext();

const MemberProvider = ({ children }) => {
  const [memberValue, setMemberValue] = useState({
    memId: '',
    pwd: '',
    name: '',
    nickName: '',
    phoneNum: '',
    addr: '',
    imgFileName: '',
    email: '',
  });

  return (
    <MemberContext.Provider value={{ memberValue, setMemberValue }}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
