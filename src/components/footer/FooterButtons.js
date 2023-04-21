import styled from "styled-components";

const Button = styled.div`

    &:hover{
        color: white;
        cursor: pointer;
    }
  & + &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 8px;
    background-color: #000;
    opacity: 0.2;
  }
`;

const FooterButtons = () => {

    return(
        <>
            <Button>전체 서비스</Button>
            <Button>이용 약관</Button>
            <Button>개인정보처리방침</Button>
            <Button>고객센터</Button>
        </>
    );
}

export default FooterButtons;