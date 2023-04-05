import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styled from "styled-components";
import { useMedia } from "../../hooks/useMedia";

const Wrapper = styled.div`
  display:flex;
`

const WrapperFilms = styled.div`
  padding:0;
  display:flex;
  flex:1;
  gap:15px;
  align-items:center;
  overflow-x:hidden;
  overflow-y:hidden;
  position:relative;
  width:100%;
  scroll-behavior:smooth;
  backdrop-filter: blur(10px);
  position: relative;
  background-color:rgb(0 0 0 / .6);

  @media(max-width:768px){
    overflow-x:scroll;
  }
`

const ArrowButton = styled.button`
  width:40px;
  font-size:1.2em;
  background:rgba(0,0,0);
  color:white;
  border:none;
  transition:all .2s ease-in-out;
  cursor:pointer;

  &:active{
    font-size:1.6em;
  }
`

const Title = styled.h2`
  padding:10px;
  backdrop-filter:blur(10px);
  z-index:2;
  &:after{
    content:"";
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background-color:rgb(0 0 0 /.6);
    z-index:-1;
  }
`

export function FilmsWrapper({children,title}) {
  const wrapper = useRef(null);

  const handleLeft = () =>{
    wrapper.current.scrollLeft -= 300;
  }

  const handleRight = () =>{
    wrapper.current.scrollLeft += 300;
  }

  return (
    <>
      <Title>
        {title}
      </Title>
      <Wrapper>
        <ArrowButton onClick={handleLeft}><FontAwesomeIcon icon={faArrowLeft}/></ArrowButton>
        <WrapperFilms className="films-wrapper" ref={wrapper}>
          {children}
        </WrapperFilms>
        <ArrowButton onClick={handleRight}><FontAwesomeIcon icon={faArrowRight}/></ArrowButton>
      </Wrapper>
    </>
  )
}