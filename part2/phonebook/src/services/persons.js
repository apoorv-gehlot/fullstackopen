import axios from 'axios'

const base_url = '/api/persons'

const getAll = () => {
    const request = axios.get(base_url)
    return request.then(response => response.data).catch(error => error.response)
}

const create = (newObject) => {
    const request = axios.post(base_url, newObject)
    return request.then(response => response.data).catch(error => {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            return Promise.reject(error.response.data.error)
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    })
}

const remove = (id) => {
    const request = axios.delete(`${base_url}/${id}`)
    return request.then(response => response.data).catch(error => error.response)
}

const update = (id, newObject) => {
    const request = axios.put(`${base_url}/${id}`, newObject)
    return request.then(response => response.data).catch(error => error.response)
}

export default { getAll, create, remove, update }