import { eleves } from './Eleves'
import { inscrireEleve } from '../actions/Eleves'

test('Inscription eleve', () => {
    const init = eleves(undefined, { type: 'INIT' })
    expect(init).toEqual({})

    const data = { donnees: [1, 2] }
    const action = inscrireEleve(data)
    const uuid = action.data.id
    const after = eleves(init, action)

    expect(Object.keys(after)).toEqual([uuid])
    expect(after[uuid].donnees).toBe(data.donnees)
})
