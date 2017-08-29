import {INIT} from '../actions/common'

/**
 * {"id":1,"date":"2017-09-04","cours":1,"presences":[{"personne":"b7a132d2-e7b1-4e0b-aad5-b78491e98d73","present":false},{"personne":"3cfbe933-9c11-458a-9f51-5a1644684c4c","present":true}]}
 */

const enrichFromInit = (old_state, dates = []) => {
    var state = Object.assign({}, old_state);
    for (let i = 0; i < dates.length; i++) {
        var date = dates[i].date;
        state[date] = state[date] || [];
        let datesInfoMap = {
            id: dates[i].id,
            cours: dates[i].cours,
            presents: new Set()
        }
        for (let j = 0; j < dates[i].presences.length; j++) {
            if (dates[i].presences[j].present) {
                datesInfoMap
                    .presents
                    .add(dates[i].presences[j].personne);
            }
        }
        state[date].push(datesInfoMap);
    }
    return state;
}

export const dates = (state = {}, action) => {
    switch (action.type) {
        case INIT:
            return enrichFromInit(state, action.data.dates);
        default:
            return state;
    }
}