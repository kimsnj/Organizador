import { INSCRIRE_MEMBRE } from '../actions/Membres'

export const membres = (state = {}, action) => {
    switch (action.type) {
        case INSCRIRE_MEMBRE:
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