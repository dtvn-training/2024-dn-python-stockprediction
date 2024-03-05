import axios from 'axios';
const API_BASE_URL = "http://127.0.0.1:5000";

export const getAllStocks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllStocks`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getStockbyDate = async(selectedDate: Date | null) => {
    try {
        if (selectedDate) {
            let year = selectedDate.$y;
            let month = (selectedDate.$M + 1).toString().padStart(2, '0'); 
            let day = selectedDate.$d.getDate().toString().padStart(2, '0');
            let dateString = year + '-' + month + '-' + day;
            console.log("Selected date:", selectedDate.$d);
            const response = await axios.get(`${API_BASE_URL}/getAllStocks/${dateString}`);
            console.log(response,"res")
            return response.data;
          } else {
            console.log("Please select a date");
          }
    } catch (error) {
        throw error;
    }
};