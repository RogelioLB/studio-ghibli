import { createContext, useState } from "react";

export const langContext = createContext({lang:"en"});

export default function LangContext({children}){
    const [lang,setLang] = useState({lang:"en"})

    const updateLang = (lang) =>{
        setLang({lang:lang})
    }
    return (
        <langContext.Provider value={{lang,updateLang}}>
            {children}
        </langContext.Provider>
    )
}