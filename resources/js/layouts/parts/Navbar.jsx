import styled from "styled-components";
import Backdrop from "./Backdrop";

const StyledNav = styled.nav`
    background-color:  #000000;
    color: white;
    height: 100vh;
    width: 216px;
    position: relative;
    z-index: 1;
    padding: 35px 25px;
    &::before{
        content: "",
        background-color: rgba(0,0,0, .2);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    @media(max-width: 990px){
        position: fixed;
        transform: translate3d( ${p => p.visible ? 0 : "-220px"}, 0,0);
    };
    transition:  transform .3s ${p => p.visible ? "cubic-bezier( 0.4, 0, 1, 1)" : "cubic-bezier( 0, 0, 0.2, 1)"} !important;
`;

export function Navbar(props) {
    return (
        <>
            <Backdrop visible={props.visible} onClick={props.close} />
            <StyledNav {...props}>
                La chida navbar
            </StyledNav>
        </>
    )
}