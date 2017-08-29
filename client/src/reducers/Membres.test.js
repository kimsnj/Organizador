import { membres } from './Membres'
import { inscrireMembre, STATUS_SUCCES } from '../actions/Membres'
import { init } from '../actions/common'
import deepFreeze from 'deep-freeze'

test('Inscription eleve', () => {
    const init = membres(undefined, { type: 'UNKNOWN_ACTION' })
    expect(init).toEqual({})

    const data = { donnees: [1, 2], id: "some-uuid" }
    const action = inscrireMembre(data)
    const uuid = action.data.id
    const after = membres(init, action)

    expect(Object.keys(after)).toEqual([uuid])
    expect(after[uuid].donnees).toBe(data.donnees)
})

test('Init personne from server', () => {
    const initial_state = membres(undefined, { type: 'UNKNOWN_ACTION' })

    const server_msg = {
        personnes: [{
            id: 5,
            prenom: "Karim",
            nom: "Senhaji",
            surnom: null,
        }, {
            id: 19,
            prenom: "Marion",
            nom: "Hoogstoel",
            surnom: "Camaleaon"
        }
        ]
    }

    deepFreeze(initial_state)

    const state = membres(initial_state, init(server_msg))
    expect(Object.keys(state)).toEqual(['5', '19']);
    expect(state["5"].status).toEqual(STATUS_SUCCES);
    expect(state["19"].prenom).toEqual('Marion');
})
