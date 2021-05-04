const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 3002;
const frontUrl = "http://localhost:3000";
const Message = require("./models/message.js");

mongoose.Promise = global.Promise;

dotenv.config({path: './.env'});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/', require('./routes/login'));
app.use('/search', require('./routes/search'));

//mongodb
mongoose.connect('mongodb://localhost:27017/ssc', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected successful'))
.catch((err) => console.error(err));
mongoose.set('useCreateIndex', true);

app.use(cors());

async function main() {
    const server = app.listen(5555, () => console.log(`Server running on port 5555.`));

    const socket = require("socket.io")(server);
    socket.on("connection", async (client) => {
    	console.log("client connected...");
		

    	client.on("message", async (msg) => {
    		let message = await Message.Schema.statics.create({content: msg.value, oid: msg.oid, midx: msg.midx});
			console.log(msg.oid);
    		socket.emit("message", message);
    	});

		client.on("latest", async (data) => {
			let latest = await Message.Schema.statics.latest({oid: data.oid, midx: data.midx});
    		client.emit("latest", latest);
		})
    });
}


main();

app.listen(port, ()=>console.log(`Listening on port ${port}`));