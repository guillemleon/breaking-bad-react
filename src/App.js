import React from 'react'
import './App.css';
import {Route, Routes} from "react-router-dom";
import CharacterDetail from "./pages/character-detail/character-detail";
import Home from "./pages/home/home";
import {BrowserRouter as Router} from "react-router-dom";

function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/character/:characterId" element={<CharacterDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
