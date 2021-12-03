import React from "react";
import styled from "styled-components"
import Moment from "react-moment";


function Ban({ban}) {

    const date = new Date(ban.till)
    const completeDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    return (
        <MainSection>
            <ChampImg src={`/championicon/${ban.champion}.png`} alt={ban.champion}/>
            <StyledMoment to={completeDate}>{ban.date}</StyledMoment>
        </MainSection>
    )
}

export default Ban;

const MainSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ChampImg = styled.img`
`
const StyledMoment = styled(Moment)`
    color: white;
`