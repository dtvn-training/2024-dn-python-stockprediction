import axios from 'axios';
import { useState } from 'react';
import {useToken} from '../../components/token'
import { useNavigate } from 'react-router-dom';

export const getUserByEmail = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/getUserByEmail");
        return response.data;
    } catch (error) {
        throw error;
    }
};
