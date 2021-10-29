export function Loader(){
    return(
        <div className="loader">
            <img src="/totoro-top.gif" alt="Totoro" />
            <style jsx>{`
                .loader{
                    height:100vh;
                    width:100vw;
                    display:grid;
                    place-items:center;
                }
                img{
                    width:200px;
                }
            `}</style>
        </div>
    )
}