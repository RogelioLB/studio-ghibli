import styled from "styled-components";
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"

const ModalContainer = styled.div`
    z-index:3;
    padding:10px 20px;
    width:50%;
    position:fixed;
    top: 50%;
    left: 50%;
    transform:${props=>!props.hide ? "translate(-50%,-50%)" : "translate(-50%,5000px)"};
    background:#000000;
    transition: transform 1s ease;

    @media (max-width:768px){
        bottom:0;
        transform:${props=>!props.hide ? "translateY(0)" : "translateY(300px)"};
        height:${props=>props.hide ? "299px" : "auto"};
        left:0;
        top:unset;
        width: 100%;
    }
`

const ModalContainerData = styled.div`
    display:flex;
    gap:20px;
    margin-bottom:20px;
`

const ModalImage = styled.div`
    position:relative;
    width:180px;
    aspect-ratio: 9/12;
`

const IconClose = styled.span`
    text-align: right;
    display: inline-block;
    width:100%;
`

const DataFilm = styled.div`
    flex:1;
`

const TitleFilm = styled.h2`
    font-weight: 700;
    font-size: 25px;
`

const DescriptionFilm = styled.p`
    text-overflow: ellipsis;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 11;
`

const ButtonSeeMore = styled.button`
    background:red;
    color:white;
    top:0;
    width:100%;
    font-weight:700;
    font-size:1.2em;
    display:flex;
    align-items: center;
    justify-content: center;
    gap:6px;
    right:0;
    position:relative;
    border-radius:2px;
    transition: background .4s;
    border:none;
    padding:10px;
    margin-bottom:10px;
    cursor:pointer;

    &:hover{
        background-color: #a10101;
    }
`


export default function Modal({film,onClose}){
    const hide = film ? false : true
    return(
        <ModalContainer hide={hide}>
            <IconClose><FontAwesomeIcon style={{cursor:"pointer"}} icon={faTimes} onClick={onClose}/></IconClose>
            {!hide && 
                (<ModalContainerData>
                    <ModalImage>
                        <Image src={film.image.src} placeholder="blur" blurDataURL={film.image.base64} alt={film.title} layout="fill"/>
                    </ModalImage>
                    <DataFilm>
                        <TitleFilm>{film.title}</TitleFilm>
                        <DescriptionFilm>{film.description}</DescriptionFilm>
                    </DataFilm>
                </ModalContainerData>)
            }
            {film && (
                <Link href={`/film/${film.id}`}>
                    <a><ButtonSeeMore>See More<FontAwesomeIcon icon={faInfoCircle}/></ButtonSeeMore></a>
                </Link>)
            }
        </ModalContainer>
    )
}