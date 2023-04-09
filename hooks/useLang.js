import { useContext } from "react";
import { langContext } from "../context/langContext";

export default function useLang(){
    const {lang} = useContext(langContext)

    return lang
}