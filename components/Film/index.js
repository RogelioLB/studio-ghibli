import { useMedia } from "../../hooks/useMedia";

export function Film({film,onClick,hover}) {
  const {isDesktop} = useMedia()
  return (
    <div className="film" onClick={onClick}>
        <div className="film-image">
          <img src={film.image} alt={film.title}/>
        </div>
        <style jsx>{`
        .film{
            height:${isDesktop ? "300px":"200px"};
            cursor:${hover ? "pointer" : "default"};
        }
        .film img{
            height:100%;
            object-fit:cover;
            transition:transform .4s;
        }

        .film-image{
          height:100%;
          overflow: hidden;
        }

        .film:hover img{
          transform:${hover ? "scale(1.5)" : "scale(1)"};
        }
        `}</style>
    </div>
  );
}