import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMedia } from "../../hooks/useMedia";
import Image from "next/image"
import MediaQuery from "react-responsive";
import styled from "styled-components";

const FilmContainer = styled.div`
    position:relative;
    width:100%;
    aspect-ratio: 9/12;
    &:before{
        content:"";
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color: rgb(0 0 0 /.3);
        z-index:1;
    }

    @media (min-width:768px) {
        aspect-ratio: 16/7;
    }
`

const FilmTitle = styled.h2`
    position:absolute;
    bottom:20px;
    z-index: 2;
    font-size:28px;
    left:0;
    right:0;
    text-align: center;
    font-weight: 700;
`

export function MainFilm({film,onClick}) {
    const {isDesktop} = useMedia()
    return (
        <FilmContainer onClick={onClick}>
            <Image src={isDesktop ? film.poster.src : film.image.src} alt={film.title} layout="fill" placeholder="blur" blurDataURL={film.image.base64}/>
            <FilmTitle>{film.title}</FilmTitle>
        </FilmContainer>
  );
}