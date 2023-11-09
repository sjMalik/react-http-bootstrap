import { makeRequest } from "./makeRequest";

export function getBooks() {
    return makeRequest('/books')
}

export function getBook(id) {
    return makeRequest(`/books/${id}`)
}


export function createBook(data) {
    return makeRequest('/books', {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: "POST",
        data
    })
}