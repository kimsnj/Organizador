import { INSCRIRE_MEMBRE, STATUS_ERROR } from '../actions/Membres'

const inscrireMembre = (membre = {}, action) => {
    switch (action.status) {
        case STATUS_ERROR:
            return {
                ...membre,
                status: STATUS_ERROR,
                error: action.error
            }
        default:
            return {
                ...action.data,
                status: action.status
            };
    }
}

export const membres = (state = {}, action) => {
    switch (action.type) {
        case INSCRIRE_MEMBRE:
            const id = action.data.id;
            return {
                ...state,
                [id]: inscrireMembre(state[id], action)
            };
        default:
            return state;
    }
}