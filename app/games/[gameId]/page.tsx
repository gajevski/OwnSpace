import { Game } from "@/app/models/game";
import { useState, useEffect, useRef } from "react";
import "../models/window";

interface Props {
    params: {
        gameId: string;
    };
}

export default function gameId({ params }: Props): JSX.Element {
    const [game, setGame] = useState<Game>({ title: "", image: "", description: "" });
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    }, [params.gameId]);

    useEffect(() => {
        if (textareaRef.current) {
            adjustTextareaHeight();
        }
    }, [game.description]);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="h-full flex flex-col prose">
            <div className="flex flex-row justify-between">
                <h1>{game.title}</h1>
                <div className="flex justify-end">
                    <button className="btn btn-accent" onClick={() => (document.getElementById('edit_game_modal') as HTMLDialogElement)?.showModal()}>Edit game</button>
                </div>
            </div>
            <img src={game.image} alt={game.title} />
            <p>{game.description}</p>

            <dialog id="edit_game_modal" className="modal">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-8">Edit a game</h3>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={game?.image}
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
                            value={game?.title}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered textarea-md w-full max-w-xs" name="description" value={game?.description} onChange={adjustTextareaHeight} ref={textareaRef}></textarea>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={() => (window as Window & typeof globalThis & { add_game_modal: HTMLDialogElement; }).edit_game_modal.close()}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                        >
                            Edit
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
