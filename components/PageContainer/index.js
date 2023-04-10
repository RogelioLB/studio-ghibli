import styled from "styled-components"

const PageContainer = styled.div`
    backdrop-filter:blur(10px);
    position:relative;
    overflow-y: hidden;

    &:before{
        position:absolute;
        content:"";
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:-1;
        background-color:rgb(0 0 0 /.6);
    }
`
export default PageContainer;