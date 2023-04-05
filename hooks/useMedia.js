import {useMediaQuery} from "react-responsive"
export const useMedia = () =>{
    const isDesktop = useMediaQuery({
        query:"(min-width:768px)"
    })
    const isMobile = useMediaQuery({
        query:"(max-width:768px)"
    })

    return {isDesktop,isMobile}
}