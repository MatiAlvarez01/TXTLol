import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom"
import styled from "styled-components";
import { newPetition, getPendingPetitions } from "../../action";
import Title from "../Title/Title";

function NewPetition({champList, summonersNames}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [links, setLinks] = useState("")
    const [petition, setPetition] = useState({
        to: "",
        champion: "",
        games: [],
        reason: ""
    })

    function handleSubmitForm(e) {
        e.preventDefault();
        dispatch(newPetition(petition))
        .then(() => {
            setPetition({
                to: "",
                champion: "",
                games: [],
                reason: ""
            })
            dispatch(getPendingPetitions())
            .then(() => {
                history.push("/")
            })
        })
    }

    function handleChangeForm(e) {
        setPetition({
            ...petition,
            [e.target.name]: e.target.value
        })
    }

    function handleGamesChange(e) {
        setLinks(e.target.value)
    }

    function handleAddInput() {
        setPetition({
            ...petition,
            games: [...petition.games, links]
        })
        setLinks("")
    }

    console.log("petition: ", petition)
    
    return (
        <MainSection>
             <StyledLink to="/">
                <HomeButtonDiv>
                    <HomeText>Inicio</HomeText>
                </HomeButtonDiv>
            </StyledLink>
            <TitleDiv>
                <Title text="Nueva Peticion"/>
            </TitleDiv>
            <FormDiv>
                <Form onSubmit={handleSubmitForm}>
                    <Label>A quien?</Label>
                    <Select onChange={handleChangeForm} name="to" value={petition.to}>
                        <Option value={null}></Option>
                        {summonersNames.map(name => <Option value={name}>{name}</Option>)}
                    </Select>
                    <Label>Champion:</Label>
                    <Select onChange={handleChangeForm} name="champion" value={petition.champion}>
                        <Option value={null}></Option>
                        {champList.map(champ => <Option value={champ}>{champ}</Option>)}
                    </Select>
                    <Label>Games:</Label>
                    {petition.games.map(game => <span>{game}</span>)}
                    <Input 
                        name="games"
                        onChange={handleGamesChange}
                        value={links}
                        placeholder="Link al game..."
                    />
                    <ButtonLink onClick={handleAddInput}>Agregar</ButtonLink>
                    <Label>Razon:</Label>
                    <Textarea 
                        name="reason"
                        onChange={handleChangeForm}
                        value={petition.reason}
                        placeholder="Razon de la peticion"
                    />
                    <ButtonSend type="submit">Enviar</ButtonSend>
                </Form>
            </FormDiv>
        </MainSection>
    )
}

export default NewPetition;

const MainSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #262833;
`
const TitleDiv = styled.div`
    margin-bottom: 50px;
`
const FormDiv = styled.div`
    width: 30%;
    background-color: #4A4A4A;
    border-radius: 10px;
    color: #FFFFFF;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const Select = styled.select`
    width: 30%;
    opacity: 70%;
`
const Option = styled.option`
`
const Input = styled.input`
    width: 350px;
    opacity: 70%;
`
const Label = styled.label`
    margin: 20px 0 5px 0;
    opacity: 87%;
`
const Textarea = styled.textarea`
    width: 350px;
    height: 100px;
    resize: none;
    opacity: 70%;
`
const ButtonSend = styled.button`
    margin: 10px 0 25px 0;
`
const ButtonLink = styled.button`
    margin: 10px 0 0 0;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`
const HomeButtonDiv = styled.div`
    width: 70px;
    border: solid 1px #FFAF5F;
    position: absolute;
    left: 25px;
    top: 25px;
    text-align: center;
`
const HomeText = styled.span`
    color: white;
    opacity: 87%;
    font-size: 25px;
`