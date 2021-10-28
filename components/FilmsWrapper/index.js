export function FilmsWrapper({children,title}) {
  return (
    <>
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="films-wrapper">
        {children}
      </div>
      <style jsx>{`
            .films-wrapper {
                padding:0 15px;
                display:flex;
                gap:10px;
                align-items:center;
                overflow-x:scroll;
                overflow-y:hidden;
                width:100%;
            }
            .title{
              font-size:.9em;
              margin-top:10px;
              padding:5px 10px;
            }
        `}</style>
    </>
  )
}