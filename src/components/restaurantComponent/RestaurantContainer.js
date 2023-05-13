import React from "react"
import styled from "styled-components"
import {useState,useEffect,useContext} from "react";
import AxiosApi from "../../api/AxiosApi";
import { RestIdContext } from "../../context/RestaurantId";
import {  useNavigate } from "react-router-dom";
import InquiryModal from "../../utils/rest/InquiryModal";

const FixContent = styled.section`

    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ivory;
    border-top: 3px solid;
    border-color: #eee;
    img{
        width: 400px;
        margin-right: 100px;
        height: 300px;
        background-color: white;
    }
    .cont{
        border: 1px solid;
        width: 600px;
        height: 300px;
        background-color: white;
        display: flex;
        flex-direction: column;
    }
        
    button{
            font-size: 20px;
            width: 150px;
            background-color: salmon;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
        .like{
            position: relative;        
            left: 540px;
            bottom: 180px;
            width: 40px;
            background-color: white;
            border: 1px solid;
        }
        .res{
            position: relative;
            left: 410px;
            bottom: 0px;
        }
        .inq{
            position: relative;
            left: 40px;
            bottom: -60px;
        }
        p{
            padding: 10px;
            margin: 0;
            font-size: 20px;
        }
     
`;

const RestaurantContainer =() =>{
	const restId = localStorage.getItem("restId");
    const memId = localStorage.getItem("userId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고
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
        alert("로그인이 되어있지 않습니다.")
        navigate("/login");
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
        alert("로그인이 되어있지 않습니다.")
        navigate("/login");
    } 
        if (!isLiked) {
            addLike(name);
        }else
            deleteLike();
        }    
// 예약 페이지
const checklogin =()=>{
    if(!memId){
        alert("로그인이 되어있지 않습니다.")
        navigate("/login");
    }else{
        navigate("/Reservation")
    }
}
    return(
            <FixContent>
                <img src="" alt="이미지" />
                {rtInfoFix&& rtInfoFix.map(rest =>(
                    <div className="cont" key={rest.name}>
                        <p>매장 이름 : {rest.name}</p>
                        <p>전화 번호 : {rest.phone}</p>
                        <p>주소 : {rest.addr}</p>
                        <p>평점 : {rest.avgRating}</p>
                        <button className="inq" onClick={openModal}>문의 하기</button>
                        <InquiryModal open={modalOpen} close={closeModal}></InquiryModal>
                        <button className="like" onClick={()=>onClickLiked(rest.name)} style={{backgroundColor : isLiked ? "salmon" : "white"}}>찜</button>
                        <button className="res" onClick={checklogin}>예약 하기</button>

                    </div>
                ))}
            </FixContent>
    );
}

export default RestaurantContainer;