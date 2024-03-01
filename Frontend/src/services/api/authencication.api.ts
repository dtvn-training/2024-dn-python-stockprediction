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

  function logMeOut() {
    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/logout",
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
      alert("Họ và tên không được chứa ký tự số.");
      return;
    } else {
      setFullnameError(false)
    }
    if (!isValidPassword(signUpForm.password)) {
      setPasswordError(true);
      alert("Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa, một số và một ký tự đặc biệt.")
      return; 
    } else {
      setPasswordError(false)
    }
    if (!isConfirmPassword(signUpForm.password, signUpForm.confirmpassword)) {
      setConfirmPasswordError(true);
      alert("Mật khẩu xác nhận không trùng khớp")
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
      if (error.response.status === 409) {
        alert(error.response.data.error);
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
    setSignUpForm(prevState => ({ ...prevState, [name]: value }));
  }

  function clearSignUpForm() {
    setSignUpForm({ fullname: "", email: "", password: "" ,confirmpassword:""});
  }

  return { signUpForm, handleChange, signUp, clearSignUpForm, fullnameError, emailError, passwordError, confirmPasswordError };
}