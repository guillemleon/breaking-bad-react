import './App.css';
import {useEffect, useState} from "react";
import {getCharacters} from "./api/characters";
import 'bootstrap';
import CharacterCard from "./components/character-card/character-card";

function App() {

    const [characters, setCharacters] = useState([]);
    const [errorState, setErrorState] = useState({ hasError: false });
    const [loadingData, setLoadingData] = useState(false)

    useEffect(() => {
        setLoadingData(true)
        getCharacters()
            .then((data) => setCharacters(data))
            .catch(handleError)
            .finally(() => setLoadingData(false));
    }, [])

    const handleError = (err) => {
        setErrorState({ hasError: true, message: err.message });
    }

    return (
        <div className="app">
            {loadingData ?
                <div className="loading-message-container">
                    <p>...Loading characters</p>
                </div> :
                <ul className="list-container">
                    {errorState.hasError && <div>{errorState.message}</div>}
                    {characters.map(char => (
                        <CharacterCard key={char.name} data={char} />
                    ))}
                </ul>
            }
        </div>
    );
}

export default App;
