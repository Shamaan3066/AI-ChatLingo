import React, { useEffect } from "react";
import LanguageBoxes from "./LanguageBoxes";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const firstlog = async() => {
            if(localStorage.getItem('userData-chatlingo')) {
                // eslint-disable-next-line
                const userData = JSON.parse(localStorage.getItem('userData-chatlingo'));
            }
            else {
                navigate('/login');
            }
        }
        firstlog();
    }, [navigate]);

    return(
        <>
        <Header />
        <LanguageBoxes />
        </>
    );
}

export default Home;