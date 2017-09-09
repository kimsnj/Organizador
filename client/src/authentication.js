const JWT = 'JWT';

export const login = (data, history) => {
    console.log(data)
    fetch('/api-token-auth/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response =>
            response
                .json()
                .then(json => Promise.resolve({
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    json
                }))
        , error => console.log(error))
        .then(response => {
            if (response.ok && response.json.token) {
                window.sessionStorage.setItem(JWT, response.json.token)
                history.push('/dashboard')
            }
            else {
                // FIXME: display error message
                history.push('/login')
            }
        })
}

export const isLoggedIn = () => !!window.sessionStorage.getItem(JWT);
export const getAuthorizationHeader = () => 'JWT ' + window.sessionStorage.getItem(JWT);
export const logOut = (history) => {
    window.sessionStorage.removeItem(JWT);
    history.push('/login');
}