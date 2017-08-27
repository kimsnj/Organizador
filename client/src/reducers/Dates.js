import { INIT } from '../actions/common'

const enrichFromInit = (old_state, dates = []) => {
    state = Object.assign({}, old_state);
    for (var i = 0; i < state.dates.length; i++) {
        state[dates[i].id] = dates[i];
    }
}

export const dates = (state = {}, action) => {
    switch(action.type) {
        case INIT:
            return enrichFromInit(state, action.data.date);
        default:
            return state;
    }
}