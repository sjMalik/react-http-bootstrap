import { makeRequest } from "./makeRequest";

export function getAuthors() {
    return makeRequest('/authors')
}

export function getAuthor(id) {
    return makeRequest(`/authors/${id}`)
}

export function createAuthor(data) {
    return makeRequest('/authors', {
        method: "POST",
        data
    })
}