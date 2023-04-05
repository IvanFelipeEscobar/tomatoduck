export const getMe = (token) => {
    return fetch(`/api/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
}

export const createUser = (userData) => {
    return fetch(`/api/users`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
}

export const loginUser = (userData) => {
    return fetch(`/api/users/login`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
}

export const saveTodo = (todoData, token) => {
    return fetch(`/api/users`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todoData)
    })
}

export const deleteTodo = (todoData, token) => {
    return fetch(`/api/users/todos/:todoId`, {
        method: 'DELETE',
        header: {
            authorization: `Bearer ${token}`
        }
    })
}


