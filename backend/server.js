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
                const shortPass = userExistsRes.rows[0].password.slice(0,10);
                const zipcode = userExistsRes.rows[0].zipcode;
                
                res.json({"status":"success", "screenname":screenname, "zipcode":zipcode, "username":username, "password":shortPass});
            } else {
                res.json({"status":"incorrect password"});
            }
        } catch {
            res.json({"status":"bcrypt error"});
        }
    }
});

// search request
app.get('/search', async (req,res) => {
    const search = req.query.s;
    const zipcode = req.query.z;
    
    // WITHOUT ZIPCODE
    if (zipcode == 0) {
        try {
            // search all movies
            if(search == "movies") {
                const moviesReq = "SELECT * FROM movies ORDER BY name ASC";
                const moviesRes = await pool.query(moviesReq);
                const moviesFormatted = moviesRes.rows.map(function(movie) {
                    return {
                        name: movie.name,
                        theater: movie.theater,
                        address: movie.address,
                        city: movie.city,
                        zip: movie.zip
                    }
                });
                res.json({"status":"movies", "movies": moviesFormatted});
            } else {
                const moviesReq = "SELECT * FROM movies WHERE name LIKE $1 ORDER BY name ASC";
                const moviesRes = await pool.query(moviesReq, ["%" + search + "%"]);

                // check for matching movie names
                if (moviesRes.rowCount != 0) {
                    const moviesFormatted = moviesRes.rows.map(function(movie) {
                        return {
                            name: movie.name,
                            theater: movie.theater,
                            address: movie.address,
                            city: movie.city,
                            zip: movie.zip
                        }
                    });
                    res.json({"status":"movies", "movies": moviesFormatted});
                } else {
                    // search for matching restaurant names
                    const restaReq = "SELECT restaurants.name AS name, types.name AS type, restaurants.address AS address, restaurants.zip AS zip,restaurants.city AS city from restaurants inner join restauranttypes ON restaurants.restaurant_id = restauranttypes.restaurant_id inner join types on types.type_id = restauranttypes.type_id where restaurants.name LIKE $1 ORDER BY name ASC";
                    const restaRes = await pool.query(restaReq, ["%" + search + "%"]);

                    if (restaRes.rowCount != 0) {
                        const restaFormatted = restaRes.rows.map(function(restaurants) {
                            return {
                                name: restaurants.name,
                                type: restaurants.type,
                                address: restaurants.address,
                                city: restaurants.city,
                                zip: restaurants.zip
                            }
                        });
                        res.json({"status":"restaurants", "restaurants": restaFormatted});
                    } else {
                        // search for matching restaurant types
                        const restaReq = "SELECT restaurants.name AS name, types.name AS type, restaurants.address AS address, restaurants.zip AS zip,restaurants.city AS city from restaurants inner join restauranttypes ON restaurants.restaurant_id = restauranttypes.restaurant_id inner join types on types.type_id = restauranttypes.type_id where types.name LIKE $1 ORDER BY name ASC";
                        const restaRes = await pool.query(restaReq, ["%" + search + "%"]);
                        
                        if (restaRes.rowCount != 0) {
                            const restaFormatted = restaRes.rows.map(function(restaurants) {
                                return {
                                    name: restaurants.name,
                                    type: restaurants.type,
                                    address: restaurants.address,
                                    city: restaurants.city,
                                    zip: restaurants.zip
                                }
                            });
                            res.json({"status":"restaurants", "restaurants": restaFormatted});
                        } else {
                            res.json({"status":"error"});
                        }
                    } // end of restaurant types
                } // end of matching movie names
            } // end of return 'all movies'
        } catch {
            res.json({"status":"error"});
        }
    // WITH ZIPCODE
    } else {
        try {
            // search all movies
            if(search == "movies") {
                const moviesReq = "SELECT * FROM movies where zip = $1 ORDER BY name ASC";
                const moviesRes = await pool.query(moviesReq,[zipcode]);
                const moviesFormatted = moviesRes.rows.map(function(movie) {
                    return {
                        name: movie.name,
                        theater: movie.theater,
                        address: movie.address,
                        city: movie.city,
                        zip: movie.zip
                    }
                });
                res.json({"status":"movies", "movies": moviesFormatted});
            } else {
                const moviesReq = "SELECT * FROM movies WHERE name LIKE $1 AND zip = $2 ORDER BY name ASC";
                const moviesRes = await pool.query(moviesReq, ["%" + search + "%", zipcode]);

                // check for matching movie names
                if (moviesRes.rowCount != 0) {
                    const moviesFormatted = moviesRes.rows.map(function(movie) {
                        return {
                            name: movie.name,
                            theater: movie.theater,
                            address: movie.address,
                            city: movie.city,
                            zip: movie.zip
                        }
                    });
                    res.json({"status":"movies", "movies": moviesFormatted});
                } else {
                    // search for matching restaurant names
                    const restaReq = "SELECT restaurants.name AS name, types.name AS type, restaurants.address AS address, restaurants.zip AS zip,restaurants.city AS city from restaurants inner join restauranttypes ON restaurants.restaurant_id = restauranttypes.restaurant_id inner join types on types.type_id = restauranttypes.type_id WHERE restaurants.name LIKE $1 AND restaurants.zip = $2 ORDER BY name ASC";
                    const restaRes = await pool.query(restaReq, ["%" + search + "%", zipcode]);

                    if (restaRes.rowCount != 0) {
                        const restaFormatted = restaRes.rows.map(function(restaurants) {
                            return {
                                name: restaurants.name,
                                type: restaurants.type,
                                address: restaurants.address,
                                city: restaurants.city,
                                zip: restaurants.zip
                            }
                        });
                        res.json({"status":"restaurants", "restaurants": restaFormatted});
                    } else {
                        // search for matching restaurant types
                        const restaReq = "SELECT restaurants.name AS name, types.name AS type, restaurants.address AS address, restaurants.zip AS zip,restaurants.city AS city from restaurants inner join restauranttypes ON restaurants.restaurant_id = restauranttypes.restaurant_id inner join types on types.type_id = restauranttypes.type_id WHERE types.name LIKE $1 AND restaurants.zip = $2 ORDER BY name ASC";
                        const restaRes = await pool.query(restaReq, ["%" + search + "%", zipcode]);
                        
                        if (restaRes.rowCount != 0) {
                            const restaFormatted = restaRes.rows.map(function(restaurants) {
                                return {
                                    name: restaurants.name,
                                    type: restaurants.type,
                                    address: restaurants.address,
                                    city: restaurants.city,
                                    zip: restaurants.zip
                                }
                            });
                            res.json({"status":"restaurants", "restaurants": restaFormatted});
                        } else {
                            res.json({"status":"error"});
                        }
                    } // end of restaurant types
                } // end of matching movie names
            } // end of return 'all movies'
        } catch {
            res.json({"status":"error"});
        }
    } // end of zipcode
});

// start app
app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${ app.get("port") }`);
});