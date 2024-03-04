import { useState } from 'react';
import axios from 'axios';
import {useToken} from '../../components/token'
import { useNavigate } from 'react-router-dom';
export function useLoginForm() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const API_BASE_URL = "http://127.0.0.1:5000";
  const { setToken } = useToken();
  function logmeIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.post(`${API_BASE_URL}/token`, {
      email: loginForm.email,
      password: loginForm.password
    })
    .then((response) => {
      setToken(response.data.access_token);
      setLoginForm({ email: "", password: "" });
      window.location.href = "/";
    })
    .catch((error) => {
      if (error.response.status === 401) {
        setEmailError(true);
        setPasswordError(true);
      }
      console.error('Error:', error);
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "email"){
      setEmailError(false)
    }   
    if (name === "password"){
      setPasswordError(false)
    }
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

  return { loginForm, handleChange, logmeIn, logMeOut ,passwordError,emailError};
}
export function useSignUpForm() {
  const [signUpForm, setSignUpForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword:""
  });
  const { setToken } = useToken();
  const navigate = useNavigate(); 

  const [fullnameError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 

    if (!isFullValue(signUpForm)) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!isValidFullname(signUpForm.fullname)) {
      setFullnameError(true);
      return;
    } else {
      setFullnameError(false)
    }

    if (!isValidPassword(signUpForm.password)) {
      setPasswordError(true);
      return; 
    } else {
      setPasswordError(false)
    }

    if (!isConfirmPassword(signUpForm.password, signUpForm.confirmpassword)) {
      setConfirmPasswordError(true);
      return; 
    } else {
      setConfirmPasswordError(false)
    }
    axios.post("http://127.0.0.1:5000/signup", {
      fullname: signUpForm.fullname,
      email: signUpForm.email,
      password: signUpForm.password
    })
    .then((response) => {
      if (response.status === 200) {
        alert(response.data.success);
        setToken(response.data.access_token);
        setEmailError(false);
        clearSignUpForm();
        navigate('/login'); 
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        setEmailError(true);
      }
      console.error('Error:', error);
    });
  }

  function isFullValue(signUpForm: { [key: string]: string }): boolean {
    for (const key in signUpForm) {
        if (signUpForm[key].trim() === '') {
            return false;
        }
    }
    return true; 
  }

  function isValidFullname(fullname: string) {
    return !/\d/.test(fullname);
  }

  function isValidPassword(password: string) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  function isConfirmPassword(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "fullname"){
      setFullnameError(false)
    }      
    if (name === "email"){
      setEmailError(false)
    }   
    if (name === "password"){
      setPasswordError(false)
    }
    if (name === "confirmpassword"){
      setConfirmPasswordError(false)
    }
    setSignUpForm(prevState => ({ ...prevState, [name]: value }));
  }

  function clearSignUpForm() {
    setSignUpForm({ fullname: "", email: "", password: "" ,confirmpassword:""});
  }

  return { signUpForm, handleChange, signUp, clearSignUpForm, fullnameError, emailError, passwordError, confirmPasswordError };
}