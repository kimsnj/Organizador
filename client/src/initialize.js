import { init } from './actions/common'

export default (dispatch) => {
    fetch('/api/init/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => response.json()
            .then(json => ({
                ok: response.ok,
                status: response.status,
                json
            })))
        .then(response => {
            console.log(response)
            if (response.ok) {
                dispatch(init(response.json))
            }
        }).catch(reason => {
            console.log('Failed to initialize: ', reason);
        })
}