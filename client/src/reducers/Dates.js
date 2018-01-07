import { INIT } from '../actions/common'
import { ENREGISTRER_APPEL } from '../actions/Membres'

const updateInArray = (array, id, obj) =>
    array.map((item) => {
        if (item.id !== id) {
            // This isn't the item we care about - keep it as-is
            return item;
        }

        // Otherwise, this is the one we want - return an updated obj
        return {
            ...item,
            ...obj
        };
    })

const toSet = (presences) => {
    let presents = new Set();
    for (let j = 0; j < presences.length; j++) {
        if (presences[j].present) {
            presents.add(presences[j].personne);
        }
    }
    return presents;
}

/**
 * {"id":1,"date":"2017-09-04","cours":1,"presences":[{"personne":"b7a132d2-e7b1-4e0b-aad5-b78491e98d73","present":false},{"personne":"3cfbe933-9c11-458a-9f51-5a1644684c4c","present":true}]}
 */

const enrichFromInit = (oldState, dates = []) => {
    var state = Object.assign({}, oldState);
    for (let i = 0; i < dates.length; i++) {
        var date = dates[i].date;
        state[date] = state[date] || [];
        state[date].push({
            id: dates[i].id,
            cours: dates[i].cours,
            date: dates[i].date,
            presents: toSet(dates[i].presences)
        });
    }
    return state;
}

const enregistrerAppel = (state, data) => {
    return {
        ...state,
        [data.date]: updateInArray(
            state[data.date],
            data.id,
            { presents: toSet(data.presences) })
    }
}

export const dates = (state = {}, action) => {
    switch (action.type) {
        case INIT:
            return enrichFromInit(state, action.data.dates);
        case ENREGISTRER_APPEL:
            return enregistrerAppel(state, action.data);
        default:
            return state;
    }
}