import {Film} from "../Film"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
export function ModalMobile({film,onClose}){
    return(
        <div className="modal" onClick={(e)=>e.stopPropagation()}>
            {film ? (
                <>
                <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                <div className="info">
                    <div className="image">
                        <Film film={film}/>
                    </div>
                    <div className="content">
                        <div className="title"><h3>{film.title}</h3></div>
                        <div className="meta">
                            <h5>{film.release_date}</h5>
                            <h5>{film.time}min.</h5>
                        </div>
                        <div className="description"><p>{film.description}</p></div>
                    </div>
                </div>
                <Link href={`/film/${film.id}`}>
                    <a><button>See More<FontAwesomeIcon icon={faInfoCircle}/></button></a>
                </Link>
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
                width:100%;
                position:fixed;
                bottom:0;
                transform:${film ? "translateY(0)" : "translateY(300px)"};
                background:#000000;
                transition: all .6s ease;
            }
            .info{
                display:flex;
            }
            .hide{
                height:200px;
            }
            .content{
                margin-left:10px;
            }
            .title{
                width:90%;
            }
            .title h3{
                white-space: nowrap;
                font-size:1.2em;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .description{
                display: -webkit-box;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size:.9em;
                text-overflow: ellipsis;
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

            a button{
                background:white;
                color:black;
                top:0;
                width:100%;
                font-size:1.2em;
                margin-top:10px;
                gap:6px;
                right:0;
                position:relative;
                border-radius:2px;
            }
            `}</style>
        </div>
    )
}