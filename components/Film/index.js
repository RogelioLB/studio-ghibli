export function Film({film,onClick}) {
  return (
    <div className="film" onClick={onClick}>
        <img src={film.image} alt={film.title}/>
        <style jsx>{`
        .film{
            height:200px;
            cursor:pointer;
        }
        .film img{
            height:100%;
            object-fit:cover;
        }
        `}</style>
    </div>
  );
}