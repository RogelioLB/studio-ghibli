import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMedia } from "../../hooks/useMedia";
import Image from "next/image"
import MediaQuery from "react-responsive";

export function MainFilm({film,onClick}) {
    return (
        <div>
        <MediaQuery minWidth={768}>
            <div className="image-film" onClick={onClick} style={{aspectRatio:"16/8"}}>
                <Image 
                        placeholder="blur" 
                        blurDataURL={film.poster.base64 }  
                        src={film.poster.src} 
                        alt={film.title} 
                        layout="fill" 
                    />
                <div className="title-film">
                    <h1>{film.title}<span><FontAwesomeIcon icon={faInfoCircle}/></span></h1>
                </div>
            </div>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
        <div className={`image-film`} onClick={onClick}>
                <Image 
                        placeholder="blur" 
                        blurDataURL={film.image.base64 }  
                        src={film.image.src} 
                        alt={film.title} 
                        layout="fill" 
                    />
                <div className="title-film">
                    <h1>{film.title}<span><FontAwesomeIcon icon={faInfoCircle}/></span></h1>
                </div>
            </div>
        </MediaQuery>
            <style jsx>{`
                .image-film {
                    width:100vw;
                    aspect-ratio: 9/12;
                    position: relative;
                }
                
                .image-film:before{
                    content: '';
                    position:absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index:1;
                    box-shadow: inset 0 0px 36px black;
                }
                .title-film{
                    position: absolute;
                    z-index:1;
                    bottom:40px;
                    width:85%;
                    left:50%;
                    transform: translateX(-50%);
                    text-align:center;
                    display:flex;
                    justify-content:center;
                }
                .title-film h1{
                    position:relative;
                    width:max-content;
                }
                .title-film span{
                    font-size:1.1rem;
                    position:absolute;
                    top:0;
                    right:-23px;
                    cursor:pointer;
                }
            `}</style>
        </div>
  );
}