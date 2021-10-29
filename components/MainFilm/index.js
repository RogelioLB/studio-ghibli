import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMedia } from "../../hooks/useMedia";

export function MainFilm({film,onClick}) {
    const {isDesktop} = useMedia();
    return (
        <div>
            <div className="image-film" onClick={onClick}>
                <img src={isDesktop ? film.poster : film.image} alt={film.title}/>
                <div className="title-film">
                    <h1>{film.title}<span><FontAwesomeIcon icon={faInfoCircle}/></span></h1>
                </div>
            </div>
            <style jsx>{`
                .image-film {
                    width: 100%;
                    height:${isDesktop ? '100vh' : 'auto'};
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
                img{
                    width:100%;
                    object-fit:cover;
                    height:${isDesktop ? '100vh' : 'auto'};
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