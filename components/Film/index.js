export function Film({film,onClick,hover}) {
  return (
    <div className="film" onClick={onClick}>
        <img src={film.image} alt={film.title}/>
        <style jsx>{`
        .film{
            height:200px;
            cursor:${hover ? "pointer" : "default"};
            overflow:clip;
        }
        .film img{
            height:100%;
            object-fit:cover;
            transition:transform .4s;
        }

        .film:hover img{
          transform:${hover ? "scale(1.3)" : "scale(1)"};
        }
        `}</style>
    </div>
  );
}