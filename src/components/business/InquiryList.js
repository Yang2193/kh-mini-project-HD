import React, { useContext, useState } from "react";
import Table from "../../utils/table/CommonTable";
import TableRow from "../../utils/table/CommonTableRow";
import TableColumn from "../../utils/table/CommonTableColumn";
import styled from "styled-components";
import { RestaurantContext } from "../../context/RestaurantContext";
import Modal from "../../utils/Modal";
import InquiryView from "./InquiryView";

const InquiryBlock  = styled.div`
    .inquiryTitle {
            font-size: 1.3rem;
            font-weight: bold;
            margin-left:10%;
            margin-bottom: 20px;
        }
    .common-table {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        border-spacing: 0;
        margin-bottom: 20px;
        }

        .common-table-header-column {
        border-bottom: 2px solid #ff7f50;
        padding: 0;
        font-size: 16px;
        padding: 10px 5px;
        font-weight: bold;
        }

        .common-table-row:hover {
        background-color:#F0B7A2;
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

const InquiryList = ({data,children,stat,restInquiry}) => {
    
    const {restValue} = useContext(RestaurantContext);
    const [selectRow, setSelectRow] = useState('');
    const [modalOpen,setModalOpen] = useState(false);
    const closeModal =() => {
      setModalOpen(false);
     
    }
    const inquiryRowClick=(selectRow) => {
      setModalOpen(true);
      setSelectRow(selectRow);
    }
    return(
        <InquiryBlock>
         <div className="inquiryTitle">{children}</div>
        <Table headersName={['날짜','NO.','매장명','문의제목','상태']}>
        {data.length === 0 ? (
        <tr className="defaultBox"><td colSpan={5}> {children}이 없습니다.</td></tr>
      ) : (
        data.map((e) => {
          if (e.inquiryStat === stat) {
            return (
              <TableRow key={e.inquiryId} onClick={()=>inquiryRowClick(e)}>
                <TableColumn>{e.inquiryDate}</TableColumn>
                <TableColumn>{e.inquiryId}</TableColumn>
                <TableColumn>{restValue.restName}</TableColumn>
                <TableColumn>{e.inquiryTitle}</TableColumn>
                <TableColumn>{e.inquiryStat}</TableColumn>
              </TableRow>
            );
          } else {
            return null; // 조건에 맞지 않으면 null을 반환하여 출력하지 않음
          }
        }))}
        </Table>
        <Modal open={modalOpen} close={closeModal} header="문의 내역" type="resv"><InquiryView data={selectRow} restInquiry={restInquiry}/></Modal>

        </InquiryBlock>
    );
}

export default InquiryList;