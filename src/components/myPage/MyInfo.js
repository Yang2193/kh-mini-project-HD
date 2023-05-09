import React, { useState } from "react";
import Password from "../../utils/Password";
import MemberInfo from "./MemberInfo";

//내정보 수정전 컴포넌트 
const MyInfo = () => {

    const [isPwd,setIsPwd] = useState(false);

    return(
        <>
        {!isPwd ? (<Password setIsPwd={setIsPwd} type="pwd">내정보를 수정하려면 비밀번호를 입력하세요.</Password>) :
            (<MemberInfo/>)}
        </>
    );
}

export default MyInfo;