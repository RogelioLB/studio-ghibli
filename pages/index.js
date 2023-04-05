import { Film } from "../components/Film";
import { FilmsWrapper } from "../components/FilmsWrapper";
import { MainFilm } from "../components/MainFilm";
import { NavBar } from "../components/NavBar";
import { random, shuffleArray, useFilms } from "../hooks/useFilms";
import { useMedia } from "../hooks/useMedia";
import { ModalMobile } from "../components/ModalMobile/index";
import { ModalDesktop } from "../components/ModalDesktop/index";
import { useState } from "react";
import { Loader } from "../components/Loader/index";
import { Footer } from "../components/Footer";
import Head from "next/head";
import { getPlaiceholder } from "plaiceholder";
import axios from "axios";
import MediaQuery from 'react-responsive'

export default function Home({ filmMain, films, bestRated }) {
  const { isDesktop } = useMedia();
  const [filmSelected, setFilmSelected] = useState(null);

  const handleClick = (e, film) => {
    e.preventDefault();
    setFilmSelected(film);
  };

  const handleCloseModal = () => {
    setFilmSelected(null);
  };

  return (
    <div className="container">
      <Head>
        <title>Studio Ghibli Films</title>
        <meta
          name="description"
          content="A place where you could see all the information about the films of this studio."
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="translate" />
        <meta property="og:title" content="Studio Ghibli Films" />
        <meta
          property="og:description"
          content="A place where you could see all the information about the films of this studio."
        />
        <meta
          property="og:image"
          content="https://image.tmdb.org/t/p/original/etqr6fOOCXQOgwrQXaKwenTSuzx.jpg"
        />
      </Head>
      <NavBar />
        <>
          <MainFilm
            film={filmMain}
            onClick={(e) => handleClick(e, filmMain)}
          />
          <FilmsWrapper title="Best Rated">
            {bestRated.map((film) => (
              <Film
                film={film}
                key={film.id}
                onClick={(e) => handleClick(e, film)}
                hover={true}
              />
            ))}
          </FilmsWrapper>
          <FilmsWrapper title="All Films">
            {films.map((film) => (
              <Film
                film={film}
                key={film.id}
                onClick={(e) => handleClick(e, film)}
                hover={true}
              />
            ))}
          </FilmsWrapper>
          <Footer />
          <MediaQuery maxWidth={768}>
            <ModalMobile film={filmSelected} onClose={handleCloseModal} />
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <ModalDesktop film={filmSelected} onClose={handleCloseModal} />
          </MediaQuery>
        </>
      <style jsx>{`
        div.container {
          min-height: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  let dataParsed;
  try {
    const result = await axios(`${process.env.API_BASE}/api/films?lang=en`);
    
    dataParsed = await Promise.all(
      result.data.map(async (film) => {
        const image_base64 = await (await getPlaiceholder(film.image,{size:10})).base64
        const poster_base64 = await (await getPlaiceholder(film.movie_banner,{size:10})).base64
        return {
          title: film.title,
          description: film.description,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          rt_score: film.rt_score,
          image: {
            src:film.image,
            base64:image_base64
          },
          poster:{
            src:film.movie_banner,
            base64:poster_base64
          },
          time: film.running_time,
          id: film.id
        };
      })
    );
  } catch (err) {
    console.log(err);
  }
  return {
    props:{
      films:shuffleArray(dataParsed),
      bestRated: dataParsed.filter((film)=>film.rt_score>90),
      filmMain:dataParsed[random(0,dataParsed.length-1)]
    }
  }
}
