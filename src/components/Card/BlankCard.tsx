import styled from "styled-components"


const Div = styled.div`
    width: 100%;
    height: 100%;

    background-color: #fff;
    border-radius: 1rem;
    position: relative;

    & > div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: .5rem;

        & > div {
            background-image: url('img/card/card-back.png');
            background-position: center;
            background-size: cover;
            border-radius: 1rem;
            width: 100%;
            height: 100%;
        }
    }
`
function BlankCard() {
    return (
        <Div>
            <div>
                <div></div>
            </div>
        </Div>
    )
}

export default BlankCard