const baseURL = process.env.REACT_APP_API_URL;

/* const fetchSinToken = (enpoint, data, method = 'GET') => { } */

const fetchSinToken = (enpoint, data, method = 'GET') => {

    const url = `${baseURL}/${enpoint}`; //Ejemplo: http://localhost:4000/api

    /* Si el método de la petición es GET, se devuelve la url;
        si no es un método GET, se devuelve la url igualmente pero añadiendo
        el método (POST, PUT, DELETE), los headers y el body formateado como un JSON.
    */
    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchConToken = (enpoint, data, method = 'GET') => {

    const url = `${baseURL}/${enpoint}`; //Ejemplo: http://localhost:4000/api
    const token = localStorage.getItem('token') || '';

    /* Si el método de la petición es GET, se devuelve la url;
        si no es un método GET, se devuelve la url igualmente pero añadiendo
        el método (POST, PUT, DELETE), los headers y el body formateado como un JSON.
    */
    if (method === 'GET') {
        return fetch(url,
            {
                method,
                headers: {
                    'x-token': token
                }
            });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data),
        });
    };
};

export {
    fetchSinToken,
    fetchConToken
}