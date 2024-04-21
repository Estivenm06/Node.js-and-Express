import axios from "axios"
const baseUrl = "http://localhost:3001/api/notes/"

const getAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(res => res.data)
}

const create = (id) => {
    const request = axios.post(`${baseUrl}`, id)
    return request.then(res => res.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}

export default {getAll, create, update}