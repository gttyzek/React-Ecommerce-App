import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { Props, SlideInd } from '../utils/interface.dto';
import styled from 'styled-components';
import { sliderItems } from '../data';
import { useState } from 'react';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none"})}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props: Props) => props.direction === "left" && "10px"};
  right: ${(props: Props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props: SlideInd)=>props.slideIndex * -100}vw); 
`

const Slide = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #${(props:Props)=> props.bg};
`
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`

const Image = styled.img`
  height: 80%;

`
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    margin: 50px 0;
    font-size: 20;
    font-weight: 500;
    letter-spacing: 3px
`;

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction: string) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1: 2)
        }
        else{
            setSlideIndex(slideIndex <  2 ? slideIndex + 1: 0)
        }
    }

  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item)=>(
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img}/>
            </ImgContainer>
            <InfoContainer>
              <Title>
                {item.title}
              </Title>
              <Desc>
                {item.desc}
              </Desc>
              <Link to="/login">
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider