import axios from "axios";
import {
    GET_ALL_PETITIONS,
    GET_BY_SUMMONER,
    FILTER_BY_ACCEPTED,
    FILTER_BY_REJECTED,
    FILTER_BY_PENDING,
    NEW_PETITION,
    EDIT_REASON,
    ADD_DEFENSE,
    ADD_GAME,
    VOTE_NEGATIVE,
    VOTE_POSITIVE,
    ADD_CHAMPION_BANNED,
    SIGN_UP,
    SIGN_IN,
    LOG_OUT,
    CHECK_USER,
    GET_SUMMONERS_NAME,
    CLEAR_PETITIONS,
    CLEAR_BANS,
    GET_SUMMONER_BANS,
    GET_PENDING_PETITIONS,
    GET_USER_LOGGED
} from "./constants"

export function getAllPetitions() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/all"
        })
            .then(allPetitions => {
                dispatch({
                    type: GET_ALL_PETITIONS,
                    payload: allPetitions.data
                })
            })
            .catch(err => {
                console.log("ERROR en getAllPetitions:")
                console.log(err)
            })
    }
}

export function getPetitionsBySummoner(summonerName) {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: `https://guarded-castle-25124.herokuapp.com/petitions/${summonerName}`
        })
            .then(summonerPetitions => {
                dispatch({
                    type: GET_BY_SUMMONER,
                    payload: summonerPetitions.data
                })
            })
            .catch(err => {
                console.log("ERROR en getPetitionsBySummoner:")
                console.log(err)
            })
    }
}

export function getPetitionsAccepted(summonerName) {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: `https://guarded-castle-25124.herokuapp.com/petitions/${summonerName}/filter/accepted`
        })
            .then(summonerPetitionsAccepted => {
                dispatch({
                    type: FILTER_BY_ACCEPTED,
                    payload: summonerPetitionsAccepted.data
                })
            })
            .catch(err => {
                console.log("ERROR en getPetitionsAccepted:")
                console.log(err)
            })
    }
}

export function getPetitionsRejected(summonerName) {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: `https://guarded-castle-25124.herokuapp.com/petitions/${summonerName}/filter/rejected`
        })
            .then(summonerPetitionsRejected => {
                dispatch({
                    type: FILTER_BY_REJECTED,
                    payload: summonerPetitionsRejected.data
                })
            })
            .catch(err => {
                console.log("ERROR en getPetitionsRejected:")
                console.log(err)
            })
    }
}

export function getPetitionsPending(summonerName) {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: `https://guarded-castle-25124.herokuapp.com/petitions/${summonerName}/filter/pending`
        })
            .then(summonerPetitionsPending => {
                dispatch({
                    type: FILTER_BY_PENDING,
                    payload: summonerPetitionsPending.data
                })
            })
            .catch(err => {
                console.log("ERROR en getPetitionsPending:")
                console.log(err)
            })
    }
}

export function newPetition(petition) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                to: petition.to,
                champion: petition.champion,
                games: petition.games,
                reason: petition.reason
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/new"
        })
        .then(newPetition => {
            dispatch({
                type: NEW_PETITION,
                payload: newPetition.data
            })
        })
        .catch(err => {
            console.log("ERROR en newPetition:")
            console.log(err)
        })
    }
}

export function editReason(data) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionID: data.petitionID,
                reason: data.reason
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/editReason"
        })
        .then(editPetition => {
            dispatch({
                type: EDIT_REASON,
                payload: editPetition.data
            })
        })
        .catch(err => {
            console.log("ERROR en editReason:")
            console.log(err)
        })
    }
}

export function addDefense(data) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionID: data.petitionID,
                accusedDefense: data.accusedDefense
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/addDefense"
        })
        .then(defenseAdded => {
            dispatch({
                type: ADD_DEFENSE,
                payload: defenseAdded.data
            })
        })
        .catch(err => {
            console.log("ERROR en addDefence:")
            console.log(err)
        })
    }
}

export function addGame(data) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionID: data.petitionID,
                game: data.game
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/addGame"
        })
        .then(gameAdded => {
            dispatch({
                type: ADD_GAME,
                payload: gameAdded.data
            })
        })
        .catch(err => {
            console.log("ERROR en addGame:")
            console.log(err)
        })
    }
}

