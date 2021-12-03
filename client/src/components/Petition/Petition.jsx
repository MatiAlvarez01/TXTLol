import React, { useState } from "react"
import styled from "styled-components"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useDispatch } from "react-redux";
import { votePositive, voteNegative, addDefense, getPetitionsPending, getPetitionsBySummoner } from "../../action";

function Petition({petition, voted, setVoted, userLogged}) {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        petitionID: petition._id,
        accusedDefense: ""
    })
    const date = new Date(petition.createdAt)
    const completeDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    
    function handleVotePositive(e) {
        dispatch(votePositive(petition._id))
        .then(() => {
            setVoted(!voted)
        })
    }

    function handleVoteNegative(e) {
        dispatch(voteNegative(petition._id))
        .then(() => {
            setVoted(!voted)
        })
    }

    function handleAddDefense(e) {
        setEdit(true)
        if(edit) {
            dispatch(addDefense(data))
            .then(() =>
                dispatch(getPetitionsPending())
                .then(() => {
                    dispatch(getPetitionsBySummoner(petition.to))
                    .then(() => {
                        setEdit(false)
                        setVoted(!voted)
                    })
                })
            )
        }
    }

    function handleChangeDefense(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <MainSection status={petition.status}>
            <TitleDiv>
                <ChampionName>{petition.champion}</ChampionName>
            </TitleDiv>
            <FromDiv>
                <From>De: {petition.from}</From>
                <From>Para: {petition.to}</From>
            </FromDiv>
            <ReasonDiv>
                <TitleDivision>Razon:</TitleDivision>
                <Reason>{petition.reason}</Reason>
            </ReasonDiv>
            {petition.games.length > 0 && 
                <GamesDiv>
                    <GamesTitle>Partidas:</GamesTitle>
                    {petition.games.map(game => <LinkGame>{game}</LinkGame>)}        
                </GamesDiv>
            }
            <DefenseDiv>
                <DefenseDiv2>
                    <TitleDivision>Defensa del acusado:</TitleDivision>
                    {userLogged === petition.to ?
                    <ButtonAddDefense onClick={handleAddDefense}>Agregar Defensa</ButtonAddDefense> :
                    null                    
                    }
                </DefenseDiv2>
                {edit ? 
                <TextAreaDefense 
                    name="accusedDefense"
                    placeholder="Escrbí papá"
                    value={data.accusedDefense}
                    onChange={handleChangeDefense}
                /> : 
                <Defense>{petition.accusedDefense}</Defense>
                }
            </DefenseDiv>
            {petition.status === "Pending" && 
            <ButtonsDiv>
                <PositiveVoteDiv>
                    <VoteCount>{petition.positiveVotes}</VoteCount>
                    <ButtonPositiveDiv>
                        <ThumbUpOffAltIcon 
                            onClick={handleVotePositive}
                            sx={{ fontSize: 60, opacity: "87%"}}
                        />
                    </ButtonPositiveDiv>
                </PositiveVoteDiv>
                <NegativeVoteDiv>
                    <VoteCount>{petition.negativeVotes}</VoteCount>
                    <ButtonNegativeDiv>
                        <ThumbDownOffAltIcon 
                            onClick={handleVoteNegative}
                            sx={{ fontSize: 60, opacity: "87%"}}
                        />
                    </ButtonNegativeDiv>
                </NegativeVoteDiv>
            </ButtonsDiv>}
            <StatusDiv>
                <StatusText status={petition.status}>{petition.status}</StatusText>
            </StatusDiv>
            <VotesDiv>
                <TitleDivision>Votaron:</TitleDivision>
                <VotesNamesDiv>
                    {petition.alreadyVoted.map(voteName => <Vote>{voteName},</Vote>)}
                </VotesNamesDiv>
                {completeDate}
            </VotesDiv>
        </MainSection>
    )
}

export default Petition;

const MainSection = styled.section(({status}) => `
    background-color: #4A4A4A;
    width: 400px;
    height: 600px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    color: #FFFFFF;
    border: solid 1px ${status === "Pending" ? "#FFAF5F" : "red"};
    margin: 25px;
`)
const TitleDiv = styled.div`
`
const FromDiv = styled.div`
`
const GamesDiv = styled.div`
`
const ReasonDiv = styled.div`
`
const DefenseDiv = styled.div`
`
const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: row;
`
const ButtonPositiveDiv = styled.div`
    background-color: #4ACFAC;
    width: 75px;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.5s ease;
    -moz-transition:0.5s ease;
    -webkit-transition:0.5s ease;

    &:hover {
        background-color: #9AE66E;
    }
`
const ButtonNegativeDiv = styled.div`
    background-color: #FFA48E;
    width: 75px;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.5s ease;
    -moz-transition:0.5s ease;
    -webkit-transition:0.5s ease;

    &:hover {
        background-color: #C85C5C;
    }
`
const PositiveVoteDiv = styled.div`
    margin-right: 50px;
`
const NegativeVoteDiv = styled.div`
`
const VotesDiv = styled.div`
`
const ChampionName = styled.p`
    font-size: 1.5rem;
    margin: 0 0 5px 0;
    opacity: 90%;
`
const From = styled.p`
    margin: 0 0 5px 0;
    opacity: 87%;
`
const GamesTitle = styled.p`
    margin: 0 0 5px 0;
`
const LinkGame = styled.p`
    margin: 0 0 5px 0;
    opacity: 60%;
`
const Reason = styled.p`
    margin: 0 0 10px 0;
    opacity: 60%;
`
const Defense = styled.p`
    margin: 0 0 15px 0;
    opacity: 60%;
`
const Vote = styled.p`
    margin: 0 5px 0 0;
`
const VoteCount = styled.p`
    margin: 0 0 5px 0;
    opacity: 87%;
`
const VotesNamesDiv = styled.div`
    display: flex;
    flex-direction: row;
    opacity: 60%;
    margin: 0 0 10px 0;
`
const TitleDivision = styled.p`
    margin: 7px 0 5px 0;
    opacity: 87%;
`
const StatusDiv = styled.div`
`
const StatusText = styled.span(({status}) =>`
    color: ${status === "Pending" ? "#FFFFFF" : "red"}
`)
const ButtonAddDefense = styled.button`
`
const DefenseDiv2 = styled.div`
`
const TextAreaDefense = styled.textarea`
    resize: none;
    width: 350px;
    height: 75px;
    opacity: 70%;
`