import React from "react"
import styled from "styled-components";
import { Link } from "react-router-dom"

function Card({summonerName}) {
    return(
        <LinkStyled to={`/summoner/${summonerName}`}>
            <CardBody >
                <Name>{summonerName}</Name>
            </CardBody>
        </LinkStyled>
    )
}

export default Card;

const CardBody = styled.div`
    width: 350px;
    height: 150px;
    background-color: #7E94D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: 0.5s ease;
    -moz-transition:0.5s ease;
    -webkit-transition:0.5s ease;
    margin: 20px 0;

    &:hover {
        background-color: #52D9B3;
        cursor: pointer;
    }
`
const Name = styled.p`
    font-size: 4rem;
    margin: 0;
`
const LinkStyled = styled(Link)`
    text-decoration: none;
    color: black;
`