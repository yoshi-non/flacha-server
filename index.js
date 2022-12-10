const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)

const PORT = 5000

server.listen(PORT, () => console.log(`server is running on ${PORT}`))