import { cours } from './Cours'
import { init } from '../actions/common'
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