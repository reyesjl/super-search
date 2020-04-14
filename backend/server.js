const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

// app bootstrap
const cors = require("cors");
const app = express();
app.set("port", 8080);

// middleware
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup connection
var Pool = require("pg").Pool;
var config = {
    host: "localhost",
    user: "postgres",
    password: "zAdRUnapr8",
    database: "supersearch"
};
var pool = new Pool(config);

// register new user
app.post('/register', async (req, res) => {
    const userExistsReq = "SELECT * from users WHERE username = $1";
    const userExistsRes = await pool.query(userExistsReq, [req.body.username]);

    // user already exists
    if (userExistsRes.rowCount > 0) {
        res.json({"status": "username already exists."});
    } else {
        try {
            // create hashed passwords
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            // VALUES ('username', 'screenname', 'password', 'zipcode');
            const registerTemplate = "INSERT INTO users (username, screenname, password, zipcode)  VALUES ($1, $2, $3, $4)";

            try {
                const registerRes = await pool.query(registerTemplate, [req.body.username, req.body.screenname, hashedPassword, req.body.zipcode]);
                res.json({"status": "new user created."});
            } catch {
                res.json({"status":"error registering user to database."});
            }
        } catch {
            res.json({"status":"error salting password"});
        }
    }
});

// login
app.post('/login', async (req, res) => {
    const userExistsReq = "SELECT * from users WHERE username = $1";
    const userExistsRes = await pool.query(userExistsReq, [req.body.username]);

    if (userExistsRes.rowCount == 0) {
        res.json({"status":"user not found. could not login."});
    } else {
        try {
            if(await bcrypt.compare(req.body.password, userExistsRes.rows[0].password)) {
                res.json("login successful!");
                console.log(userExistsRes.rows[0].username);
                console.log(userExistsRes.rows[0].screenname);
                console.log(userExistsRes.rows[0].password);
                console.log(userExistsRes.rows[0].zipcode);
            } else {
                res.json("incorrect password!");
            }
        } catch {
            res.json({"status":"password matching error"});
        }
    }
});

// start app
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${ app.get("port") }`);
});