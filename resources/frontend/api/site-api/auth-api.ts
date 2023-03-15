import axios from "axios";

export const authAPI = {

    register(formData: FormData) {
        return axios.post("/api/auth/signup", formData).then(res => res.data);
    },

    login(formData: FormData) {
        return axios.post("/api/auth/login", formData).then(res => res);
    },

    getUser(access_token: string) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;

        return axios.get("/api/auth/user").then(res => res.data);
    },

    logout() {
        return axios.get("/api/auth/logout").then(res => res.data);
    }
};
