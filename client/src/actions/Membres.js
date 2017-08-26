import uuidv4 from 'uuid/v4';

/*
 * Action types
 */

export const INSCRIRE_MEMBRE = 'INSCRIRE_MEMBRE';

/*
 * Actions status for asynch calls
 */
export const STATUS_REQUESTED = 'requested';
export const STATUS_SUCCES = 'success';
export const STATUS_ERROR = 'error';

/*
 * Action creators
 */

export const inscrireMembre = (data) => {
    return {
        type: INSCRIRE_MEMBRE,
        status: STATUS_REQUESTED,
        data: {
            ...data,
            id: uuidv4()
        }
    }
};

export const inscrireMembreSucces = data => ({
    type: INSCRIRE_MEMBRE,
    status: STATUS_SUCCES,
    data
});

export const inscrireMembreErreur = (data, error) => ({
    type: INSCRIRE_MEMBRE,
    status: STATUS_ERROR,
    data,
    error
})