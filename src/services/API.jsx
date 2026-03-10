const BASE_URL = process.env.REACT_APP_API_URL

export const api = {
    get: async (endpoint) => {
        const res = await fetch(`${BASE_URL}${endpoint}`)
        if (!res.ok) throw new Error("API error")
        return res.json()
    },

    post: async (endpoint, data) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) throw new Error("API error")
        return res.json()
    },

    put: async (endpoint, data) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) throw new Error("API error")
        return res.json()
    },

    delete: async (endpoint) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE"
        })
        if (!res.ok) throw new Error("API error")
        return res
    }
}