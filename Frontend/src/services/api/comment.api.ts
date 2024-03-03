import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000";

export const getAllComments = async (symbol: string): Promise<any> => {
    try {
        let param = symbol.stocks
        const response = await axios.get(`${API_BASE_URL}/comment/showAll/${param}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching company data:', error);
        throw error;
    }
  };

// const handleCommentEdit = async (commentid: string, commentContent: string ) => {
//     try {
//         const userToken = localStorage.getItem('token');
//         console.log(commentid,'symbol api');
//         const response = await axios.get(`${API_BASE_URL}/comment/update${commentid}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching company data:', error);
//         throw error;
//     }
// }    



    

// export default {getAllComments, handleCommentEdit}