import ky from "ky"

const client = ky.create({
    prefixUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include',
})

export default client
