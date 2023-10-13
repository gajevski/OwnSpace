'use client'

import { useEffect, useState } from "react";

export default function Games() {
    const [games, setGames]: any = useState([]);

    useEffect(() => {
        fetch('/api/games')
            .then(response => response.json())
            .then(data => {
                setGames(data.games);
                console.log(data.games, 'data');
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, []);

    const addGame = async () => {
        try {
            const response = await fetch("/api/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: "game_image_url",
                    title: "Game Title",
                    description: "Game Description",
                }),
            });

            if (response.ok) {
                console.log("Game created successfully!");
            } else {
                console.error("Failed to create a game");
            }
        } catch (error) {
            console.error("Error creating a game:", error);
        } finally {
            console.log('finally');
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-end">
                {/* <button className="btn btn-accent" onClick={addGame}>Add game</button> */}
                <button className="btn btn-accent" onClick={() => document.getElementById('add_game_modal').showModal()}>Add game</button>
            </div>
            <div>
                <ul>
                    {games.map((game: any) => (
                        <li key={game.id}>
                            <h3>{game.title}</h3>
                            <p>{game.description}</p>
                            <img src={game.image} alt={game.title} />
                        </li>
                    ))}
                </ul>
            </div>
            <dialog id="add_game_modal" className="modal">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-8">Add a new game</h3>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="text" name="image" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={() => window.add_game_modal.close()}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    );
}
