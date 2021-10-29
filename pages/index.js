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
          <MainFilm film={filmMain} onClick={(e)=>handleClick(e,filmMain)}/>
          <FilmsWrapper title="Best Rated">
            {bestRateds.map((film) => <Film film={film} key={film.id} onClick={(e)=>handleClick(e,film)} hover={true}/>)}
          </FilmsWrapper>
          <FilmsWrapper title="All Films">
            {films.map((film)=><Film film={film} key={film.id} onClick={e=>handleClick(e,film)} hover={true}/>)}
          </FilmsWrapper>
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
