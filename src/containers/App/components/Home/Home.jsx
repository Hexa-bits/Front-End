import React from 'react';
import GameList from '../../../../components/Game_List/Game_List.jsx';
import useGames from '../../../../hooks/Home/useGames.js';
import { useState } from 'react'
//import './Home.css';

function Home() {
    const { games, handleJoin} = useGames();

    return (
        <section className="GameList__Home">
            <GameList games={games} handleJoin={handleJoin} />
        </section>
    );
}



export default Home;
