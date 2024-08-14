import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../Header";
import { useParams, useNavigate } from "react-router-dom";
import './chat.css';
import axios from "axios";
import { chatApi, getchatsApi, deleteChatApi } from "../../utils/ApiRequests";
import ReactMarkdown from 'react-markdown';

const ChatHome = () => {
  const geminiAPI = localStorage.getItem('chatlingo-geminiKey');
  const navigate = useNavigate();
  const language = useParams();
  const extractLanguage = language['chatlang'];
  const capitalizedLanguage = extractLanguage.charAt(0).toUpperCase() + extractLanguage.slice(1);
  const userData = JSON.parse(localStorage.getItem('userData-chatlingo'));

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true); // New state variable for loading chats
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [error, setError] = useState(""); 
  const chatHistoryRef = useRef(null);
  const MAX_CHARACTERS = 500;
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = chatHistoryRef.current;
    if (scrollHeight - scrollTop === clientHeight) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
  }, []);

  useEffect(() => {
    const getChats = async () => {
      if (localStorage.getItem('userData-chatlingo')) {
        try {
          const response = await axios.post(getchatsApi, {
            userId: userData._id,
            language: capitalizedLanguage
          });
          if (response.data && response.data.chats && Array.isArray(response.data.chats[0].messages)) {
            setChatHistory(response.data.chats[0].messages);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingChats(false); // Set loading chats to false after the response is received
        }
      } else {
        navigate('/login');
      }
    }
    getChats();
  }, [navigate, userData, capitalizedLanguage]);

  useEffect(() => {
    if (isAutoScroll && chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory, isAutoScroll]);

  const handleChange = (event) => {
    const limitedMessage = event.target.value.slice(0, MAX_CHARACTERS);
    setMessage(limitedMessage);
  };

  const geminiResponse = async () => {
    const formattedChatHistory = chatHistory.map(chat => `${chat.sender === "user" ? "User" : "Bot"}: ${chat.message}`).join('\n');

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `
            Chat History:
            ${formattedChatHistory}

            Language for Learning: ${capitalizedLanguage}
            User's Input: ${message}
            Act as a language tutor.
            NOTE: provide your response in ${capitalizedLanguage} and its translation in English.
            Also, provide the ${capitalizedLanguage} text in Roman English with its pronunciation.
            Provide reply to user's message as an AI-chat bot meant for teaching ${capitalizedLanguage}.`
          }]
        }]
      })
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiAPI}`, options);
      const data = await response.json();
      const chatResponse = data.candidates[0].content.parts[0].text;
      try {
        const response = await axios.post(chatApi, {
          userId: userData._id,
          language: capitalizedLanguage,
          messages: [{
            sender: "ai-bot",
            message: chatResponse
          }]
        });
        setChatHistory([...chatHistory, { sender: "bot", message: chatResponse }]);
        setMessage("");
        setIsAutoScroll(true);
      } catch (error) {
        setError("Error sending message. Please try again.");
      }
    } catch {
      setError("Error generating response. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after the response is received
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the form is submitted
    setError(""); // Clear any existing errors
    const userId = userData._id;
    try {
      const response = await axios.post(chatApi, {
        userId,
        language: capitalizedLanguage,
        messages: [{
          sender: "user",
          message
        }]
      });
      setChatHistory([...chatHistory, { sender: "user", message }]);
      setMessage("");
      setIsAutoScroll(true);
      geminiResponse();
    } catch (error) {
      setError("Error sending message. Please try again.");
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  const handleDeleteChatHistory = async () => {
    setIsLoadingDelete(true);
    const userId = userData._id;
    try {
      await axios.delete(deleteChatApi, {
        userId, 
        language: capitalizedLanguage 
      });
      setChatHistory([]);
      setError(""); // Clear any existing errors
      setIsLoadingDelete(false);
    } catch (error) {
      setError("Error deleting chat history. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <h2>Learn {capitalizedLanguage}</h2>
      <div className="chat-page">
        <div className="chat-container">
          <button className="delete-button" onClick={handleDeleteChatHistory} disabled={isLoadingDelete}>
            {isLoadingDelete ? 'Deleting...' : 'Delete Chat History'}
          </button>
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          <div className="chat-history" ref={chatHistoryRef} onScroll={handleScroll}>
            {isLoadingChats ? ( // Display loading indicator while fetching chats
              <p className="loading-message">Loading chats...</p>
            ) : chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <div key={index} className={`chat-message ${chat.sender === "user" ? "user-message" : "bot-message"}`}>
                  <ReactMarkdown>{chat.message}</ReactMarkdown>
                </div>
              ))
            ) : (
              <p className="loading-message">No messages yet.</p>
            )}
          </div>
          <form className="send-message" onSubmit={handleSubmit}>
            <textarea
              className="auto-grow"
              placeholder={`Type your message... (Max ${MAX_CHARACTERS} letters)`}
              value={message}
              onChange={handleChange}
              rows="4"
              disabled={isLoading} // Disable textarea when loading
            />
            <button type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send'}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatHome;
