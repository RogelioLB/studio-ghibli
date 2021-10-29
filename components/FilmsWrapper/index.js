import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useMedia } from "../../hooks/useMedia";

export function FilmsWrapper({children,title}) {
  const {isDesktop} = useMedia();
  const wrapper = useRef(null);

  const handleLeft = () =>{
    wrapper.current.scrollLeft -= 300;
  }

  const handleRight = () =>{
    wrapper.current.scrollLeft += 300;
  }

  return (
    <>
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="wrapper">
        <button onClick={handleLeft}><FontAwesomeIcon icon={faArrowLeft}/></button>
        <div className="films-wrapper" ref={wrapper}>
          {children}
        </div>
        <button onClick={handleRight}><FontAwesomeIcon icon={faArrowRight}/></button>
      </div>
      <style jsx>{`
          .wrapper{
            display: flex;
          }
          .films-wrapper {
              padding:${isDesktop ? "0" : "0 15px"};
              display:flex;
              flex:1;
              gap:10px;
              align-items:center;
              overflow-x:scroll;
              overflow-y:hidden;
              overflow-x: ${isDesktop ? "hidden" : "scroll"};
              position:relative;
              width:100%;
              scroll-behavior:smooth;
          }
          .title{
            font-size:.9em;
            margin-top:10px;
            padding:5px 10px;
          }
          button{
            width:40px;
            font-size:1.2em;
            background:rgba(0,0,0,.5);
            color:white;
            border:none;
            transition:all .2s ease-in-out;
            cursor:pointer;
          }
          button:active{
            font-size:1.6em;
          }
        `}</style>
    </>
  )
}