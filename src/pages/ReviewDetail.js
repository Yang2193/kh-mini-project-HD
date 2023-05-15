import { useEffect,useState,useContext } from "react";
import AxiosApi from "../api/AxiosApi";
import { ReviewIdContext } from "../context/RestaurantId";
import styled from "styled-components";
import Header from "../components/header/Header";
import HomeFooter from "../components/footer/HomeFooter";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Modal from "../utils/Modal";
import ReviewUpdate from "../utils/rest/ReviewUpdate";
const ReviewPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ivory;
    height: 800px;
    .btns{
        position: relative;
        left: 650px;
        bottom:380px;
        button{
            margin-left: 20px;
        }
    }
    .cont{
        width: 430px;
    }
    .like{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border: 1px solid;
        height: 30px;
        width: 40px;
        top: 50px;
        cursor: pointer;
        border-radius: 50px;
    }
    .rating{
            position: relative;
            left:250px;
            top:48px;
            font-size: 20px;
        }
    .box{
        margin-top: 30px;
        width: 800px;
        height: 500px;
        border: 1px solid;
        background-color: white;
        border: 1px solid;
        padding:10px;
        p{
            position: relative;
        }
        .date{
            font-size: 10px;
        }
        img{
            position: relative;
            width: 40%;
            height: 80%;
            left: 350px;
            bottom: 350px;
  
        }
        .title {
        font-size: 25px;
        font-weight: bold;
        bottom: 20px;
    }
        .ratingBox{
            font-size: 20px;
            top:100px;
        }
        .content{
            font-size: 20px;
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
            top:150px

        }
        .return{
            position: relative;
            width: 100px;
            height: 30px;
            background-color: lightsalmon;
            border: none;
            cursor: pointer;
            top: 100px;
            left: 700px;
        }
    }
    `;

const ReviewDetail = () =>{
    const nav = useNavigate();
    const {reviewId} = useContext(ReviewIdContext);
    const memId = localStorage.getItem("userId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고

    const [rtReview, setRtReview] = useState(""); // 리뷰 데이터 불러오기
    useEffect(() => {
        const rtReview = async()=>{
        const rsp = await AxiosApi.reviewDetail(reviewId)
        setRtReview(rsp.data);
    };
    rtReview();
    },[]);

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
            setRevLikeList([...revLikeList, {reviewId, memId}]); // 찜등록 성공시 배열에도 추가
            setIsRevLike(true); // 최종 찜 상태를 true 로 전달
            console.log(revLikeList);
            } else {
                console.log(" 등록 전송 실패");
            }
        };

    const deleteLike = async () => {
        const rsp = await AxiosApi.delRevLike(reviewId, memId);
        if (rsp.data === true) {
            console.log("공감 삭제 성공");
            setRevLikeList(revLikeList.filter(item => !(item.reviewId === reviewId && item.memId === memId))); // 찜 삭제 성공시 배열에도 삭제
            setIsRevLike(false); // 최종 찜 상태를 false 로 전달
            console.log(revLikeList);

            } else {
            console.log("삭제 전송 실패");
            }
        };

    const onClickLiked = () =>{
        if(!memId) {  
            alert("로그인이 되어있지 않습니다.")
            nav("/login");
        } 
        if (!isRevLike) {
            addLike();
        }else{
            deleteLike();
        }
    }
    const movePage = (restId) => {
        localStorage.setItem("restId", restId);
        nav("/Info");
      };
    // 팝업  
    const[modalUpdate,setModalUpdate]=useState(false); // 리뷰 수정
    const [deleteModal,setDeleteModal] = useState(false); // 리뷰 삭제 완료

    const update =() =>{
        setModalUpdate(true);

    }
    const closeModal = () => {
        setModalUpdate(false);
        setDeleteModal(false);
    }
    const deleteReview = async(revId)=>{
        const rsp = await AxiosApi.reviewDelete(revId);
        if (rsp) {
            setDeleteModal(true);
        }
    }
    return(
        <>
        <Header/>
        <ReviewPage>
             {rtReview&&rtReview.map(rest=>(
                    <div className="box" key={rest.reviewId}>
                        <div className="cont">
                        <p className="nick">{rest.nickName}</p>
                        <p className="date">작성일 : {rest.reviewDate}</p>
                        <p className="title">{rest.reviewTitle}</p>
                        <p className="content">{rest.reviewContent}</p>
                        <p className="ratingBox">
                        평점 : 
                        <StarRatings rating={rest.reviewRating}
                            starDimension="30px"
                            starSpacing="4px"
                            starRatedColor="yellow"/>
                        </p>
                        </div>
                        <p className="rating">{rest.reviewRating}</p> 
                        <p className="likeCount">공감수 : {rest.likeCnt} </p>
                        <button className="like" onClick={()=>onClickLiked()} style={{backgroundColor : isRevLike ? "salmon" : "white"}}>👍</button>
                        <button className="return" onClick={()=>movePage(rest.restId)}>매장으로 이동</button>
                        {(memId === rest.memId) ? (
                            <div className="btns">
                                <button className="update" onClick={update}>수정하기</button>
                                <button className="delete" onClick={()=>deleteReview(rest.reviewId)}>삭제</button>
                                <Modal open={deleteModal} close={closeModal} type ="ok" header="수정 완료"> 삭제가 완료 되었습니다.</Modal>
                            </div>
                        ) : null}
                        <ReviewUpdate open={modalUpdate} close={closeModal}></ReviewUpdate>

                        <img src={rest.image}/>
                    </div>
                ))}
        </ReviewPage>
        <HomeFooter/>
        </>
    )

}

export default ReviewDetail;