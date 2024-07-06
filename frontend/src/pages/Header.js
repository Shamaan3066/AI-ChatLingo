import React from "react";
import './header.css';
import headerLogo from './header-logo.png';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    if(localStorage.getItem('userData-chatlingo')) {
      localStorage.removeItem('userData-chatlingo');
    }
    if(localStorage.getItem('chatlingo-geminiKey')) {
      localStorage.removeItem('chatlingo-geminiKey');
    }
    navigate('/login');
  }

  return (
    <div className="header">
      <div className="logo-container">
        <Link to='/'>
          <img src={headerLogo} alt="Logo" className="header-logo" />
        </Link>
        <Link to='/' className="title-link">
          AI ChatLingo
        </Link>
      </div>
      <div className="button-container">
        <button onClick={logout}>Logout</button>
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
          <button>Generate Gemini API Key</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
