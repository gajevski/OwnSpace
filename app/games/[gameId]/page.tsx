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
        <div className="h-full flex flex-col prose">
            <h1>{game.title}</h1>
            <img src={game.image} alt={game.title} />
            <p>{game.description}</p>
        </div>
    );
}
