import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components"
import { getPetitionsBySummoner, getSummonerBans } from "../../action";
import Profile from "../Profile/Profile";

function LoadingProfile({userLogged}) {

    const dispatch = useDispatch();
    const allPetitions = useSelector(state => state.allPetitions)
    const champsBanned = useSelector(state => state.summonerBans)
    const { summonerName } = useParams();
    const [voted, setVoted] = useState(false)

    useEffect(() => {
        dispatch(getPetitionsBySummoner(summonerName))
        dispatch(getSummonerBans(summonerName))
    }, [voted])

    return (
        <div>
            <Profile
                text={summonerName}
                petitions={allPetitions}
                bans={champsBanned}
                voted={voted}
                setVoted={setVoted}
                userLogged={userLogged}
            />
        </div>
    )
}

export default LoadingProfile;
