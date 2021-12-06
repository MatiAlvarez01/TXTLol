import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { Link } from "react-router-dom"
import styled from "styled-components"
import { signIn } from "../../action";
import { checkUser, getSummonersName, getUserLogged } from "../../action";

function SignIn() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    function handleInputChange(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        dispatch(signIn(userData))
        .then(() => {
            setUserData({
                email: "",
                password: ""
            })
            dispatch(getSummonersName())
            .then(() => {
                dispatch(checkUser())
                .then(() => {
                    dispatch(getUserLogged())
                    .then(() => {
                        history.push("/Scrinb0y")
                    })
                })
            })
        })
        .catch(err => {
            console.log("ERROR en signIn:")
            console.log(err)
        })
    }

    return (
        <MainSection>
            <FormDiv>
                <Form onSubmit={handleSubmitForm}>
                    <Label>Email</Label>
                    <Input 
                        name="email"
                        onChange={handleInputChange}
                        type="email"
                        value={userData.email}
                    />
                    <Label>Contraseña</Label>
                    <Input 
                        name="password"
                        onChange={handleInputChange}
                        type="password"
                        value={userData.password}
                    />
                    <Button type="submit">Iniciar Sesion</Button>
                </Form>
                <Button2 to="/SignUp">Registrarse</Button2>
            </FormDiv>
        </MainSection>
    )
}

export default SignIn;

const MainSection = styled.section`
    background-color: #262833;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const FormDiv = styled.div`
    background-color: #4A4A4A;
    width: 500px;
    padding: 3%;
    border-radius: 15px;
    color: #FFFFFF;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 3rem;
    align-items: center;
`
const Label = styled.label`
    opacity: 70%;
`
const Input = styled.input`
    margin: 15px 0;
    width: 350px;
    opacity: 70%;
    border: none;
    font-size: 25px;
    text-align: center;
`
const Button = styled.button`
    margin: 20px 0;
    width: 100px;
    height: 50px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s ease;
    -moz-transition:0.5s ease;
    -webkit-transition:0.5s ease;
    background-color: #52D9B3;
    border: solid 1px #52D9B3;

    &:hover {
        background-color: #7E94D9;
        border: solid 1px white;
    }
`
const Button2 = styled(Link)`
    margin-left: 70px;
    background-color: #FFAF5F;
    padding: 1%;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    border: solid 1px #FFAF5F;
    transition: 0.5s ease;
    -moz-transition:0.5s ease;
    -webkit-transition:0.5s ease;

    &:hover {
        background-color: #7E94D9;
        border: solid 1px white;
    }
`
