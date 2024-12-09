import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/apiRoutes.js';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    style: {
      backgroundColor: '#2e3440',
      color: '#d08770',
      padding: '10px',
      borderRadius: '10px',
    },
    progressStyle: {
      background: '#bf616a',
    },
  };

  useEffect(() => {
    if (localStorage.getItem('Chitthi-User')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      
      try {
        const { data } = await axios.post(loginRoute, { username, password });


        if (!data.status) {
          toast.error(data.msg, toastOptions);
        } 
        if(data.status) {
          localStorage.setItem('Chitthi-User', JSON.stringify(data.user));
          navigate('/');
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username ==="") {
      toast.error('Credentials are Required.', toastOptions);
      return false;
    } else if (password=== "") {
      toast.error('Credentials are Required.', toastOptions);
      return false;
    } 
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chitthi</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaf5da;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fdfde7;
    border-radius: 2.5rem;
    padding: 1rem 9rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

    .brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;

      img {
        height: 10rem;
        width: 10rem;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
      }

      h1 {
        color: #34495e;
        font-size: 2.5rem;
        text-transform: capitalize;
        margin: 0;
        font-family: 'Chitthi', sans-serif;
        font-weight: 500;
      }
    }

    input {
      background-color: #f6f7f9;
      padding: 1rem;
      border: 0.1rem solid #7f8c8d;
      border-radius: 0.7rem;
      font-size: 1.1rem;
      transition: 0.3s ease;

      &::placeholder {
        color: #95a5a6;
      }

      &:focus {
        border-color: #3498db;
        outline: none;
      }
    }

    button {
      background-color: #3498db;
      color: white;
      padding: 1.2rem;
      border: none;
      font-weight: bold;
      font-size: 1.3rem;
      border-radius: 0.7rem;
      text-transform: uppercase;
      transition: 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: #2980b9;
      }
    }

    span {
      text-align: center;
      font-size: 1rem;

      a {
        color: #3498db;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Login;
