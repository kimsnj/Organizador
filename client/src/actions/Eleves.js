import uuidv4 from 'uuid/v4';

/*
 * Action types
 */

export const INSCRIRE_ELEVE = 'INSCRIRE_ELEVE';

/*
 * Actions status for asynch calls
 */
export const STATUS_REQUESTED = 'requested';
export const STATUS_SUCCES = 'success';
export const STATUS_ERROR = 'error';

/*
 * Action creators
 */

export const inscrireEleve = (data) => {
    return {
        type: INSCRIRE_ELEVE,
        status: STATUS_REQUESTED,
        data: {
            ...data,
            id: uuidv4()
        }
    }
};

export const inscrireEleveSucces = data => ({
    type: INSCRIRE_ELEVE,
    status: STATUS_SUCCES,
    data
});

export const inscrireEleveErreur = (data, error) => ({
    type: INSCRIRE_ELEVE,
    status: STATUS_ERROR,
    data,
    error
})