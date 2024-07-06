import React from 'react';
import './language.css';
import { useNavigate } from 'react-router-dom';

const LanguageBoxes = () => {

  const navigate = useNavigate();
  
  const handleLanguageClick = async(language) => {
    navigate(`/${language}-modules`);
  }

  const handleChatClick = async(chatlang) => {
    if (localStorage.getItem('chatlingo-geminiKey')) {
      navigate(`/chat/${chatlang}`);
    } else {
      const geminiKey = prompt("Please enter your Gemini key:");
      if (geminiKey) {
        localStorage.setItem('chatlingo-geminiKey', geminiKey);
        navigate(`/chat/${chatlang}`);
      } else {
        alert("Gemini key is required to access AI chat.");
      }
    }
  }

  return (
    <div className="language-page">
      <div className="language-container">
        <div className="language-box arabic">
          <h3>Arabic</h3>
          <button id='arabic-modules' onClick={() => handleLanguageClick('arabic')}>Learn by Modules</button>
          <button id='arabic-chat' onClick={() => handleChatClick('arabic')}>Chat and Learn with AI</button>
        </div>
        <div className="language-box french">
          <h3>French</h3>
          <button id='french-modules' onClick={() => handleLanguageClick('french')}>Learn by Modules</button>
          <button id='french-chat' onClick={() => handleChatClick('french')}>Chat and Learn with AI</button>
        </div>
        <div className="language-box german">
          <h3>German</h3>
          <button id='german-modules' onClick={() => handleLanguageClick('german')}>Learn by Modules</button>
          <button id='german-chat' onClick={() => handleChatClick('german')}>Chat and Learn with AI</button>
        </div>
        <div className="language-box hindi">
          <h3>Hindi</h3>
          <button id='hindi-module' onClick={() => handleLanguageClick('hindi')}>Learn by Modules</button>
          <button id='hindi-chat' onClick={() => handleChatClick('hindi')}>Chat and Learn with AI</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageBoxes;