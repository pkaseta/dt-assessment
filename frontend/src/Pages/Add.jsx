import axios from "axios";
import React, { useState } from "react";
import { platformList } from "../MockData/PlatformList";

import "../sass/Add.scss";

const Add = () => {
  const [game, setGame] = useState({
    title: "",
    desc: "",
    platform: "",
    price: null,
    cover: "",
  });

  const backendURL = "http://localhost:8800/games";

  const handleChange = (e) => {
    setGame((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendURL, game);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Add new game</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="desc"
      />
      {/* Convert to dropdown */}
      <select id="platform-list" onChange={handleChange} name="platform">
        {platformList.map((platform, i) => (
          <option key={i}>{platform}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button onClick={handleClick}>Add game</button>
    </div>
  );
};

export default Add;
