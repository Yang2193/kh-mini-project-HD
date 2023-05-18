import { useEffect,useState,useContext } from "react";
import AxiosApi from "../api/AxiosApi";
import { ReviewIdContext } from "../context/RestaurantId";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Modal from "../utils/Modal";
import { AiFillLike } from "react-icons/ai";
import MessageModal from "../utils/MessageModal";
import { Rating } from "react-simple-star-rating";
import { storage } from "../firebase/firebase";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
import { AiFillCloseSquare } from 'react-icons/ai';

const ReviewPage = styled.div`
    font-family: "NanumGothic";
	background-color:#EEE4DC;
    width: 100%;
    height: 980px;
    overflow: hidden;
	.all{
	display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
	}
    .cont{
        box-shadow: 1px 1px 5px;
        border-radius: 15px;
        position: relative;
		padding: 30px;
		width: 60%;
        height: 600px;
		background-color: #fff;
        margin: 60px 0px;
        .return{
            position: relative;
            font-size: 20px;
            width: 150px;
            height: 50px;
            background-color: salmon;
            border: none;
            cursor: pointer;
            bottom: 50px;
            left: 950px;
            border-radius: 10px;
        }
        .return:hover{
            box-shadow: 1px 1px 2px;
        }
        img{
            border-radius: 10px;
            width: 43%;
            height: 60%;
            bottom:22%;
            left:55%;
            position: absolute;
        }
        .btns{
            .update{
                background-color: lightsalmon;
                border: none;
                width: 100px;
                height: 30px;
                border-radius: 10px;
                position: relative;
                bottom:100px;
                left:75%;
            }
            .update:hover{
                box-shadow: 1px 1px 5px;
                cursor: pointer;
            }
            .delete{
                background-color: #fff;
                border: none;
                position: relative;
                bottom:680px;
                left:1000px;
            }
            .change{
                background-color: lightsalmon;
                border: none;
                width: 100px;
                height: 30px;
                border-radius: 10px;
                position: relative;
                bottom:40px;
                left:75%;
            }
            .change:hover{
                box-shadow: 1px 1px 5px;
                cursor: pointer;
            }
    }
    }
    .like{
        position: relative;
        height: 40px;
        width: 40px;
        bottom:45px;
        left:80px;
        cursor: pointer;
        border: none;
        background-color: white;
    }
    .box{
       /* border: 1px solid; */
       width: 50%;
       height: 100%;
        p{
            position: relative;
        }
        .date{
            font-size: 10px;
        }
        .title {
            height: 30px;
            font-size: 20px;
            font-weight: bold;
            bottom: 20px;
        }
        .ratingBox{
            font-size: 20px;
            bottom:30px;
        }
        .content{
            height: 400px;
            bottom:35px;
            font-size: 18px;
        }
        .nick{
            font-size: 17px;
        }
        .date{
            font-size: 10px;
            bottom:32px;
            left:100px;
        }
        .likeCount{
            font-size: 15px;
            bottom:30px

        }
    }
    .uptit{
        padding:10px;
        width: 100%;
        height: 3%;
        font-size: 20px;
        margin-bottom: 10px;
        border-radius: 10px;
    }
    .upcont{
        padding:10px;
        width: 100%;
        font-size: 18px;
        font-family: "NanumGothic";
        margin-bottom: 15px;
        height: 50%;
        border-radius: 10px;

    }
    .file{
        width: 100%;
        position: relative;
        bottom:30px;
    }

`;

