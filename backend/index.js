import express from 'express';
import mysql from "mysql2";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors())

//Setup MYSQL connection to database with environment variables
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.use(express.json());

//Backend get request
app.get("/", (req, res) => {
    res.json("Hello this is the backend")
});

//Get request for database of games
app.get("/games", (req, res)=> {
    const q = "SELECT * FROM games"
    db.query(q, (err,data)=>{
        if(err) return res.json(err);

        return res.json(data);
    })
});

//Get request to filter games by platform
app.get("/games/:platform", (req, res)=> {
    const gamePlatform = req.params.platform;
    const q = "SELECT * FROM games WHERE platform = ?"
    db.query(q, [gamePlatform], (err,data)=>{
        if(err) return res.json(err);

        return res.json(data);
    })
});

//Post request to add games to the database
app.post("/games", (req,res)=>{
    const q = "INSERT INTO games (`title`,`desc`,`platform`,`price`,`cover`) VALUES(?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.platform,
        req.body.price,
        req.body.cover
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);

        return res.json("Game has been added successfully!");
    })
});

//Delete request to remove a game
app.delete("/games/:id", (req,res)=>{
    const gameId = req.params.id;
    const q = "DELETE FROM games WHERE id = ?"

    db.query(q, [gameId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Game has been deleted successfully");
    })
})

//update request to edit a game
app.put("/games/:id", (req,res)=>{
    const gameId = req.params.id;
    const q = "UPDATE games SET `title` = ?,`desc` = ?,`platform` = ?,`price` = ?,`cover` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.platform,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values,gameId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Game has been updated successfully");
    })
})

//Port
app.listen(8800, ()=> {
    console.log("Connected to backend!")
});