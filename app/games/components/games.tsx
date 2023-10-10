import React, { useEffect, useState } from 'react';

function UserGames() {
  const [games, setGames]: any = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');

        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.error('Failed to fetch games');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  });

  return (
    <div>
      <h2>User's Games</h2>
      <ul>
        {games?.games?.map((game: any) => (
          <li key={game.id}>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <img src={game.image} alt={game.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserGames;