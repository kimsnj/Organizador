import { dates } from './Dates'
import { init } from '../actions/common'
import { enregistrerAppel } from '../actions/Membres'
import deepFreeze from 'deep-freeze'

test('Init from server dates', () => {

    /**
 * {"id":1,"date":"2017-09-04","cours":1,"presences":[{"personne":"b7a132d2-e7b1-4e0b-aad5-b78491e98d73","present":false},{"personne":"3cfbe933-9c11-458a-9f51-5a1644684c4c","present":true}]}
 */

    const server_msg = {
        dates: [
            {
                id: 1,
                date: "2016-08-12",
                cours: 2,
                presences: [
                    {
                        personne: "idpersonne1",
                        present: true
                    }, {
                        personne: "idpersonne2",
                        present: false
                    }, {
                        personne: "idpersonne3",
                        present: true
                    }
                ]
            }, {
                id: 5,
                date: "2016-08-12",
                cours: 6,
                presences: [
                    {
                        personne: "idpersonne56",
                        present: false
                    }, {
                        personne: "idpersonne23",
                        present: false
                    }, {
                        personne: "idpersonne31",
                        present: false
                    }
                ]
            }, {
                id: 43,
                date: "2017-08-12",
                cours: 62,
                presences: [
                    {
                        personne: "idpersonne10",
                        present: true
                    }, {
                        personne: "idpersonne20",
                        present: true
                    }, {
                        personne: "idpersonne30",
                        present: true
                    }
                ]
            }
        ]
    }

    const state = dates(undefined, init(server_msg));
    expect(Object.keys(state)).toEqual(['2016-08-12', '2017-08-12']);
    expect(state["2017-08-12"][0].id).toEqual(43);
    expect(state["2017-08-12"][0].presents).toEqual(new Set(["idpersonne10", "idpersonne20", "idpersonne30"]));
    expect(state["2016-08-12"][0].presents).toEqual(new Set(["idpersonne1", "idpersonne3"]));
    expect(state["2016-08-12"][1].cours).toEqual(6);
    expect(state["2016-08-12"][1].presents).toEqual(new Set());
})

test('Update dates after submitting', () => {
    const initialState = {
        '2018-01-01': [
            {
                id: 5,
                presents: new Set('toto', 'tutu'),
                extra: 'stuff'
            },
            {
                id: 7,
                presents: new Set('titi')
            }
        ],
        '2018-01-08': [
            {
                id: 5,
                presents: new Set('toto')
            }
        ]
    };

    const action = {
        id: 5,
        date: '2018-01-01',
        presences: [
            { personne: 'toto', present: false },
            { personne: 'tata', present: true },
            { personne: 'tutu', present: true }
        ]
    }

    deepFreeze(initialState);
    deepFreeze(action);

    const state = dates(initialState, enregistrerAppel(action));
    expect(state['2018-01-01'][0].id).toEqual(5);
    expect(state['2018-01-01'][0].presents).toEqual(new Set(['tata', 'tutu']));
    expect(state['2018-01-01'][0].extra).toBe('stuff'); // only presents should be updated

    // other courses of the same date should not be touched
    expect(state['2018-01-01'][1]).toBe(initialState['2018-01-01'][1]);
    // other dates should not be touched
    expect(state['2018-01-08']).toBe(initialState['2018-01-08']);
})