import React from "react"
import styled from "styled-components"
import {useState,useEffect,useContext} from "react";
import AxiosApi from "../../api/AxiosApi";
import {  useNavigate } from "react-router-dom";
import InquiryModal from "../../utils/rest/InquiryModal";
import StarRatings from "react-star-ratings";
import MessageModal from "../../utils/MessageModal";
import { FaHeart } from 'react-icons/fa';
const FixContent = styled.section`
        width: 70%;
        height: auto;
        margin: 30px auto;
        background-color: #FBF4EF;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: relative;
    .cont{
        position: relative;
        border-radius: 15px;
        left:50px;
        width: 50%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
    }
    img{
        position: relative;
        border-radius: 15px;
        left:-50px;
        width:30%;
        background-color: #fff;
    }
    .btns{
        position: relative;
        top:100px;
      
    }
        button{
            font-size: 20px;
            background-color: salmon;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            position: relative;        
        }
        .like{
            left: 90%;
            bottom: 340px;
            background-color: white;
            /* border: 1px solid; */
        }
        .res{
            width: 25%;
            height: 50px;
            bottom:120px;
            left:60%;
        }
        .res:hover{
            box-shadow: 1px 1px 5px;
        }
        .inq{            
            width: 25%;
            height: 50px;
            bottom:70px;
            left:10%;
        }
        .inq:hover{
            box-shadow: 1px 1px 5px;
        }
        p{
            padding: 10px;
            margin: 0;
            font-size: 20px;
        }

     
`;

const RestaurantContainer =() =>{
    const [modalCheck,setModalCheck] = useState(false); // 로그인 체크 팝업

	const restId = localStorage.getItem("restId");
    const memId = localStorage.getItem("userId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고
    const possible = localStorage.getItem("resPossible");
    // 매장 정보 호출

    const [rtInfoFix, setRtInfoFix] = useState("");
 
    useEffect(() => {
		const rtInfoFix = async()=>{
            const rsp = await AxiosApi.restaurantInfoFixed(restId);
            setRtInfoFix(rsp.data);
        };
        rtInfoFix();
    },[]);
   

// 문의 작성 버튼 입력시 팝업 창
const navigate= useNavigate();

const [modalOpen, setModalOpen] = useState(false);

const openModal = () => {
    if (memId) {
        setModalOpen(true);
    } else {
        setModalCheck(true);
    }
}

const closeModal = () => {
    setModalOpen(false);
}

// 찜기능 

    const [isLiked, setIsLiked] = useState(false); // 최종 찜 상태 
    const [likedList,setLikedList] = useState([]); // 찜 리스트 배열

    useEffect(()=>{ // 로그인한 회원id를 기준으로 찜 매장 리스트를 db에서 불러와 확인하고 배열에 삽입
        const liked = async() => {
            const rsp = await AxiosApi.restLikeGet(memId);
            setLikedList(rsp.data);
        }
        liked();
    },[memId]);

    useEffect(() => {
        if (likedList.some(item => item.restId === restId)) { // 배열을 확인하며 해당 매장사이트에서 찜이 등록되어 있으면 true 아니면 false
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }, [likedList, restId]);


    const addLike = async (name) => { 
        const rsp = await AxiosApi.addRestLike(restId, memId,name);
        if (rsp.data === true) {
            console.log("찜 등록 성공");
            setLikedList([...likedList, {restId, memId}]); // 찜등록 성공시 배열에도 추가
            setIsLiked(true); // 최종 찜 상태를 true 로 전달
            console.log(likedList);
            console.log(restId);
            } else {
                console.log(" 등록 전송 실패");
            }
        };

    const deleteLike = async () => {
        const rsp = await AxiosApi.delRestLike(restId, memId);
        if (rsp.data === true) {
            console.log("찜 삭제 성공");
            setLikedList(likedList.filter(item => !(item.restId === restId && item.memId === memId))); // 찜 삭제 성공시 배열에도 삭제
            setIsLiked(false); // 최종 찜 상태를 false 로 전달
            console.log(likedList);
            } else {
            console.log("삭제 전송 실패");
            }
        };

    const onClickLiked = (name) =>{
        if(!memId) {  
        setModalCheck(true);
    } 
        if (!isLiked) {
            addLike(name);
        }else
            deleteLike();
        }    
// 예약 페이지
const checklogin =()=>{
    if(!memId){
        setModalCheck(true);
    }else{
        navigate("/Reservation")
    }
}

const checkLogin=() => {
    setModalOpen(false);
    navigate('/Login');
  }
    return(
            <>
                {rtInfoFix&& rtInfoFix.map(rest =>(
                    <FixContent key={rest.name}>
                        <img src={rest.image} alt="이미지" />
                        <div className="cont">
                        <p>매장 이름 : {rest.name}</p>
                        <p>전화 번호 : {rest.phone}</p>
                        <p>주소 : {rest.addr}</p>
                        <p className="ratingBox">
                        평점 : <StarRatings rating={rest.avgRating}
                            starDimension="30px"
                            starSpacing="4px"
                            starRatedColor="gold"/> ( {rest.avgRating}점 / 5점 )
                        </p>
                        <div className="btns">
                            <button className="inq" onClick={openModal}>문의 하기</button>
                            <MessageModal open={modalCheck} close={checkLogin} confirm={checkLogin} header="로그인">로그인이 되어있지 않습니다.</MessageModal>

                            <InquiryModal open={modalOpen} close={closeModal}></InquiryModal>
                            <button className="like" onClick={()=>onClickLiked(rest.name)}>
                                <FaHeart  style={{fontSize: '130%', color: isLiked ? "red" : "#999999" }}/>
                            </button>
                            <button className="res"  disabled={possible === "0"}  onClick={checklogin}>예약 하기</button>
                        </div>
                        </div>
                    </FixContent>
                ))}
            </>
    );
}

export default RestaurantContainer;