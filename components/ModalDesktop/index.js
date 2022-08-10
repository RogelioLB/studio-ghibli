import {Film} from "../Film"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
export function ModalDesktop({film,onClose}){
    return(
        <div className="modal" onClick={(e)=>e.stopPropagation()}>
            {film ? (
                <>
                <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                <div className="info">
                    <div className="image">
                        <Film film={film} />
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <div className="data-important">
                                <div className="title"><h3>{film.title}</h3></div>
                                <div className="meta">
                                    <h5>{film.release_date}</h5>
                                    <h5>{film.time}min.</h5>
                                </div>
                            </div>
                            <div className="description"><p>{film.description}</p></div>
                        </div>
                        <Link href={`/film/${film.id}`}>
                            <a><button>See More<FontAwesomeIcon icon={faInfoCircle}/></button></a>
                        </Link>
                    </div>
                </div>
                </>
            )
            :
            (
                <div className="hide"></div>
            )}
            <style jsx>{`
            .modal{
                z-index:3;
                padding:10px;
                width:80%;
                position:fixed;
                top: 50%;
                left: 50%;
                transform:${film ? "translate(-50%,-50%)" : "translate(-50%,-1000%)"};
                background:#000000;
                transition: all 1s ease;
            }
            .info{
                display:flex;
            }
            .hide{
                height:200px;
            }
            .image :global(*){
                height:350px;
            }
            .content-container{
                margin-left:10px;
                display:flex;
                flex-direction:column;
            }
            .content{
                height:100%;
            }
            .title{
                width:90%;
            }
            .title h3{
                font-size:1.9em;
            }
            .description{
                display: -webkit-box;
                -webkit-line-clamp: 11;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size:1.1em;
                margin-top:10px;
                text-overflow: ellipsis;
            }
            .description p{
                overflow: hidden;
            }
            .meta{
                color:#BDBDBD;
                font-size:.9em;
                display:flex;
                gap:20px;
            }
            button{
                position:absolute;
                width:30px;
                height:30px;
                top:0px;
                right:0px;
                background:transparent;
                color:white;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:1.2em;
                border:none;
                cursor:pointer;
            }
            a{
                margin:auto 0 0 0;
            }

            a button{
                background:red;
                color:white;
                top:0;
                width:100%;
                font-weight:700;
                font-size:1.2em;
                gap:6px;
                right:0;
                position:relative;
                border-radius:2px;
                transition: background .4s;
            }
            a button:hover{
                background:#b50404;
            }

            a button:active{
                transform:translateY(2px);
            }
            `}</style>
        </div>
    )
}