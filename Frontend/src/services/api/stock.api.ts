import axios from 'axios';

export function getAllStocks() {
    return axios.get("http://127.0.0.1:5000/getAllStocks")
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching all stocks:', error);
            throw error;
        });
}
