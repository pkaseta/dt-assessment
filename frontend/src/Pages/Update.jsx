// import axios from 'axios';
// import React, { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { platformList } from "../MockData/PlatformList";

// const Update = () => {
//     const [game, setGame] = useState({
//         title: "",
//         desc: "",
//         platform: "",
//         price: null,
//         cover: "",
//     })

// const backendURL = "http://localhost:8800/games" 
// const navigate = useNavigate()
// // const location = useLocation()

// const gameId = window.location.href.split('/')[2]

// const handleChange= (e)=>{
//     setGame(prev=> ({...prev, [e.target.name]: e.target.value}));

// }
// const handleClick = async (e)=> {
//     e.preventDefault()
//     try {
//         await axios.put(`${backendURL}/${gameId}`, game)
//         navigate("/")
//     } catch (error) {
//         console.log(error)
//     }
// }

// // console.log(game);
//   return (
//     <div className='form'>
//         <h1>Update game</h1>
//         <input type="text" placeholder="title" onChange={handleChange} name="title" />
//         <input type="text" placeholder="description" onChange={handleChange} name="desc" />
//         {/* Convert to dropdown */}
//         {/* <input type="text" placeholder="platform" onChange={handleChange} name="platform" />
//          {/* Convert to dropdown */}
//       <select id="platform-list" onChange={handleChange} name="platform">
//         {platformList.map((platform, i) => (
//           <option key={i}>{platform}</option>
//         ))}
//       </select>
//         <input type="number" placeholder="price" onChange={handleChange} name="price" />
//         <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
//         <button onClick={handleClick}>Update</button>
//     </div>
//   )
// }

// export default Update