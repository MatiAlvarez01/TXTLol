import React from "react";
import styled from "styled-components";

function Title({text}) {
    return (
        <Text>{text}</Text>
    )
}

export default Title;

const Text = styled.p`
    color: #FFAF5F;
    margin: 0;
    font-size: 5rem;
`