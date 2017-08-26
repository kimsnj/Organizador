import { INSCRIRE_MEMBRE, inscrireMembre } from './Membres';


test('Inscrire eleve', () => {
    const act1 = inscrireMembre({ test: 'data' });
    const act2 = inscrireMembre({ other: 'info' });

    // Type is constant
    expect(act1.type).toBe(INSCRIRE_MEMBRE);
    expect(act2.type).toBe(INSCRIRE_MEMBRE);

    // IDs are different each time
    expect(act1.data.id).not.toEqual(act2.data.id);

    // Data is kept
    expect(act1.data.test).toBe('data');
    expect(act2.data.other).toBe('info');
})
