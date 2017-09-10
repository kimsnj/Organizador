import fetch from 'isomorphic-fetch';
import { getAuthorizationHeader, getCsrfToken } from '../authentication'
/*
 * Action types
 */

export const INSCRIRE_MEMBRE = 'INSCRIRE_MEMBRE';
export const ENREGISTRER_APPEL = 'ENREGISTRER_APPEL';
export const LOAD = 'LOAD';

/*
 * Actions status for asynch calls
 */
export const STATUS_REQUESTED = 'requested';
export const STATUS_SUCCES = 'success';
export const STATUS_ERROR = 'error';

/*
 * Action creators
 */

export const load = data => ({ type: LOAD, data })

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
    console.log("handlePostResponse ", response)
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
    console.log("handlePutResponse ", response)
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
    data = dataSpecialTreatment(data);
    console.log("postInscription ", data)
    return dispatch => {
        dispatch(inscrireMembre(data))
        return fetch('/api/personnes/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationHeader(),
                'X-CSRFToken':  getCsrfToken()
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

let dataSpecialTreatment = (data) => {
    data.certificat_medical = data.certificat_medical || false
    data.photo = data.photo || false
    data.fiche_adhesion = data.fiche_adhesion || false
    data.droit_image = data.droit_image || false
    return data;
}

export const putInscription = data => {
    data = dataSpecialTreatment(data);
    return dispatch => {
        dispatch(inscrireMembre(data))
        return fetch('/api/personnes/' + data.id + '/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getAuthorizationHeader(),
                'X-CSRFToken':  getCsrfToken()
            },
            method: 'PUT',
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

let keepOnlyPresences = (data) => {
    var presences = [];
    for (var key in data) {
        if (data[key] === true) {
            presences.push({personne: key, present:true});
        }
    }
    console.log("returning ", presences)
    return presences;
}

export const putAppel = data => {
    var dataToSend = {
        id: data.id,
        presences: keepOnlyPresences(data)}
    
    return dispatch => {
        dispatch(enregistrerAppel(dataToSend))

        return fetch('/api/dates/' + data.id + '/', {
            headers: {
                'Accept': 'application/json',
                'Authorization': getAuthorizationHeader(),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(dataToSend)
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
                dispatch(handlePutResponse(dataToSend, response))
            )
    }
}