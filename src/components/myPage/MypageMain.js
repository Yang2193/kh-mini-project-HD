import React ,{useContext, useEffect,useState} from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { MemberContext } from "../../context/MemberContext";

const Container = styled.div`

    font-size: 20px;
    .box {
        border: 2px solid #FF7F50;
        margin: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
    }
    span{
        font-weight: 500;
        font-size: 30px;
    }
    .date{
       color: blue;
       font-weight: bolder;

    }
    .restName{
        font-weight: bolder;
        color: #FF7F50;
    }
    .count{

    }
    .seat{

    }

`;
//마이페이지 첫 화면
const MypageMain = () => {
    const [resvValue, setResvValue] = useState([]);
    const{memberValue} = useContext(MemberContext);
  
useEffect(() => {
    const resvInfo = async() => {
        console.log(localStorage.getItem("userId"));
        const rsp = await AxiosApi.resvGet(localStorage.getItem("userId"),"예약확정");
        const rsp2 = await AxiosApi.resvGet(localStorage.getItem("userId"),"예약대기");
        if(rsp.status === 200 && rsp2.status === 200){
            const resvData = rsp.data.concat(rsp2.data);
            setResvValue(resvData);
            console.log(resvData);
        } 
    };
   resvInfo();
    },[]);

    const filterData = resvValue.filter(item => new Date(item.resvDate) >= new Date());

    return(
       
        <Container>

        <div className="titleName">예정된 예약 목록</div>
        {filterData.length  > 0 ? (
        <div className="box">
        <p> <span className="name">{memberValue&&memberValue.name}</span>님 </p>
        <p> <span className="date">{filterData[filterData.length-1].resvDate}</span> 에 </p>
        <p><span className="restName">{filterData[filterData.length-1].restName}</span>  에서 </p>
        <p><span className="seat">{filterData[filterData.length-1].resvTime}</span></p>
        <p> <span className="count">{filterData[filterData.length-1].resvPeople}</span>명</p>
        <p>{filterData[filterData.length-1].resvStat === "예약확정" ? "예약이 완료되었습니다." : "예약 대기중입니다."}</p>
        </div>) :(<div className="box">예약 정보가 없습니다.</div>)}

        </Container>
    );

}

export default MypageMain;