import { useRouter } from "next/router";
import { createContext, useState } from "react";

export const langContext = createContext({lang:"en"});

export default function LangContext({children}){
    const router = useRouter()
    const {lang="en"} = router.query

    return (
        <langContext.Provider value={{lang}}>
            {children}
        </langContext.Provider>
    )
}