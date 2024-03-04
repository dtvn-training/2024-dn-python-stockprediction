import { useState } from 'react';
import axios from 'axios';
import {useToken} from '../../components/token'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const API_BASE_URL = "http://127.0.0.1:5000";
export function useLoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const { setToken } = useToken();
  async function logmeIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!loginForm.email || !loginForm.password) {
        toast.error('Vui lòng nhập đầy đủ thông tin'); // Hiển thị thông báo lỗi
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/token`, {
            email: loginForm.email,
            password: loginForm.password
        });

        setToken(response.data.access_token);
        setLoginForm({ email: "", password: "" });
        window.location.href = "/";
    } catch (error) {
        console.error('Error:', error);
    }
}
  
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginForm(prevState => ({ ...prevState, [name]: value }));
  }

  function logMeOut() {
    axios({
      method: "POST",
      url: `${API_BASE_URL}/logout`,
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return { loginForm, handleChange, logmeIn, logMeOut };
}
export function useSignUpForm() {
  const [signUpForm, setSignUpForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const { setToken } = useToken();
  const navigate = useNavigate(); // Initialize useNavigate hook

  function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission
    
    axios.post(`${API_BASE_URL}/signup`, {
      fullname: signUpForm.fullname,
      email: signUpForm.email,
      password: signUpForm.password
    })
    .then((response) => {
      setToken(response.data.access_token);
      clearSignUpForm();
      navigate('/login'); // Navigate to the login page after successful registration
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignUpForm(prevState => ({ ...prevState, [name]: value }));
  }

  function clearSignUpForm() {
    setSignUpForm({ fullname: "", email: "", password: "" });
  }

  return { signUpForm, handleChange, signUp, clearSignUpForm };
}