import React from 'react'
import breakingBadLogo from "../../assets/images/breaking-bad-logo.png";
import CharacterList from "../../components/character-list/character-list";
import {useEffect, useState} from "react";
import {apiCall} from "../../api/characters";
import './home.css';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

function Home(favouriteCharacters) {

    const [characters, setCharacters] = useState([]);
    const [errorState, setErrorState] = useState({ hasError: false });
    const [loadingData, setLoadingData] = useState(false)

    const [t, i18n] = useTranslation("global")

    useEffect(() => {
        // Getting all character quotes calling the API and handle possible errors
        setLoadingData(true)
        apiCall('https://www.breakingbadapi.com/api/characters/')
            .then((data) => setCharacters(data))
            .catch(handleError)
            .finally(() => setLoadingData(false));
    }, [])

    useEffect(() => {
        console.log(favouriteCharacters)
    })

    const handleError = (err) => {
        setErrorState({ hasError: true, message: err.message });
    }

    const handleChangeLang = locale => {
        i18n.changeLanguage(locale);
    }

    return (
        <div className="app">
            <img className="logo" src={breakingBadLogo} alt="Breaking bad logo" />
            <div className="buttons-container align-self-center mb-5">
                <button className="btn btn-dark m-2" onClick={() => handleChangeLang("en")}>EN</button>
                <button className="btn btn-dark m-2" onClick={() => handleChangeLang("es")}>ES</button>
            </div>
            {loadingData ?
                <div className="loading-message-container">
                    <p>{t("homePage.loadingData")}</p>
                </div> :
                <div>
                    <h2 className="text-white text-center mb-5">{t("homePage.favListTitle")}</h2>
                    <CharacterList data={favouriteCharacters.favouriteCharacters} isFavList={true} />
                    <h3 className="text-white text-center mb-5">{t("homePage.allCharactersTitle")}</h3>
                    <CharacterList data={characters} errorState={errorState} />
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return state;
}

export default connect(
    mapStateToProps
)(Home);