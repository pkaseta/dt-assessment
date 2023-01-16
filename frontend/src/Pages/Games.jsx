import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../sass/Games.scss";


const Games = () => {
  const [games, setGames] = useState([]);
  //How useState works
// const gameState = useState([])
// const games = gameState[0]
// const setGames=gameState[1]
  const [platform, setPlatform] = useState("*");
  const [fetch, setFetch] = useState("all");
  const [platformList, setPlatformList] = useState([]);

  const backendUrl = "http://localhost:8800/games";

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        // const {data} = await axios.get(backendUrl);
        const res = await axios.get(backendUrl);
        const data = res.data
        setGames(data);
        setPlatformList([...new Set(data.map((game)=>{
            return game.platform
        }))])
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFilteredGames = async () => {
      try {
        const res = await axios.get(`${backendUrl}/${platform}`);
        setGames(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllGames();

    if (fetch === "all") {
      fetchAllGames();
    } else fetchFilteredGames();
  }, [fetch, platform]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

//   const handleFilter = (e) => {
//     // setFetch("platform")
//     setPlatform(e.target.value);
//   };

  //Function to convert the title to a required string for a gamestop search result url
  function convertGameStopSearchQuerry(title) {
    const url = encodeURI(`https://www.gamestop.com/search/?q=${title}&type=Primary&sort=BestMatch_Desc&p=1&lang=default`);

    return url;
  }
  return (
    <div className="games-container">
      <h1 className="wishlist-title">Games Wishlist</h1>
      <div className="filter">
        <h3>Filter by Platform!</h3>
        <select
          id="platform-list"
          onChange={(e) => {
            if (e.target.value === "All") {
              setFetch("all");
            } else {
              setFetch("platform");
              setPlatform(e.target.value);
            }
          }}
        >
          <option>All</option>
          {platformList.map((game, i) => (
            <option key={i}>{game}</option>
          ))}
        </select>
      </div>
      <div className="games">
        {games.map((game) => (
          <div className="game" key={game.id}>
            {game.cover ? (
              <img src={game.cover} alt="" />
            ) : (
              <div className="no-cover">NO COVER ART</div>
            )}
            <h2>{game.title}</h2>
            {game.platform.includes("PS") ? (
              <i className="fa-brands fa-playstation"></i>
            ) : game.platform === "PC" ? (
              <i className="fa-brands fa-steam"></i>
            ) : game.platform.includes("XBOX") ? (
              <i className="fa-brands fa-xbox"></i>
            ) : (
              <div>
                <i className="fa-solid fa-gamepad"></i>
                &nbsp; {game.platform}
              </div>
            )}
            <p>{game.desc}</p>
            <span>${game.price}</span>
            <div className="buttons">
              <button className="delete" onClick={() => handleDelete(game.id)}>
                Delete
              </button>
              <button>
                <a
                  href={convertGameStopSearchQuerry(game.title)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
