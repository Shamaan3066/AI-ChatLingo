import { useEffect } from "react";
import './modules-home.css';
import Header from '../Header';
import { useParams, useNavigate } from "react-router-dom";

const ModulesHome = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData-chatlingo'));
  useEffect(() => {
    const firstlog = async() => {
        if(localStorage.getItem('userData-chatlingo')) {
        }
        else {
            navigate('/login');
        }
    }
    firstlog();
}, [navigate, userData]);

    const language = useParams();
    const extractLanguage = language['language-modules'];
    const splitLanguage = extractLanguage.split('-')[0];
    const capitalizedLanguage = splitLanguage.charAt(0).toUpperCase() + splitLanguage.slice(1);

    const moduleClicked = async (moduleNumber) => {
        navigate(`/${splitLanguage}/${moduleNumber}`);
    };

    return (
        <>
        <Header />
        <h2>{`${capitalizedLanguage}`} Modules</h2>
        <div className="module-page">
        <div className="module-container">
          {[...Array(12).keys()].map((_, index) => (
            <div key={index + 1} className={`module-box m${index + 1}`}>
              <button id={`module-${index + 1}`} onClick={() => moduleClicked(index + 1)}>
                Module {index + 1}
              </button>
            </div>
          ))}
        </div>
      </div>
        </>
    );
}

export default ModulesHome;