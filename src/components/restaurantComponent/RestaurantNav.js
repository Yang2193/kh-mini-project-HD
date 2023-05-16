import styled from "styled-components";

const Nav = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > * {
        margin: 10px;
    }

  button{
    width: 200px;
    height: 100px;
    background : #FF7F50;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: inherit;
    border : 1px solid white;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const RestaurantNav = ({handleType}) => {

  const onClickMenu = () => {
    handleType("menu");
  }
  const onClickInfo = () => {
    handleType("default");
  }
  const onClickReview = () => {
    handleType("review");
  }

  return(
    <Nav>
      <button onClick={onClickInfo}>매장 상세 정보</button>
      <button onClick={onClickMenu}>메뉴 설명</button>
      <button onClick={onClickReview}>리뷰 및 평점</button>
    </Nav>
  );
};

export default RestaurantNav;