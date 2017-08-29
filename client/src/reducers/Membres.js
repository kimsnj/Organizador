import { INSCRIRE_MEMBRE, STATUS_ERROR, STATUS_SUCCES } from '../actions/Membres'
import { INIT } from '../actions/common'

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

const enrichFromInit = (old_state, personnes = []) => {
    let state = Object.assign({}, old_state);
    for (var i = 0; i < personnes.length; i++) {
        state[personnes[i].id] = {
            ...personnes[i],
            status: STATUS_SUCCES
        }
    }
    return state;
}

export const membres = (state = {}, action) => {
    switch (action.type) {
        case INIT:
            return enrichFromInit(state, action.data.personnes);
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