import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useRef,useEffect } from "react";
import Link from "next/link";
export function NavBar() {
  const nav = useRef();

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
        `}</style>
    </nav>
  );
}