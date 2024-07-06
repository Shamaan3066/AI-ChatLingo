import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { registerApi } from '../utils/ApiRequests';

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Reset error message

        const { username, email, password } = values;

        try {
            const { data } = await axios.post(registerApi, {
                username,
                email,
                password
            });
            setIsLoading(false);

            if (data.success === true) {
                const userData = data.user;
                delete userData.password;
                if(localStorage.getItem('userData-chatlingo')) {
                    localStorage.removeItem('userData-chatlingo');
                }
                localStorage.setItem('userData-chatlingo', JSON.stringify(userData));
                navigate('/');
            } else {
                setErrorMessage(`Failed to sign up: ${data.message}`); // Set error message
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMessage(error.response?.data?.message || error.message); // Set error message
        }
    };

    return (
        <div className="auth-page">
        <div className="auth-container">
            <div className="container-box">
                <h1>Welcome to AI ChatLingo</h1>
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    
                    {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                    
                    {isLoading && (
                        <div className="loading-indicator">
                            <p>Loading...</p>
                        </div>
                    )}

                    <div className="username">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="username"
                            value={values.username}
                            placeholder="Enter Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="email">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
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
                            value={values.password}
                            placeholder="Enter password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <div>
                    <p>
                        Already have an account?
                        <Link to='/login' className="link">    Login here</Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Register;
