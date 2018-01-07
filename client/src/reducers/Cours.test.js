import { cours } from './Cours'
import { init } from '../actions/common'
import { inscrireMembre } from '../actions/Membres'
import deepFreeze from 'deep-freeze'

test('Initialization from server', () => {
    const initial_state = cours(undefined, { type: 'UNKNOWN_ACTION' })
    expect(initial_state).toEqual({});

    // Ensures immutability of initial_state
    deepFreeze(initial_state);

    const server_msg = {
        cours: [{
            id: 1,
            lieu: 'Auribeau',
            jour: 'Jeudi'
        }, {
            id: 3,
            lieu: 'Ranguin',
            jour: 'Lundi'
        }]
    }
    const state = cours(initial_state, init(server_msg));
    expect(Object.keys(state)).toEqual(["1", "3"])
    expect(state["1"].jour).toBe('Jeudi')
    expect(state["3"].lieu).toBe('Ranguin')
})

test('Inscriptions', () => {
    const initialState = {
        1: {
            id: 1,
            inscrits: ['a', 'b']
        },
        2: {
            id: 2,
            inscrits: ['b', 'c']
        }
    };

    const action = {
        id: 'a',
        cours: ['2']
    }

    deepFreeze(initialState);
    deepFreeze(action);

    const state = cours(initialState, inscrireMembre(action));
    expect(state[1].inscrits).toEqual(['b']);
    expect(state[2].inscrits).toEqual(['b', 'c', 'a']);
});
