import React, { useEffect, useState } from "react";
import Table from "../../../utils/table/CommonTable";
import TableColumn from "../../../utils/table/CommonTableColumn";
import TableRow from "../../../utils/table/CommonTableRow";
import styled from "styled-components";
import AxiosApi from "../../../api/AxiosApi";
import PageNation from "../../../utils/PageNation";
import Modal from '../../../utils/Modal';
import InquiryModal from '../InquiryModal';
const TableBlock = styled.div`
        .common-table {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        border-spacing: 0;
      
        }

        .common-table-header-column {
        border-bottom: 2px solid #ff7f50;
        padding: 0;
        font-size: 16px;
        padding: 10px 5px;
        font-weight: bold;
        }

        .common-table-row:hover {
        background-color: #F0B7A2;
        cursor: pointer;
        }
        .common-table-column {
        padding: 10px 5px;
        }

        .defaultBox{
          height: 200px;
          & :hover{
            cursor: initial;
          }
        }
`;

// 문의게시판
const InquiryBoard = props => {

  //문의내역 가져오기 

  const [inquiryValue, setInquiryValue] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
    //보여질 페이지 개수
    const ITEMS_PAGE = 5;
    const inquiryInfo = async() => {
      const rsp = await AxiosApi.inquiryGet(localStorage.getItem("userId"));
      if(rsp.status === 200) setInquiryValue(rsp.data);

    };
  useEffect(() => {
   
    inquiryInfo();
    //console.log(inquiryValue);

  },[])

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const pageCount = Math.ceil(inquiryValue.length / ITEMS_PAGE); // 전체 페이지 수
  const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
  const currentPageData = inquiryValue.slice(offset, offset + ITEMS_PAGE);

  const [modalOpen,setModalOpen] = useState(null);
  const closeModal =() => {
    setModalOpen(null);
   
  }
  const [selectRow, setSelectRow] = useState('');
  const inquiryRowClick=(selectRow) => {
    setModalOpen("update");
    setSelectRow(selectRow);
  }
    return (
      <>
      <TableBlock>
        <Table headersName={['NO.', '매장명', '제목', '상태','작성일시']}>
        {inquiryValue.length === 0 ? 
        (<tr className="defaultBox"><td colSpan={5}>등록된 문의가 없습니다.</td></tr>) : 
            (currentPageData.map((e) => (
            <TableRow key ={e.inquiryId} onClick={()=>inquiryRowClick(e)}>
              <TableColumn>{e.inquiryId}</TableColumn>
              <TableColumn>{e.restName}</TableColumn>
              <TableColumn>{e.inquiryTitle}</TableColumn>
              <TableColumn>{e.inquiryStat}</TableColumn>
              <TableColumn>{e.inquiryDate}</TableColumn>
            </TableRow>
        )))}
        </Table>
      </TableBlock>
      <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>
      <Modal open={modalOpen==="update"} close={closeModal} header="문의 내역" type="resv"><InquiryModal data={selectRow} inquiryInfo={inquiryInfo} setModalOpen={setModalOpen}/></Modal>
      <Modal open={modalOpen==="ok"} close={closeModal} type ="ok" header="수정 완료"> 문의 수정이 완료 되었습니다. </Modal>
      </>
    );
  }
  
  export default InquiryBoard;
