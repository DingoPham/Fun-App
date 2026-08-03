import { emitUnauthorized } from "./AuthEvents";

const BASE_URL = process.env.REACT_APP_API_URL;

async function request(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        ...options
    });
    if (!res.ok) {
        if (res.status === 401) {
            emitUnauthorized();
        }
        const message = await res.text();
        const error = new Error(message);
        error.status = res.status;
        throw error;
    }
    if (res.status === 204) return null;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await res.json();
    }
    return await res.text();
}

export const api = {
    get(endpoint) {
        return request(endpoint);
    },
    post(endpoint, data) {
        return request(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    },

    put(endpoint, data) {
        return request(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    },

    delete(endpoint) {
        return request(endpoint, {
            method: "DELETE"
        });
    }
};