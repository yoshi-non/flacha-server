const express = require("express")
const app = express()

const https = require("https")
const server = https.createServer(app)

const { Server } = require("socket.io");

const CLIENT = process.env.CLIENT_URL
const io = new Server(server, {
    cors: {
        origin: [CLIENT, "http://localhost:3000"],
        credentials: true,
    },
});


//test
app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

//クライアントと通信
io.on("connection", (socket) => {
    console.log("a user connected");

    //クライアントから受信
    socket.on("send_message", (data) => {
        console.log(data);
        //クライアントへ返信
        io.emit("received_message", data);
    });
});

// const port = process.env.PORT || 5000
// server.listen(port, () => console.log(`server is running on ${PORT}`));