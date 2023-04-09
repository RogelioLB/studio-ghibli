import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Page404 } from "../../components/404";
import { NavBar } from "../../components/NavBar";
import Head from "next/head";
import { Footer } from "../../components/Footer";
import Image from "next/image"
import {getPlaiceholder} from "plaiceholder"
import Trailer from "../../components/Trailer";
import PageContainer from "../../components/PageContainer";
import styled from "styled-components";

const FilmImage = styled.div`
    width: 100%;
    position:relative;
    aspect-ratio:16/9;
`

const FilmInfo = styled.div`
    padding:10px;
`

const FilmMetadata = styled.div`

`

const FilmData = styled.div`
    overflow:hidden;
`

const FilmRating = styled.div` 
    background-color:${props=>props.rating >= 80 ? "#16c116" : props.rating <= 79 && props.rating >= 60 ? "#c3c300" : "red"};
    width:100px;
    height:100px;
    display:flex;
    align-items:center;
    font-size:28px;
    justify-content:center;
    float:left;
    font-weight:700;
    border-radius:10px;
    margin-right:15px;
`

const FilmWrapper = styled.div`
    margin:20px 0;
`


export default function FilmPage({film,id}){
    return(
        <>
        {film ? (
            <>
            <Head>
                <title>{film.title}</title>
                <meta name="description" content={film.description} />
                <meta name="robots" content="index,follow" />
                <meta name="googlebot" content="translate" />
                <meta property="og:title" content={film.title} />
                <meta property="og:description" content={film.description} />
                <meta property="og:image" content={film.poster} />
            </Head>
            <NavBar />
            <PageContainer>
                <FilmImage>
                    <Image src={film.poster} alt={film.title} placeholder="blur" blurDataURL={film.base64} layout="fill" />
                </FilmImage>
                <FilmInfo>
                    <FilmMetadata>
                        <FilmData>
                            <h1>{film.title}</h1>
                            <FilmWrapper>
                                <FilmRating rating={film.rt_score}>
                                    {film.rt_score}
                                </FilmRating>
                                {film.description}
                            </FilmWrapper>
                        </FilmData>
                    </FilmMetadata>
                    <div className="video-container" style={{marginTop:10}}>
                    <Trailer src={`https://www.youtube.com/embed/${id}`} />
                </div>
                </FilmInfo>
                <Footer />
            </PageContainer>
            </>
        )
        :   
        <Page404 />
        }
        </>
    )
}

export async function getServerSideProps(context){
    const {id} = context.query;
    
    try{
        const res = (await (await axios.get(`${process.env.API_BASE}/api/films/${id}?lang=en`)).data);
        const {base64} = await getPlaiceholder(res.movie_banner)
        const film = {
                title: res.title,
                description: res.description,
                director: res.director,
                producer: res.producer,
                release_date: res.release_date,
                rt_score: res.rt_score,
                image: res.image,
                poster:res.movie_banner,
                time:res.running_time,
                id:res.id,
                base64
            };
            const result = await axios.post(`${process.env.API_BASE}/api/film`,{
                title:film.title
            })

        return {props:{film,id:result.data.id}}
    }catch(err){
        console.log(err)
        return {props:{film:null}}
    }
}