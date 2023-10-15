'use client'

import { useState, useEffect } from "react";

export default function gameId({ params }) {
    const [game, setGame] = useState([]);


    useEffect(() => {
        fetch(`/api/games/${params.gameId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data, 'data');
                setGame(data.game);
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }, []);


    return (
        <div className="h-full flex flex-col">
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <img src={game.image} alt={game.title} />
        </div>
    );
}
