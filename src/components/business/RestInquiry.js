import React from "react";
import InquriryList from "./InquiryList";
import { useEffect } from "react";
import { useState } from "react";
import AxiosApi from "../../api/AxiosApi";
const RestInquiry = ({restValue}) => {
    console.log(restValue);
    const [inquiryList, setInquiryList] = useState([]);
     //문의내역 
     const restInquiry = async() => {
        const rsp = await AxiosApi.restInquirySelect(restValue.restId);
        if (rsp.status === 200) setInquiryList(rsp.data);
        console.log(rsp.data);
       };

    useEffect(()=> {
        restInquiry();
    },[]);

    return(
            <>
            <div className='titleName'> 고객 1:1문의 </div>
            <InquriryList data={inquiryList} stat={"답변대기"} restInquiry={restInquiry} >새로운 문의내역</InquriryList>
            <InquriryList data={inquiryList} stat={"답변완료"} restInquiry={restInquiry}>이전 문의내역</InquriryList>
            </>
      
    );
}

export default RestInquiry;