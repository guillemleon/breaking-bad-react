import React from 'react'
import './character-list.css';
import CharacterCard from "../character-card/character-card";
import {useTranslation} from "react-i18next";

function CharacterList({ data, errorState, isFavList = false }) {

    const [t, i18n] = useTranslation("global")

    return (
        <ul className="list-container">
            {( !isFavList && errorState.hasError ) && <div>{errorState.message}</div>}
            {( data.length <= 0 || !data ) && isFavList &&
                <div className="text-white mb-5">{t("homePage.favListEmpty")}</div>
            }
            {data.map((character, index) => (
                <CharacterCard index={index} key={character.name} data={character} isFavList={isFavList} />
            ))}
        </ul>
    );
}

export default CharacterList;
