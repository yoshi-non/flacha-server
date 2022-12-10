const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io");

const CLIENT = process.env.CLIENT_URL
const io = new Server(server, {
    cors: {
        origin: [CLIENT, "http://localhost:3000"],
        credentials: true,
    },
});

const port = 10000;

// //test
// app.get("/", (req, res) => {
//     res.send("<h1>Hello world</h1>");
// });

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

server.listen(port, () => console.log(`server is running on ${port}`));