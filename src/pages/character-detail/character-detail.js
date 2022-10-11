import React from 'react'
import './character-detail.css';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiCall} from "../../api/characters";
import {useTranslation} from "react-i18next";

function CharacterDetail() {

    const location = useLocation();
    const data = location.state.data;
    const [quotes, setQuotes] = useState([]);
    const [errorState, setErrorState] = useState({ hasError: false });
    const [loadingData, setLoadingData] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(null);

    const [t, i18n] = useTranslation("global")

    useEffect(() => {
        // On load page reset scroll top to 0
        window.scrollTo(0, 0);

        // Getting all character quotes calling the API and handle possible errors
        setLoadingData(true)
        apiCall(`https://www.breakingbadapi.com/api/quote?author=${data.name}`)
            .then((data) => {
                setQuotes(data)
                setCurrentQuote(data[generateRandomNumber(data.length)].quote)
            })
            .catch(handleError)
            .finally(() => setLoadingData(false));
    }, [])

    const handleError = (err) => {
        setErrorState({ hasError: true, message: err.message });
    }

    const handleChangeLang = locale => {
        i18n.changeLanguage(locale);
    }

    /**
     * Generates a random number from 0 to X
     * @param length
     * @returns {number}
     */
    const generateRandomNumber = (length) => {
        return Math.floor(Math.random() * length)
    }

    return (
        <div className="details-page-container">
            <h1 className="page-title">
                {data.name}
            </h1>
            <div className="buttons-container align-self-center mb-5">
                <button className="btn btn-dark m-2" onClick={() => handleChangeLang("en")}>EN</button>
                <button className="btn btn-dark m-2" onClick={() => handleChangeLang("es")}>ES</button>
            </div>
            <div className="page-subtitle mb-5">
                {loadingData ?
                    <div className="lds-ring"><div /></div> :
                    (quotes.length === 0 ? `${data.name} ${t("characterDetailsPage.characterHasNoQuotes")}` : currentQuote)
                }
            </div>
            {quotes.length > 0 &&
                <button className="btn btn-warning mb-4 shadow" onClick={generateQuote}>{t("characterDetailsPage.randomQuoteButton")}</button>
            }
            <section className="details-page-image-card shadow">
                <div className="details-page-image-container">
                    <img className="details-page-image" src={data.img} alt={`Image of ${data.name}`} />
                </div>
            </section>
            <section className="character-details-container shadow">
                <p><b>{t("characterDetailsPage.name")}: </b> {data.name}</p>
                <p><b>{t("characterDetailsPage.birthday")}: </b> {data.birthday}</p>
                <p><b>{t("characterDetailsPage.status")}: </b> {data.status}</p>
                <p><b>{t("characterDetailsPage.nickname")}: </b> {data.nickname}</p>
                <p><b>{t("characterDetailsPage.category")}: </b> {data.category}</p>
                <ul className="occupation-list"><b>{t("characterDetailsPage.occupation")}:</b>
                    {data.occupation.map(occupation => (
                        <li key={occupation}  className="occupation-list-element">
                            <p className="card-text mb-1">{occupation}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );

    /**
     * Chooses a random quote
     */
    function generateQuote() {
        setCurrentQuote(quotes[generateRandomNumber(quotes.length)].quote)
    }
}

export default CharacterDetail;
