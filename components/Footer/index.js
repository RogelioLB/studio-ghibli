import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Footer() {
  return (
    <footer>
        <h3>Created By RogelioLB<span><FontAwesomeIcon icon={faHeart}/></span></h3>
        <style jsx>{`
            footer {
                height:60px;
                background-color:#000000;
                margin-top:20px;
                display:flex;
                align-items:center;
                justify-content:center;
                position:relative;
                backdrop-filter:blur(10px);
            }
            footer:before{
                    content:"";
                    position:absolute;
                    z-index:-1;
                    top:-20px;
                    left:0;
                    right:0;
                    bottom:0;
                    background-color:rgb(0 0 0 / .6)
                }
            h3{
                font-size:1rem;
            }
            span{
                color:#ff0000;
                margin-left:5px;
            }
        `}</style>
    </footer>
  )
}