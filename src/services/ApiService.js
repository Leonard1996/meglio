import {BACKEND_API_URL, BACKEND_RESOURCE_URL, BACKEND_BASE_URL} from "../config";
import StorageService from "./StorageService";

const Storage = new StorageService();
export default class ApiService {
    #makeHeaders = () => {
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        }

        return headers;
    };

    #makeBody = (data) => {
        return JSON.stringify(data);
    };

    async postData(path, data) {
        let endpoint = BACKEND_API_URL + path;
        console.warn("POST: " + endpoint);
        console.warn("DATA", data);
        let requestData = {
            method: "POST",
            headers: await this.#makeHeaders(),
            body: this.#makeBody(data),
        };
        return await fetch(endpoint, requestData)
            .then((res) => {
                const statusCode = res.status;
                const data = res.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, data]) => {
                return {...data, statusCode: statusCode};
            })
            .catch((e) => console.log(e));
    }

    async getData(path) {
        let endpoint = BACKEND_API_URL + path;

        let requestData = {
            method: "GET",
            headers: await this.#makeHeaders(),
        };

        return await fetch(endpoint, requestData).then((res) => {
            const statusCode = res.status;
            const data = res.json();
            return Promise.all([statusCode, data]);
        })
            .then(([statusCode, data]) => {
                return {...data, statusCode: statusCode};
            })
            .catch((e) => console.log(e));
    }

    async getResource(path) {
        let endpoint = BACKEND_RESOURCE_URL + path;
        let requestData = {
            method: "GET",
            headers: this.#makeHeaders(),
        };

        return await fetch(endpoint, requestData).then((res) => {
            const statusCode = res.status;
            const data = res.json();
            return Promise.all([statusCode, data]);
        })
            .then(([statusCode, data]) => {
                return {...data, statusCode: statusCode};
            })
            .catch((e) => console.log(e));
    }

    async startSession(path) {
        let endpoint = BACKEND_BASE_URL + path;

        let requestData = {
            method: "GET",
        };

        return await fetch(endpoint, requestData)
        .catch((e) => console.log(e));
    }

}
