import { MAIN_URL } from "./constants";

class MainApi {
    constructor(options) {
        this._url = options.url;
    }

    async _sendRequest(path, requestOptions) {

        try {
            const response = await fetch(`${this._url}/${path}`, { ...requestOptions });

            if (!response.ok) {
                throw response;
            }

            const data = path === 'login/student' ? await response.text() : await response.json();
            return data;
        } catch (error) {
            throw error;
        };
    };

    login({ username, password }) {

        return this._sendRequest(`login/student`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            })
        });
    };

    createOrder({ name, phone, comment }) {

        return this._sendRequest(`orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                status: 'OPEN',
                customerName: name,
                customerPhone: phone,
                comment,
            }),
        });
    };

    getOrderById({ orderId }) {

        return this._sendRequest(`orders/${orderId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        });
    };

    getAllOrders() {

        return this._sendRequest(`orders`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        });
    };

};

const api = new MainApi({ url: MAIN_URL });

export default api;