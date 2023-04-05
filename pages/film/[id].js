import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Page404 } from "../../components/404";
import { NavBar } from "../../components/NavBar";
import Head from "next/head";
import { Footer } from "../../components/Footer";
import { useMedia } from "../../hooks/useMedia";


export default function FilmPage({film,id}){
    const {isDesktop} = useMedia()

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
            <div className="film-page">
                <div className="film-image">
                    <img src={film.poster} alt={film.title}/>
                </div>
                <div className="film-info">
                    <div className="film-data-container">
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
                    </div>
                    <div className="video-container">
                        <Trailer />
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
                        display:flex;
                        flex-direction: ${isDesktop ? "flex" : "column"};
                    }

                    .film-info h1{
                        margin-bottom:10px;
                    }
                    .film-data-container{
                        flex:.78;
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
                        aspect-ratio:16/9;
                        padding-bottom:15px;
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
        const res = (await (await axios.get(`${process.env.API_BASE}/api/films/${id}?lang=es`)).data);
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
            const result = await axios.post(`${process.env.API_BASE}/api/film`,{
                title:film.title
            })

        return {props:{film,id:result.data.id}}
    }catch(err){
        console.log(err)
        return {props:{film:null}}
    }
}