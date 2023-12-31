import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import "../models/window";
import { Game } from "../models/game";

interface FormData {
    image: string;
    title: string;
    description: string;
}

export default function Games(): JSX.Element {
    const [games, setGames] = useState<Game[]>([]);
    const [formData, setFormData] = useState<FormData>({
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

    const addGame = async (): Promise<void> => {
        try {
            const response = await fetch("/api/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                (window as Window & typeof globalThis & { add_game_modal: HTMLDialogElement; }).add_game_modal.close();
                console.log("Game created successfully!");
            } else {
                console.error("Failed to create a game");
            }
        } catch (error: unknown) {
            console.error("Error creating a game:", error);
        } finally {
            console.log('finally');
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <button className="btn btn-accent" onClick={() => (document.getElementById('add_game_modal') as HTMLDialogElement).showModal()}>Add game</button>
                </div>
            </div>
            <div>
                {games.map((game: Game) => (
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
                        <textarea className="textarea textarea-bordered textarea-md w-full max-w-xs" name="description" onChange={handleInputChange} value={formData.description}></textarea>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={() => (window as Window & typeof globalThis & { add_game_modal: HTMLDialogElement; }).add_game_modal.close()}>
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
