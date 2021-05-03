const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./routes/mdb.js");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port1 = 3002;
const port = 8463;
const dbUrl = "mongodb://localhost:27017/ssc";
const frontUrl = "http://localhost:3000";
const Message = require("./models/message.js");

async function main() {
    try {
        await db.connect(dbUrl);
    } catch (except) {
        console.log("Error during connection to the database:");
        console.error(except);
        process.exit(1);
    }

    app.use(cors({
	    origin: frontUrl,
	    optionsSuccessStatus: 200,
	    credentials: true,
	}));
    const server = app.listen(port, () => console.log(`Server running on port 8463.`));

    const socket = require("socket.io")(server);
    socket.on("connection", async (client) => {
    	console.log("client connected...");

    	client.on("message", async (msg) => {
    		let message = await Message.Schema.statics.create(msg);
    		socket.emit("message", message);
    	});

    	let latest = await Message.Schema.statics.latest(10);
    	client.emit("latest", latest);
    });
}

// mongoose.Promise = global.Promise;

dotenv.config({path: './.env'});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/', require('./routes/login'));
app.use('/search', require('./routes/search'));

// //mongodb
// mongoose.connect('mongodb://localhost:27017/ssc', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('connected successful'))
// .catch((err) => console.error(err));
// mongoose.set('useCreateIndex', true);

main();



app.listen(port1, ()=>console.log(`Listening on port ${port1}`));