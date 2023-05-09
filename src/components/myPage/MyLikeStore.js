import React, { useEffect, useState } from "react";
import RestBox from "./RestBox";
import AxiosApi from "../../api/AxiosApi";

//찜한가게
const MyLikeStore = () => {

    const [likeValue,setLikeValue] = useState('');
	
    useEffect(()=> {
        const restlikeInfo = async() => {
            const rsp = await AxiosApi.restLikeGet(localStorage.getItem("userId"));
            if(rsp.status === 200) setLikeValue(rsp.data);
            console.log(rsp.data);
          };
          restlikeInfo();

    },[]);


    return(
        <>
        <div className="titleName">찜한 가게</div>
        <RestBox value = {likeValue}/>
      
        </>
    );
};

export default MyLikeStore;
