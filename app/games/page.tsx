'use client'

import UserGames from "./components/games";

export default function Games() {
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
                <button className="btn btn-accent" onClick={addGame}>Add game</button>
            </div>
            <UserGames />
        </div>
    );
}
