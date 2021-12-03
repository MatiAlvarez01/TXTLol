import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import styled from "styled-components"
import Title from "../Title/Title";
import Petition from "../Petition/Petition";
import Ban from "../Ban/Ban";
import { cleanPetitions, clearBans, getPendingPetitions } from "../../action";

function Profile({text, petitions, bans, voted, setVoted, userLogged}) {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(cleanPetitions())
            dispatch(clearBans())
            dispatch(getPendingPetitions())
        }
    },[])

    return (
        <MainSection>
            <StyledLink to="/">
                <HomeButtonDiv>
                    <HomeText>Inicio</HomeText>
                </HomeButtonDiv>
            </StyledLink>
            <TitleDiv>
                <Title 
                    text={text}
                />
            </TitleDiv>
            <BansDiv>
                {bans.length > 0 && 
                bans.map(ban => <Ban ban={ban}/>)
                }
            </BansDiv>
            <NewPetitionDiv>
                <NewPetitionButton>NUEVA PETICION</NewPetitionButton>
            </NewPetitionDiv>
            <PetitionsDiv>
                {petitions.map(petition => <Petition petition={petition} setVoted={setVoted} voted={voted} userLogged={userLogged} />)}
            </PetitionsDiv>
        </MainSection>
    )
}

export default Profile;

const MainSection = styled.section`
    background-color: #262833;
    min-height: 100vh;
`
const TitleDiv = styled.div`
    text-align: center;
`
const BansDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px 0 0 0;
`
const NewPetitionDiv = styled.div`
    margin: 20px 0 0 0;
    text-align: center;
`
const PetitionsDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 1%;
`
const HomeButtonDiv = styled.div`
    width: 70px;
    border: solid 1px #FFAF5F;
    position: absolute;
    left: 25px;
    top: 25px;
    text-align: center;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`
const HomeText = styled.span`
    color: white;
    opacity: 87%;
    font-size: 25px;
`
const NewPetitionButton = styled.button`
    font-size: 3rem;
    padding: 1%;
    cursor: pointer;
    background-color: #DD4A48;
    border: solid 1px #DD4A48;
    border-radius: 5px;
    transition: 0.5s ease;
    -moz-transition:0.5s ease;
    -webkit-transition:0.5s ease;

    &:hover {
        background-color: #DD4A48;
        border: solid 1px white;
        color: white;
    }
`