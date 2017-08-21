import { INSCRIRE_ELEVE, inscrireEleve } from './Eleves';


test('Inscrire eleve', () => {
    const act1 = inscrireEleve({ test: 'data' });
    const act2 = inscrireEleve({ other: 'info' });

    // Type is constant
    expect(act1.type).toBe(INSCRIRE_ELEVE);
    expect(act2.type).toBe(INSCRIRE_ELEVE);

    // IDs are different each time
    expect(act1.data.id).not.toEqual(act2.data.id);

    // Data is kept
    expect(act1.data.test).toBe('data');
    expect(act2.data.other).toBe('info');
})
