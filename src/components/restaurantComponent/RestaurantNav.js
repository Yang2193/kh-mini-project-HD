import styled from "styled-components";

const Nav = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > * {
        margin: 10px;
    }

  button{
    width: 30%;
    height: 80px;
    background : lightsalmon;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: inherit;
    border : 1px solid white;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0px 6px 0px 0px #F5D0A9;

  }
  button:hover{
    box-shadow: 0px 0px 0px 0px;
            margin-top: 15px;
            margin-bottom: 5px;
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