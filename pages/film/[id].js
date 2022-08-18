import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Page404 } from "../../components/404";
import { NavBar } from "../../components/NavBar";
import Head from "next/head";
import { Footer } from "../../components/Footer";
import { useRef, useState, useEffect } from "react";
import Image from 'next/image'

export default function FilmPage({film,id}){
    const [selectedItem,setSelectedItem] = useState(0)
    const [objectVideo,setObjectVideo] = useState(null);
    const trailer = useRef()
    const es = useRef()
    const en = useRef()

    useEffect(()=>{
        const fetch = async() =>{
            const objectVideo = await (await axios.get(`https://studio-g.herokuapp.com/film/${film.id}`)).data
            setObjectVideo(objectVideo)
        }
        fetch()
        changeVideo(selectedItem)
    },[])

    const changeVideo = (id,e) =>{
        if(es.current) es.current.style.background="none"
        if(trailer.current) trailer.current.style.background="none"
        if(en.current) en.current.style.background="none"
        setSelectedItem(id);
        if(id===0)
            trailer.current.style.background="#154360"
        else if(id===1)
            es.current.style.background="#154360"
        else if(id===2)
            en.current.style.background="#154360"
    }

    const Trailer = () => {
        return(
            <>
                <iframe src={`https://youtube.com/embed/${id}`} />
                <style jsx>
                    {`
                        iframe{
                            width:100%;
                            height:100%;
                        }
                    `}
                </style>
            </>
        )
    }

    const Video = ({src}) =>{
        return(
            <>
                <iframe src={src} allowFullScreen/>
                <style jsx>
                    {`
                        iframe{
                            width:100%;
                            height:100%;
                        }
                    `}
                </style>
            </>
        )
    }

    return(
        <>
        {film ? (
            <>
            <Head>
                <title>{film.title}</title>
                <meta name="description" content={film.description} />
            </Head>
            <NavBar />
            <div className="film-page">
                <div className="film-image">
                    <img src={film.poster} alt={film.title}/>
                </div>
                <div className="film-info">
                    <h1>{film.title}</h1>
                    <p>{film.description}</p>
                    <div className="film-meta">
                        <h5>{film.release_date}</h5>
                        <h5>{film.time} min.</h5>
                        <h5>{film.rt_score}<span><FontAwesomeIcon icon={faStar}/></span></h5>
                    </div>
                    <div className="film-people">
                        <h3>Producer: </h3>
                        <h4>{film.producer}</h4>
                        <h3>Director:</h3>
                        <h4>{film.director}</h4>
                    </div>
                    <div className="video-container">
                        <nav>
                            <ul>
                                <li onClick={e => changeVideo(0,e)} ref={trailer}>Trailer</li>
                                {objectVideo?.opciones[0] && (<li onClick={e => changeVideo(1,e)} ref={es}><Image src="/mx.png" alt="es" width={20} height={20}/>{objectVideo?.opciones[0].type}</li>)}
                                {objectVideo?.opciones[1] && (<li onClick={e => changeVideo(2,e)} ref={en}>{objectVideo?.opciones[1].type}</li>)}
                            </ul>
                        </nav>
                        <div className="video">
                            {
                                selectedItem === 0 && (<Trailer />) ||
                                selectedItem === 1 && (<Video src={objectVideo?.opciones[0].url} />) ||
                                selectedItem === 2 && (<Video src={objectVideo?.opciones[1].url} />)
                            }
                        </div>
                    </div>
                    
                </div>
                <style jsx>{`
                    .film-image{
                        width: 100%;

                    }
                    .film-image img{
                        max-width:100%;
                        width: 100%;
                    }
                    .film-info{
                        padding:10px;
                        font-size:1em;
                    }
                    .film-info h1{
                        margin-bottom:10px;
                    }
                    .film-meta{
                        display:flex;
                        gap:20px;
                        margin:5px 0;
                        font-size:.9em;
                        color:#BDBDBD;
                    }
                    .film-meta h5 span{
                        margin-left:5px;
                        color:#ffc107;
                    }
                    .film-people h3{
                        font-size:1.2em;
                        font-weight:600;
                    }
                    .film-people h4{
                        font-size:.9em;
                        font-weight:400;
                    }
                    .video-container{
                        max-width:90%;
                        margin:30px auto;
                        background-color: #154360;
                        padding-bottom:15px;
                    }
                    .video{
                        max-width:95%;
                        height:600px;
                        background-color:black;
                        margin:10px auto 0 auto;
                    }
                    @media(max-width:768px){
                        .video{height:250px;}
                    }
                    nav{
                        background-color: #1b4f72;
                    }
                    nav ul{
                        display:flex;
                        list-style:none;
                    }
                    nav ul li{
                        cursor:pointer;
                        transition: all .2s;
                        padding:10px 15px;
                        display:flex;
                        align-items:center;
                    }
                `}</style>
                <Footer />
            </div>
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
        const res = (await (await axios.get(`https://ghibliapi.herokuapp.com/films/${id}`)).data);
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
                id:res.id
            };
            const result = await axios.post("https://studio-ghibli-rho.vercel.app/api/film",{
                title:film.title
            })

        return {props:{film,id:result.data.id}}
    }catch(err){
        console.log(err)
        return {props:{film:null}}
    }
}