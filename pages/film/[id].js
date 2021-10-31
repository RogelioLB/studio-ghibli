import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Page404 } from "../../components/404";
import { NavBar } from "../../components/NavBar";

export default function FilmPage({film}){
    return(
        <>
        {film ? (
            <>
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
                        font-size:.9em;
                        font-weight:600;
                    }
                    .film-people h4{
                        font-size:.9em;
                        font-weight:400;
                    }
                `}</style>
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
        return {props:{film}}
    }catch(err){
        return {props:{film:null}}
    }
}