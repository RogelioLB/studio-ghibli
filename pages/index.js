import { Film } from "../components/Film";
import { Footer } from "../components/Footer";
import { FilmsWrapper } from "../components/FilmsWrapper";
import { MainFilm } from "../components/MainFilm";
import { NavBar } from "../components/NavBar";
import { random, shuffleArray, useFilms } from "../hooks/useFilms";
import { useState } from "react";
import Head from "next/head";
import { getPlaiceholder } from "plaiceholder";
import axios from "axios";
import Modal from "../components/Modal";

export default function Home({ filmMain, films, bestRated }) {
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
      <MainFilm film={filmMain} onClick={(e) => handleClick(e, filmMain)} />
      <FilmsWrapper title="Movies 🎬">
        {films.map((film)=><Film film={film} key={film.id} hover onClick={e=>handleClick(e,film)}/>)}
      </FilmsWrapper>
      <FilmsWrapper title="Best Rated 🏆">
        {bestRated.map((film)=><Film film={film} key={film.id} hover onClick={e=>handleClick(e,film)} />)}
      </FilmsWrapper>
      <Footer />
      <Modal film={filmSelected} onClose={handleCloseModal} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let dataParsed;
  const {lang="en"} = context.query;
  try {
    const result = await axios(`${process.env.API_BASE}/api/films?lang=${lang}`);

    dataParsed = await Promise.all(
      result.data.map(async (film) => {
        const image_base64 = await (
          await getPlaiceholder(film.image, { size: 10 })
        ).base64;
        const poster_base64 = await (
          await getPlaiceholder(film.movie_banner, { size: 10 })
        ).base64;
        return {
          title: film.title,
          description: film.description,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          rt_score: film.rt_score,
          image: {
            src: film.image,
            base64: image_base64,
          },
          poster: {
            src: film.movie_banner,
            base64: poster_base64,
          },
          time: film.running_time,
          id: film.id,
        };
      })
    );
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      films: shuffleArray(dataParsed),
      bestRated: dataParsed.filter((film) => film.rt_score > 90),
      filmMain: dataParsed.find(film=>film.id==="58611129-2dbc-4a81-a72f-77ddfc1b1b49"),
    },
  };
}
