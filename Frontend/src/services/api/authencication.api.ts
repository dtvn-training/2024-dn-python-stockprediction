import { useState } from 'react';
import axios from 'axios';
import {useToken} from '../../components/token'
import { useNavigate } from 'react-router-dom';
export function useLoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const { setToken } = useToken();
  function logmeIn(event: React.FormEvent<HTMLFormElement>) {
    axios.post("http://127.0.0.1:5000/token", {
      email: loginForm.email,
      password: loginForm.password
    })
    .then((response) => {
      setToken(response.data.access_token);
      setLoginForm({ email: "", password: "" });
      window.location.href = "/";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginForm(prevState => ({ ...prevState, [name]: value }));
  }

  return { loginForm, handleChange, logmeIn };
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
    
    axios.post("http://127.0.0.1:5000/signup", {
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

