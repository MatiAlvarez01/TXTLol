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
} from "../action/constants"
import { champList } from "../refs"
var initialState = {
    petitionsPending: [],
    allPetitions: [],
    userLoggedIn: false,
    users: [],
    summonerBans: [],
    champList: champList,
    userLogged: {}
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case CHECK_USER:
            return {
                ...state,
                userLoggedIn: action.payload
            }
        case GET_SUMMONERS_NAME:
            return {
                ...state,
                users: action.payload
            }
        case GET_BY_SUMMONER:
            return {
                ...state,
                allPetitions: action.payload
            }
        case CLEAR_PETITIONS:
            return {
                ...state,
                allPetitions: action.payload
            }
        case CLEAR_BANS:
            return {
                ...state,
                summonerBans: action.payload
            }
        case GET_SUMMONER_BANS:
            return {
                ...state,
                summonerBans: action.payload
            }
        case GET_PENDING_PETITIONS:
            return {
                ...state,
                petitionsPending: action.payload
            }
        case GET_USER_LOGGED:
            return {
                ...state,
                userLogged: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;