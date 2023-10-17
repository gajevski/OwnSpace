'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Games() {
    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        description: "",
    });

    useEffect(() => {
        fetch('/api/games')
            .then(response => response.json())
            .then(data => {
                setGames(data.games);
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
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.add_game_modal.close();
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="h-full flex flex-col prose">
            <div className="flex flex-row justify-between">
                <h1>Games:</h1>
                <div className="flex justify-end">
                    <button className="btn btn-accent" onClick={() => document.getElementById('add_game_modal').showModal()}>Add game</button>
                </div>
            </div>
            <div>
                {games.map((game) => (
                    <div key={game.id}>
                        <Link className="no-underline" href={`/games/${game.id}`}>
                            <h3>{game.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            <dialog id="add_game_modal" className="modal">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-8">Add a new game</h3>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleInputChange}
                            value={formData.image}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleInputChange}
                            value={formData.title}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleInputChange}
                            value={formData.description}
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={() => window.add_game_modal.close()}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={addGame}
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