export function votePositive(petitionID) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionID: petitionID
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/votePositive"
        })
        .then(petitionVoted => {
            dispatch({
                type: VOTE_POSITIVE,
                payload: petitionVoted.data
            })
        })
        .catch(err => {
            console.log("ERROR en votePositive:")
            console.log(err)
        })
    }
}

export function voteNegative(petitionID) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                petitionID: petitionID
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/voteNegative"
        })
        .then(petitionVoted => {
            dispatch({
                type: VOTE_NEGATIVE,
                payload: petitionVoted.data
            })
        })
        .catch(err => {
            console.log("ERROR en voteNegative:")
            console.log(err)
        })
    }
}

export function addChampionBanned(data) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                champName: data.champName,
                summonerName: data.summonerName
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/addChampBanned"
        })
        .then(summonerEdited => {
            dispatch({
                type: ADD_CHAMPION_BANNED,
                payload: summonerEdited.data
            })
        })
        .catch(err => {
            console.log("ERROR en addChampionBanned:")
            console.log(err)
        })
    }
}

export function signIn(data) {
    return function(dispatch) {
        return axios({
            method: "POST",
            data: {
                email: data.email,
                password: data.password
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/signin"
        })
        .then(userSignIn => {
            dispatch({
                type: SIGN_IN,
                payload: userSignIn.data
            })
        })
        .catch(err => {
            console.log("ERROR en signIn:", err)
        })
    }
}

export function signUp(data) {
    return function(dispatch) {
        return axios({
            method: "post",
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            },
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/signup"
        })
        .then(userSignUp => {
            dispatch({
                type: SIGN_UP,
                payload: userSignUp.data
            })
        })
        .catch(err => {
            console.log("ERROR en signUp:")
            console.log(err)
        })
    }
}

export function logOut() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/logout"
        })
        .then(userLogOut => {
            dispatch({
                type: LOG_OUT,
                payload: userLogOut.data
            })
        })
        .catch(err => {
            console.log("ERROR en logOut:")
            console.log(err)
        })
    }
}

export function checkUser() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/checkUser"
        })
        .then(userLoggedIn => {
            dispatch({
                type: CHECK_USER,
                payload: userLoggedIn.data
            })
        })
        .catch(err => {
            console.log("ERROR en checkUser:")
            console.log(err)
        })
    }
}

export function getSummonersName() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/all"
        })
        .then(names => {
            dispatch({
                type: GET_SUMMONERS_NAME,
                payload: names.data
            })
        })
        .catch(err => {
            console.log("ERROR en getSummonersName:")
            console.log(err)
        })
    }
}

export function cleanPetitions() {
    return function(dispatch) {
        return dispatch({
            type: CLEAR_PETITIONS,
            payload: []
        })
    }
}

export function clearBans() {
    return function(dispatch) {
        return dispatch({
            type: CLEAR_BANS,
            payload: []
        })
    }
}


export function getSummonerBans(summonerName) {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: `https://guarded-castle-25124.herokuapp.com/summoner/${summonerName}/bansComplete`
        })
        .then(bans => {
            dispatch({
                type: GET_SUMMONER_BANS,
                payload: bans.data
            })
        })
        .catch(err => {
            console.log("ERROR en getSummonerBans:")
            console.log(err)
        })
    }
}

export function getPendingPetitions() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/petitions/status/pending"
        })
        .then(pendingPetitions => {
            dispatch({
                type: GET_PENDING_PETITIONS,
                payload: pendingPetitions.data
            })
        })
        .catch(err => {
            console.log("ERROR en getPendingPetitions:")
            console.log(err)
        })
    }
}

export function getUserLogged() {
    return function(dispatch) {
        return axios({
            method: "get",
            withCredentials: true,
            url: "https://guarded-castle-25124.herokuapp.com/summoner/userLogged"
        })
        
        .then(userLogged => {
            dispatch({
                type: GET_USER_LOGGED,
                payload: userLogged.data
            })
        })
        .catch(err => {
            console.log("ERROR en getUserLogged:")
            console.log(err)
        })
    }
}