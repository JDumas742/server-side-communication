const express = require("express");
const Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`listening at ${port}`)
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

const database = new Datastore('database.db');
database.loadDatabase();
const users = new Datastore('usernames.db');
users.loadDatabase();
//database.insert({ name: 'Jacob', status: 'active'});
//database.insert({ name: 'Patrick', status: 'pending'});

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post("/api", (request, response) => {
    console.log("Request received.");
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

app.get('/api2', (request, response) => {
    users.find({}, (err, userdata) => {
        if (err) {
            response.end();
            return;
        }
        response.json(userdata);
    });
});

app.post("/api2", (request, response) => {
    console.log("Request received.");
    const userdata = request.body;
    const timestamp = Date.now();
    userdata.timestamp = timestamp;
    users.insert(userdata);
    response.json(userdata);
});