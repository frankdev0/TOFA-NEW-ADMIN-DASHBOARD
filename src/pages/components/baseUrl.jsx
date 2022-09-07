import api from "axios"

export const axios = api.create({
    withCredentials: true
})