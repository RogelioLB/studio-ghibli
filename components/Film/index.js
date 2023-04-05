import { useMedia } from "../../hooks/useMedia";

export function Film({film,onClick,hover}) {
  const {isDesktop} = useMedia()
  
  return (
    <div className="film" onClick={onClick}>
        <div className="film-image">
          <img src={film.image.src} alt={film.title}/>
          {
            hover && (<><div></div>
          <h4>{film.title}</h4></>)
            }
        </div>
        <style jsx>{`
        .film{
            height:${isDesktop ? "300px":"200px"};
            cursor:${hover ? "pointer" : "default"};
        }

        h4{
          position:absolute;
          bottom:10px;
          transform:translate(0,300px);
          left:10px;
          transition:transform .2s ease;
        }

        .film img{
            height:100%;
            object-fit:cover;
            transition:transform .4s;
        }

        .film-image{
          height:100%;
          position:relative;
          transition: .3s;
          overflow: hidden;
        }

        .film-image div{
          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          background:rgba(0,0,0,.7);
          transform:translate(0,300px);
          transition:transform .1s ease;
        }

        .film-image:hover div{
          transform:translate(0,0px);
        }

        .film:hover img{
          transform:${hover ? "scale(1.5)" : "scale(1)"};
        }

        .film:hover h4{
          transform:translate(0,0px);
        }
        `}</style>
    </div>
  );
}