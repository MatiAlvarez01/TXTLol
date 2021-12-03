import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Title from "../Title/Title";
import Card from "../Card/Card";
import Petition from "../Petition/Petition";
import { logOut, checkUser } from "../../action";

function Home({users, pendingPetitions, voted, setVoted, userLogged}) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    function handleLogOut(e) {
        dispatch(logOut())
        .then(() => {
            dispatch(checkUser())
            .then(() => {
                history.push("/")
            })
        })
    }

    return (
        <MainSection>
            <HomeButtonDiv onClick={handleLogOut}>
                    <HomeText>Log out</HomeText>
            </HomeButtonDiv>
            <TitleDiv>
                <Title 
                    text={"TXT v2.0"}
                />
            </TitleDiv>
            <CardsDiv>
                {users.map((user, index) => 
                <Card 
                    key={index}
                    summonerName={user}
                />
                )}
            </CardsDiv>
            <NewPetitionDiv>
                <StyledLink to="/newPetition">
                    <NewPetitionButton>NUEVA PETICION</NewPetitionButton>
                </StyledLink>
            </NewPetitionDiv>
            <PendingPetitionsDiv>
                {pendingPetitions.map((petition, index) => <Petition key={index} petition={petition} setVoted={setVoted} voted={voted} userLogged={userLogged}/>)}
            </PendingPetitionsDiv>
        </MainSection>
    )
}

export default Home;

const MainSection = styled.section`
    background-color: #262833;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TitleDiv = styled.div`
    text-align: center;
`
const CardsDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80%;
    align-items: center;
    justify-content: space-around;
`
const NewPetitionDiv = styled.div`
    margin: 35px 0 0 0;
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
const StyledLink = styled(Link)`
    text-decoration: none
`
const PendingPetitionsDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 35px 0 35px 0;
`
const HomeButtonDiv = styled.div`
    width: 70px;
    border: solid 1px #FFAF5F;
    position: absolute;
    left: 25px;
    top: 25px;
    text-align: center;
    cursor: pointer;
`
const HomeText = styled.span`
    color: white;
    opacity: 87%;
    font-size: 25px;
`