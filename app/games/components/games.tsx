import React, { useEffect, useState } from 'react';

function UserGames() {
  const [games, setGames]: any = useState([]);

  useEffect(() => {
    fetch('/api/games')
      .then(response => response.json())
      .then(data => {
        setGames(data.periods);
      })
      .catch(error => {
        console.error('Error fetching periods:', error);
      });
  }, []);

  return (
    <div>
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