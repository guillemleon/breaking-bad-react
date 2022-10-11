import React from 'react'
import './character-card.css';
import {useNavigate} from "react-router-dom";
import {add, remove} from "../../reducers/favourite-characters";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

function CharacterCard({ data, favouriteCharacters, addFavCharacter, removeFavCharacter, isFavList, index }) {

    let navigate = useNavigate();
    const [t, i18n] = useTranslation("global")

    return (
        <div className="card shadow p-1 mb-5 border-0" style={{ width: "18rem" }}>
            <div className="card-image-container">
                <img className="card-img-top" src={data.img} alt={`${data.name} image`} />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text mb-2">{`${t("characterDetailsPage.status")}: ${data.status}`}</p>
                <a className="btn btn-success mt-auto" onClick={() => handleNavigation(data)}>{t("homePage.seeMoreButton")}</a>
                {isFavList ?
                    <a className="btn btn-warning mt-3" onClick={() => removeFavCharacter(index)}>{t("homePage.removeFromFavButton")}</a> :
                    <a className="btn btn-warning mt-3" onClick={() => handleAddCharacter()}>{t("homePage.addToFavButton")}</a>
                }
            </div>
        </div>
    );

    /**
     * Navigate to specific character's page sending all it's data.
     * @param data
     */
    function handleNavigation(data) {
        navigate(`/character/${data.char_id}`, {
            state: {
                data: data
            }
        })
    }

    /**
     * Add character to favourites list if he's not there yet.
     */
    function handleAddCharacter() {
        let exists = false;
        favouriteCharacters.map(char => {
            if(char.char_id === data.char_id) exists = true;
        })
        if(!exists) addFavCharacter(data)
    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => ({
    addFavCharacter: character => dispatch(add(character)),
    removeFavCharacter: index => dispatch(remove(index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterCard);
