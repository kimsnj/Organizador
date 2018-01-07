import { INIT } from '../actions/common'
import { INSCRIRE_MEMBRE } from '../actions/Membres'

const enrichFromInit = (old_state, cours = []) => {
    let state = Object.assign({}, old_state);
    for (var i = 0; i < cours.length; i++) {
        state[cours[i].id] = cours[i];
    }
    return state;
}

const append = (array, item) => [
    ...array,
    item
];


const remove = (array, idx) => [
    ...array.slice(0, idx),
    ...array.slice(idx + 1)
];


const inscrire = (state, data) => {
    const inscrits = new Set(data.cours.map((val) => parseInt(val, 10)));

    const updateCours = (cours) => {
        const current = inscrits.has(cours.id);
        const previousIdx = cours.inscrits.findIndex((val) => val === data.id)
        if (current && previousIdx === -1) { // just subscribed
            return {
                ...cours,
                inscrits: append(cours.inscrits, data.id)
            }
        } else if (!current && previousIdx !== -1) { // just unsubscribed
            return {
                ...cours,
                inscrits: remove(cours.inscrits, previousIdx)
            }
        } else {
            return cours;
        }
    }

    return Object.keys(state).reduce((acc, id) => {
        acc[id] = updateCours(state[id]);
        return acc;
    }, {});
}

export const cours = (state = {}, action) => {
    switch (action.type) {
        case INIT:
            return enrichFromInit(state, action.data.cours);
        case INSCRIRE_MEMBRE:
            return inscrire(state, action.data);
        default:
            return state;
    }
}