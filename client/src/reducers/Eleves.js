import { INSCRIRE_ELEVE } from '../actions/Eleves'

export const eleves = (state = {}, action) => {
    switch (action.type) {
        case INSCRIRE_ELEVE:
            return {
                ...state,
                [action.data.id]: {
                    ...action.data,
                    status: action.status
                }
            };

        default:
            return state;
    }
}