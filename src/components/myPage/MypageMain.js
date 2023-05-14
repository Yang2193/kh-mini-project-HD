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
        const rsp = await AxiosApi.resvGet(localStorage.getItem("userId"),"예약확정");
        if(rsp.status === 200){
            setResvValue(rsp.data);
        } 
    };
   resvInfo();
    },[]);

    const filterData = resvValue.filter(item => new Date(item.applicationDate) >= new Date());

    return(
       
        <Container>

        <div className="titleName">예정된 예약 목록</div>
        {filterData.length>0 ? (
        <div className="box">
        <p> <span className="name">{memberValue.name}</span>님 </p>
        <p> <span className="date">{filterData[0].resvDate}</span> 에 </p>
        <p><span className="restName">{filterData[0].restName}</span>  에서 </p>
        <p><span className="seat">{filterData[0].resvTime}</span></p>
        <p> <span className="count">{filterData[0].resvPeople}</span>명 <span className="seat">{filterData[0].resvSeat}</span>좌석에 </p>
        <p>{filterData[0].resvStat === "예약확정" ? "예약이 완료되었습니다." : "예약 대기중입니다."}</p>
        </div>) :(<div className="box">예약 정보가 없습니다.</div>)}

        </Container>
    );

}

export default MypageMain;