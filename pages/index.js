import { Film } from "../components/Film";
import { FilmsWrapper } from "../components/FilmsWrapper";
import { MainFilm } from "../components/MainFilm";
import { NavBar } from "../components/NavBar";
import { useFilms } from "../hooks/useFilms"
import { useMedia } from "../hooks/useMedia"
import { ModalMobile } from "../components/ModalMobile/index"
import { ModalDesktop } from "../components/ModalDesktop/index"
import { useState } from "react";
import { Loader } from "../components/Loader/index";
import { Footer } from "../components/Footer";
import Head from "next/head";

export default function Home() {
  const {films,bestRateds,loading,filmMain} = useFilms();
  const {isDesktop} = useMedia();
  const [filmSelected,setFilmSelected] = useState(null);

  const handleClick = (e,film) => {
    e.preventDefault();
    setFilmSelected(film);
  }

  const handleCloseModal = () =>{
    setFilmSelected(null)
  }

  return (
    <div className="container">
      <NavBar />
      {loading ? <Loader /> : (
        <>
          <Head>
            <title>Studio Ghibli Films</title>
            <meta name="description" content="A place where you could see all the information about the films of this studio." />
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="translate" />
            <meta property="og:title" content="Studio Ghibli Films" />
            <meta property="og:description" content="A place where you could see all the information about the films of this studio." />
            <meta property="og:image" content="https://image.tmdb.org/t/p/original/etqr6fOOCXQOgwrQXaKwenTSuzx.jpg" />
          </Head>
          <MainFilm film={filmMain} onClick={(e)=>handleClick(e,filmMain)}/>
          <FilmsWrapper title="Best Rated">
            {bestRateds.map((film) => <Film film={film} key={film.id} onClick={(e)=>handleClick(e,film)} hover={true}/>)}
          </FilmsWrapper>
          <FilmsWrapper title="All Films">
            {films.map((film)=><Film film={film} key={film.id} onClick={e=>handleClick(e,film)} hover={true}/>)}
          </FilmsWrapper>
          <Footer />
          {isDesktop ? <ModalDesktop film={filmSelected} onClose={handleCloseModal}/> : <ModalMobile film={filmSelected} onClose={handleCloseModal}/>}</>
      )}
      <style jsx>{`
        div.container{
          min-height: 100%;
        }
      `}</style>
    </div>
  )
}
