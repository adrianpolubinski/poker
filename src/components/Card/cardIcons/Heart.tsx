import styled from "styled-components";

const Svg = styled.svg`
    height: 100%;
    width: 100%;
`


function Heart() {
    return (
        <Svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320.000000 290.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,290.000000) scale(0.100000,-0.100000)"
        fill="#ff0000" stroke="none">
        <path d="M683 2850 c-189 -34 -408 -185 -526 -363 -112 -169 -140 -268 -140
        -497 -1 -478 161 -764 658 -1164 50 -40 178 -139 285 -221 341 -258 532 -431
        595 -539 15 -25 28 -46 29 -46 1 0 78 75 171 168 193 190 335 311 593 505 437
        330 606 504 728 752 64 132 89 223 104 384 13 143 1 321 -31 445 -66 259 -291
        478 -574 558 -115 32 -325 32 -439 0 -225 -65 -389 -206 -495 -424 l-48 -100
        -21 69 c-42 138 -176 295 -331 386 -134 80 -172 90 -351 93 -85 2 -178 -1
        -207 -6z"/>
        </g>
        </Svg>
    )
}

export default Heart;