const ReviewDetail = () =>{
    const nav = useNavigate();
    const {reviewId} = useContext(ReviewIdContext);
    const memId = localStorage.getItem("userId");  
    const [refresh,setRefresh] = useState();// 팝업 실행후 화면 렌더링

    const [rtReview, setRtReview] = useState(""); // 리뷰 데이터 불러오기
    useEffect(() => {
        const rtReview = async()=>{
        const rsp = await AxiosApi.reviewDetail(reviewId)
        setRtReview(rsp.data);
    };
    rtReview();
    },[refresh]);

    // 리뷰 공감 기능
    const [revLikeList,setRevLikeList] = useState([]); // 공감 리스트 배열
    const [isRevLike, setIsRevLike] = useState(false); // 최종 공감 상태 
    useEffect(()=>{ // 로그인한 회원id를 기준으로 공감 리뷰 리스트를 db에서 불러와 확인하고 배열에 삽입
        const liked = async() => {
            const rsp = await AxiosApi.revLiked(memId);
            setRevLikeList(rsp.data);
        }
        liked();
    },[memId]);

    useEffect(() => {
        if (revLikeList.some(item => item.reviewId === reviewId)) { // 배열을 확인하며 해당 리뷰에 공감이 등록되어 있으면 true 아니면 false
        setIsRevLike(true);
        } else {
        setIsRevLike(false);
        }
      }, [revLikeList, reviewId]);

    const addLike = async () => { 
        const rsp = await AxiosApi.addRevLike(reviewId, memId);
        if (rsp.data === true) {
            console.log("공감 등록 성공");
            setRevLikeList([...revLikeList, {reviewId, memId}]); // 공감 등록 성공시 배열에도 추가
            setIsRevLike(true); // 최종 공감 상태를 true 로 전달
            console.log(revLikeList);
            } else {
                console.log(" 등록 전송 실패");
            }
        };

    const deleteLike = async () => {
        const rsp = await AxiosApi.delRevLike(reviewId, memId);
        if (rsp.data === true) {
            console.log("공감 삭제 성공");
            setRevLikeList(revLikeList.filter(item => !(item.reviewId === reviewId && item.memId === memId))); // 공감 삭제 성공시 배열에도 삭제
            setIsRevLike(false); // 최종 공감 상태를 false 로 전달
            console.log(revLikeList);

            } else {
            console.log("삭제 전송 실패");
            }
        };

    const onClickLiked = () =>{
        if(!memId) {  
            setModalCheck(true);
        } 
        if (!isRevLike) {
            addLike();
            setRefresh(prevRefresh => !prevRefresh); // 리뷰 데이터를 다시 불러오기 위한 refresh 상태 변수 토글

        }else{
            deleteLike();
            setRefresh(prevRefresh => !prevRefresh); // 리뷰 데이터를 다시 불러오기 위한 refresh 상태 변수 토글

        }
    }
    const movePage = (restId,reservation) => {
        localStorage.setItem("restId", restId);
        localStorage.setItem("resPossible",reservation);
        nav("/Info");
      };
    // 팝업  
    const [showInput, setShowInput] = useState(false);// 리뷰 수정
    const [deleteModal,setDeleteModal] = useState(false); // 리뷰 삭제 완료
    const [modalCheck,setModalCheck] = useState(false); // 로그인 체크 팝업
    const [modalOpen, setModalOpen] = useState(false);


 // 이미지 업로드 기능
 const [imageUplod, setImageUpload] = useState(null);// 이미지 파일 저장 

 const onChangeImage =(e) =>{
     setImageUpload(e.target.files[0])
 }

 const uploadImage = async () => {
     if(imageUplod===null) return;

     const imageRef = ref(storage, `images/${imageUplod.name + v4()}`);
     const uploadSnapshot = await uploadBytes(imageRef, imageUplod);
     const imageUrl = await getDownloadURL(uploadSnapshot.ref);
     return imageUrl;
   };

 // 리뷰 데이터 입력 받고 데이터 추가 전송
 const [inputTttle, setInputTitle] = useState("");
 const [inputContent, setInputContent] = useState("");
 const [inputRating,setInputRating] = useState("");

 const onChangeTitle = e =>{
     if (e.target.value.length <= 20) { // 최대 글자 수를 20으로 제한
         setInputTitle(e.target.value);
       }
 }
 const onChangeContent = e =>{
     if (e.target.value.length <= 525) { 
         setInputContent(e.target.value);
       }   
 }
 const onChangeRating = e =>{
     setInputRating(e)
 }

 const updateReview = async () => {
 let reviewImageUrl = null;
 console.log(inputTttle, inputContent, inputRating, reviewImageUrl,reviewId);

    if (imageUplod) {
        reviewImageUrl = await uploadImage();
    } else {
        const rtReviewData = rtReview.find(rest => rest.reviewId === reviewId);
        reviewImageUrl = rtReviewData.reviewImage;
    }
    const rsp = await AxiosApi.reviewUpdate(inputTttle, inputContent, inputRating, reviewImageUrl, reviewId);
    if (rsp.data === true) {
      setModalOpen(true);
    } else {
      console.log("전송 실패");
    }
    setRefresh(prevRefresh => !prevRefresh); // 리뷰 데이터를 다시 불러오기 위한 refresh 상태 변수 토글
  }
 //
    const closeModal = () => {
        setModalCheck(false);
        setShowInput(false);
        setModalOpen(false);
        setRefresh(prevRefresh => !prevRefresh); // 리뷰 데이터를 다시 불러오기 위한 refresh 상태 변수 토글

    }
    const deleteOk =()=>{
        setDeleteModal(false);
        nav(-1);
    }
    const deleteReview = async(revId)=>{
        const rsp = await AxiosApi.reviewDelete(revId);
        if (rsp) {
            setDeleteModal(true);
        }
    }
    const checkLogin=() => { // 로그인 체크 팝업
        nav('/Login');
      }
    return(
        <ReviewPage>
        <div className="all">
             {rtReview&&rtReview.map(rest=>(
                    <div className="cont" key={rest.reviewId}>
                        <div className="box">
                            <p className="nick">{rest.nickName}</p>
                            <p className="date">작성일 : {rest.reviewDate}</p>
                            {showInput ? <input className="uptit" value={inputTttle || setInputTitle(rest.reviewTitle)} type="text" onChange={onChangeTitle} placeholder="제목을 입력해 주세요" autoFocus/> : <p className="title">{rest.reviewTitle}</p>}
                            {showInput ?  <textarea className="upcont" value={inputContent || setInputContent(rest.reviewContent)} onChange={onChangeContent} placeholder="내용을 입력해 주세요"></textarea> : <p className="content">{rest.reviewContent}</p>}
                            {showInput ? <p className="ratingBox">평점을 선택하세요:<Rating
                                            onClick={onChangeRating}
                                            initialValue={inputRating || setInputRating(rest.reviewRating)}
                                            allowFraction
                                            />
                                        </p> : <p className="ratingBox">
                                                평점 : <StarRatings 
                                                    rating={rest.reviewRating}
                                                    starDimension="30px"
                                                    starSpacing="4px"
                                                    starRatedColor="gold"/> {rest.reviewRating}
                                                    </p>
                                                }
                            {showInput ? <input type="file" className="file" onChange={onChangeImage}/>: null}
                            {showInput ? null :<p className="likeCount">공감수 : {rest.likeCnt}</p>}
                        </div>
                        {showInput ? null :<button className="like" onClick={()=>onClickLiked()} >
                                            <AiFillLike style={{fontSize: '24px', color: isRevLike ? "salmon" : "#999999" }} />
                                            </button> }
                        {showInput ? null :<button className="return" onClick={()=>movePage(rest.restId,rest.reservation)}>매장으로 이동</button>}
                      
                        {(memId === rest.memId) ? (
                            <div className="btns">
                                {showInput ? <button className="change" onClick={updateReview}>수정완료</button>:
                                             <button className="update" onClick={()=> setShowInput(true)}>수정하기</button>}

                                {showInput ? null : <button className="delete" onClick={()=>deleteReview(rest.reviewId)}>
                                                        <AiFillCloseSquare style={{fontSize: '30px',color:"lightsalmon"}}/>
                                                    </button>
                                }
                            </div>
                        ) : null}

                    <img src={rest.reviewImage} alt="이미지가 없습니다."/>
                </div>
                ))}
        </div>
        <Modal open={deleteModal} close={deleteOk} type ="ok" header="삭제 완료"> 삭제가 완료 되었습니다.</Modal>
        <MessageModal open={modalCheck} close={checkLogin} confirm={closeModal} header="로그인">로그인이 되어있지 않습니다.</MessageModal>
        <Modal open={modalOpen} close={closeModal} type ="ok" header="수정 완료"> 리뷰 수정이 완료 되었습니다. </Modal>

        </ReviewPage>
    )

}

export default ReviewDetail;