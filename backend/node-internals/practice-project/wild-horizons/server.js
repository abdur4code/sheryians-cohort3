import http from "node:http"
const port = 8000;
const server = http.createServer((req, res) => {
    res.end("I am running!");
})

server.listen(port, () => console.log(`Server is running on Port: ${port}`))
