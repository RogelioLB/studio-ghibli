import { useMedia } from "../../hooks/useMedia"
import Link from "next/link"
import Head from "next/head"

export function Page404(){
    const {isDesktop} = useMedia();
    return (
        <>
            <Head>
                <title>404 Not Found</title>
            </Head>
            <div className="page404">
                <div className="content">
                    <img src="/totoro-lloro.gif" alt="Totoro llorando"/>
                    <div className="text">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                        <Link href="/"><a>Return to main page.</a></Link>
                    </div>
                </div>
                <style jsx>{`
                    .page404{
                        height:100vh;
                        width:100vw;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        color:black;
                    }
                    .content{
                        background-color: #fff;
                        border-radius: 5px;
                        overflow: hidden;
                        padding: 20px;
                        display:flex;
                        flex-direction:${isDesktop ? "row" : "column"};
                    }
                    img{
                        height:300px;
                        object-fit:cover;
                    }
                    h1{
                        font-size:3em;
                    }
                    h2{
                        font-size:1.5em;
                    }
                    a{
                        background-color: #09d1ff;
                        color:white;
                        border-radius:2px;
                        margin-top:10px;
                        font-weight:500;
                        font-size:1.1em;
                        padding:10px 15px;
                        display:inline-block;
                    }
                `}</style>
            </div>
        </>
    )
}