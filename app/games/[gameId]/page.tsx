'use client'

import { useState, useEffect } from "react";

export default function gameId({params}) {
    const [games, setGames] = useState([]);


    useEffect(() => {
        fetch(`/api/games/${params.gameId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data, 'data');
                setGames(data.games);
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, []);


    return (
        <div className="h-full flex flex-col">

        </div>
    );
}
