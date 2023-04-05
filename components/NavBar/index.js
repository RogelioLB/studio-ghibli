import Image from "next/image"
import { useRef,useEffect, useContext } from "react";
import Link from "next/link";
import { langContext } from "../../context/langContext";
export function NavBar() {
  const nav = useRef();
  const {lang,updateLang} = useContext(langContext)

  const handleClick = () =>{
    if(lang.lang==="en") updateLang("es")
    else updateLang("en")
  }

  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(nav.current){
        if(scrollY>5)
        nav.current.style.backgroundColor = "#000000";
        else
          nav.current.style.backgroundColor = "transparent";
      }
    })
  },[])

  return (
    <nav ref={nav}>
        <Link href="/"><a><img src="/logo.svg" alt="Studio Ghibli" /></a></Link>
        {
          //lang.lang === "en" ? <img className="bandera" src="/usa.svg" onClick={handleClick} alt="USA" /> : <img className="bandera" onClick={handleClick} src="/mx.webp" alt="ES"/>
        }
        <style jsx>{`
        nav{
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:15px;
            background-color: transparent;
            position:fixed;
            top:0;
            width:100%;
            transition:background-color 0.5s ease-in-out;
            z-index:3;
        }
        img{
            width:120px;
        }
        button{
            background:transparent;
            color:white;
            border:none;
            width:40px;
            height:40px;
            display:grid;
            place-items:center;
            font-size:1.3rem;
        }
        .bandera{
          aspect-ratio:16/9;
          width:40px;
        }
        `}</style>
    </nav>
  );
}