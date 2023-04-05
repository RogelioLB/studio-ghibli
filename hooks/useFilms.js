import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { langContext } from "../context/langContext";

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function shuffleArray(inputArray){
    return inputArray.sort(()=> Math.random() - 0.5);
}

export const useFilms = () =>{
    const [films, setFilms] = useState([]);
    const [filmMain,setFilmMain] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bestRateds,setBestRateds] = useState([]);
    const {lang} = useContext(langContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await axios(
                    `/api/films?lang=${lang.lang}`
                );
                const dataParsed = result.data.map(film => {
                    return {
                        title: film.title,
                        description: film.description,
                        director: film.director,
                        producer: film.producer,
                        release_date: film.release_date,
                        rt_score: film.rt_score,
                        image: film.image,
                        poster:film.movie_banner,
                        time:film.running_time,
                        id:film.id
                    };
                })
                setFilmMain(dataParsed[random(0,dataParsed.length)]);
                setBestRateds(dataParsed.filter((film)=>film.rt_score>90))
                setFilms(shuffleArray(dataParsed));
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [lang]);
    
    return {films, loading,filmMain,bestRateds};
}