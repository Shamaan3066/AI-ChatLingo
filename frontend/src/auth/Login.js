import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { loginApi } from '../utils/ApiRequests';
import './auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { email, password } = values;
        setIsLoading(true);
        setErrorMessage(''); // Reset error message

        try {
            const { data } = await axios.post(loginApi, { email, password });

            if(data.success === true) {
                if(localStorage.getItem('userData-chatlingo')) {
                    localStorage.removeItem('userData-chatlingo');
                }
                delete data.user.password;
                localStorage.setItem('userData-chatlingo', JSON.stringify(data.user));
                navigate('/');
            } else {
                setErrorMessage('Failed to login'); // Set error message
            }
        } catch(error) {
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="background-animation"></div>
            <div className="container-box">
                <h1>Welcome to AI ChatLingo</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        
                        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}

                        <div className="email">
                            <label>Email:</label>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="password">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                    <p>
                        Don't have an account?
                        <Link to="/register" className="link">Register Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
