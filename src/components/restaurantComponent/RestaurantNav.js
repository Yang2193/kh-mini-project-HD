import styled from "styled-components";

const Nav = styled.div`
  /* position: relative; */
  /* bottom: 25px; */
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ivory;

  button{
    color : black;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 80px;
    background-color: lightsalmon;
    border: 1px solid;
    border-right: none;
    border-bottom:5px solid ;
    font-size: 20px;
    cursor: pointer;
  }
  .rev{
    border-right: 1px solid;
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