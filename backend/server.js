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

// register request
app.post('/register', async (req, res) => {
    const userExistsReq = "SELECT * from users WHERE username = $1";
    const userExistsRes = await pool.query(userExistsReq, [req.body.username]);

    // user already exists
    if (userExistsRes.rowCount > 0) {
        res.json({"status": "username taken"});
    } else {
        try {
            // create hashed passwords
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            // VALUES ('username', 'screenname', 'password', 'zipcode');
            const registerTemplate = "INSERT INTO users (username, screenname, password, zipcode)  VALUES ($1, $2, $3, $4)";

            try {
                const registerRes = await pool.query(registerTemplate, [req.body.username, req.body.screenname, hashedPassword, req.body.zipcode]);
                res.json({"status": "success"});
            } catch {
                res.json({"status":"error registering user"});
            }
        } catch {
            res.json({"status":"error salting password"});
        }
    }
});

// login request
app.post('/login', async (req, res) => {
    const userExistsReq = "SELECT * from users WHERE username = $1";
    const userExistsRes = await pool.query(userExistsReq, [req.body.username]);

    if (userExistsRes.rowCount == 0) {
        res.json({"status":"username not found"});
    } else {
        try {
            if(await bcrypt.compare(req.body.password, userExistsRes.rows[0].password)) {
                const username = userExistsRes.rows[0].username;
                const screenname = userExistsRes.rows[0].screenname;
                const password = userExistsRes.rows[0].password;
                const zipcode = userExistsRes.rows[0].zipcode;

                res.json({"status":"success", "screenname":screenname, "zipcode":zipcode});
            } else {
                res.json({"status":"incorrect password"});
            }
        } catch {
            res.json({"status":"bcrypt error"});
        }
    }
});

// start app
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${ app.get("port") }`);
});