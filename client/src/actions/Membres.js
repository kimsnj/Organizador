import fetch from 'isomorphic-fetch';
import { getAuthorizationHeader } from '../authentication'
/*
 * Action types
 */

export const INSCRIRE_MEMBRE = 'INSCRIRE_MEMBRE';
export const ENREGISTRER_APPEL = 'ENREGISTRER_APPEL';

/*
 * Actions status for asynch calls
 */
export const STATUS_REQUESTED = 'requested';
export const STATUS_SUCCES = 'success';
export const STATUS_ERROR = 'error';

/*
 * Action creators
 */

export const inscrireMembre = data => {
    return {
        type: INSCRIRE_MEMBRE,
        status: STATUS_REQUESTED,
        data
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

export const enregistrerAppel = data => {
    return {
        type: ENREGISTRER_APPEL,
        status: STATUS_REQUESTED,
        data
    }
};

export const enregistrerAppelSucces = data => ({
    type: ENREGISTRER_APPEL,
    status: STATUS_SUCCES,
    data
});

export const enregistrerAppelErreur = (data, error) => ({
    type: ENREGISTRER_APPEL,
    status: STATUS_ERROR,
    data,
    error
})

const handlePostResponse = (data, response) => {
    console.log(response)
    if (response.ok) {
        return inscrireMembreSucces(JSON.parse(response.body))
    }
    else {
        return inscrireMembreErreur(data, {
            code: response.status,
            text: response.statusText,
            body: response.body
        })
    }
}

const handlePutResponse = (data, response) => {
    console.log(response)
    if (response.ok) {
        return enregistrerAppelSucces(JSON.parse(response.body))
    } else {
        return inscrireMembreErreur(data, {
            code: response.status,
            text: response.statusText,
            body: response.body
        })
    }
}


/*
 * Async actions creators => Going to the server
 */
export const postInscription = data => {
    console.log(data)
    return dispatch => {
        dispatch(inscrireMembre(data))
        return fetch('/api/personnes/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationHeader()
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response =>
                response
                    .text()
                    .then(body => Promise.resolve({
                        ok: response.ok,
                        status: response.status,
                        statusText: response.statusText,
                        body
                    }))
            , error => console.log(error))
            .then(response =>
                dispatch(handlePostResponse(data, response)),

        )
    }
}

export const putAppel = data => {
    console.log(data)
    return dispatch => {
        dispatch(enregistrerAppel(data))

        console.log("JON SNOW ", JSON.stringify(data))



        return fetch('/api/cours/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)  // you gotta chaaaaaaaaaaaaaaaaaaange meeeeeeeeeeeeeeeeeeee
        })
            .then(response =>
                response.text().then(body => Promise.resolve({
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    body
                }))
            , error => console.log(error))
            .then(response =>
                dispatch(handlePutResponse(data, response))
            )
    }
}