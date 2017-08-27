import { INIT } from '../actions/common'

const enrichFromInit = (old_state, cours = []) => {
    let state = Object.assign({}, old_state);
    for (var i = 0; i < cours.length; i++) {
        state[cours[i].id] = cours[i];
    }
    return state;
}

export const cours = (state = {}, action) => {
    switch (action.type) {
        case INIT:
            return enrichFromInit(state, action.data.cours);
        default:
            return state;
    }
}