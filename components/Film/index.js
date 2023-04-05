import { useMedia } from "../../hooks/useMedia";
import Image from "next/image"

export function Film({film,onClick,hover}) {
  const {isDesktop} = useMedia()
  
  return (
    <div className="film" onClick={onClick}>
        <div className="film-image">
          <Image src={film.image.src} alt={film.title} layout="fill" placeholder="blur" blurDataURL={film.image.base64}/>
          {
            hover && (<><div></div>
          <h4>{film.title}</h4></>)
            }
        </div>
        <style jsx>{`
        .film{
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
          width:170px;
          aspect-ratio:10/15;
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