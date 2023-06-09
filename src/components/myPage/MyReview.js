import React,  { useEffect, useState } from "react";
import Table from "../../utils/table/CommonTable";
import TableColumn from "../../utils/table/CommonTableColumn";
import TableRow from "../../utils/table/CommonTableRow";
import AxiosApi from "../../api/AxiosApi";
import PageNation from "../../utils/PageNation";
import styled from "styled-components";
import { useNavigate } from "react-router-dom/dist";
import StarRatings from "react-star-ratings";
import { ReviewIdContext } from "../../context/RestaurantId";
import { useContext } from "react";

const TableBlock = styled.div`
.common-table {
width: 80%;
margin: 0 auto;
text-align: center;
border-spacing: 0;

}
.common-table-header-column {
padding: 0;
font-size: 16px;
padding: 10px 5px;
font-weight: bold;
}
.common-table-row {
    height: 200px;
    background-color: #ECECF0;
   
}
.common-table-row:hover {
background-color: #F0B7A2;
cursor: pointer;

}
.common-table-column {
padding: 10px 5px;
border-left: 1.5px solid #FBF4EF;
border-bottom: 30px solid #FBF4EF;
}

.defaultBox{
  height: 200px;
      & :hover{
        cursor: initial;
      }
 }
 .reviewImg{
  width: 100px;
  height: 100%;
}
`;
const MyReview =() => {
  const {setReviewId} = useContext(ReviewIdContext)

  // 페이지 이동
  const nav=useNavigate();
  const movePage = (reviewId) => {
    setReviewId(reviewId);
    nav("/Detail");
  };


    // //리뷰내역 가져오기 
    const [reviewValue, setReviewValue] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  
    //보여질 페이지 개수
    const ITEMS_PAGE = 3;
    useEffect(() => {
    const reviewInfo = async() => {
      const rsp = await AxiosApi.reviewGet(localStorage.getItem("userId"));
      if(rsp.status === 200) setReviewValue(rsp.data);
      console.log(rsp.data);
    };
    reviewInfo();

  },[]);

  
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const pageCount = Math.ceil(reviewValue.length / ITEMS_PAGE); // 전체 페이지 수
  const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스

  const currentPageData = reviewValue.slice(offset, offset + ITEMS_PAGE); // 현재 페이지에서 보여줄 아이템 배열
 // 현재 페이지에서 보여줄 아이템 배열
    return(
        <>
        <div className="titleName">내가 쓴 리뷰 </div>
       
        <TableBlock>
        <Table headersName ={['날짜','매장','사진','제목','평점']} >
        {reviewValue.length === 0 ?
        ( <tr className="defaultBox"><td colSpan={5}> 작성하신 리뷰가 없습니다.</td></tr>) :
        (currentPageData.map((e) => (
                <TableRow key={e.reviewId} onClick={()=>movePage(e.reviewId)}>
                    <TableColumn>{e.reviewDate}</TableColumn>
                    <TableColumn>{e.restName}</TableColumn>
                    <TableColumn><img className="reviewImg" src={e.reviewFileName} alt="" /></TableColumn>
                    <TableColumn>{e.reviewTitle}</TableColumn>
                    <TableColumn>
                    <StarRatings rating={e.rating}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="#ffab2c"/>
                    <br />
                    {e.rating}
                    </TableColumn>
                </TableRow>
        )))}
        </Table>
        </TableBlock>
        
        <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>
       
        </>
    );
};

export default MyReview;
