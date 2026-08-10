import { emitUnauthorized } from "./AuthEvents";

const BASE_URL = process.env.REACT_APP_API_URL;

async function request(endpoint, options = {}) {
    const {
        skipUnauthorized = false,
        ...fetchOptions
    } = options;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        ...fetchOptions
    });

    if (!res.ok) {
        if (res.status === 401 && !skipUnauthorized) {
            emitUnauthorized();
        }

        const message = await res.text();

        const error = new Error(message);
        error.status = res.status;

        throw error;
    }

    if (res.status === 204) {
        return null;
    }

    const contentType = res.headers.get("content-type");

    if (
        contentType &&
        contentType.includes("application/json")
    ) {
        return await res.json();
    }

    return await res.text();
}

export const api = {
    get(endpoint, options = {}) {
        return request(endpoint, options);
    },

    post(endpoint, data, options = {}) {
        return request(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            ...options
        });
    },

    put(endpoint, data, options = {}) {
        return request(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            ...options
        });
    },

    upload(endpoint, formData, options = {}) {
        return request(endpoint, {
            method: "POST",
            body: formData,
            ...options
        });
    },

    delete(endpoint, options = {}) {
        return request(endpoint, {
            method: "DELETE",
            ...options
        });
    }
};