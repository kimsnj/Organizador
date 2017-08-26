import { membres } from './Membres'
import { inscrireMembre } from '../actions/Membres'

test('Inscription eleve', () => {
    const init = membres(undefined, { type: 'INIT' })
    expect(init).toEqual({})

    const data = { donnees: [1, 2] }
    const action = inscrireMembre(data)
    const uuid = action.data.id
    const after = membres(init, action)

    expect(Object.keys(after)).toEqual([uuid])
    expect(after[uuid].donnees).toBe(data.donnees)
})
