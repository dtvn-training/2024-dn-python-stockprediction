import axios from 'axios';

export const getAllStocks = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/getAllStocks");
        return response.data;
    } catch (error) {
        throw error;
    }
};