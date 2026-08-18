
const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

let user = []

//Create
app.post('/create', (req, res) => {
    let body = req.body
    user.push(body)
    res.send("User Saved Successfully!")
})

//Read
app.get('/', (req, res) => {
    res.send(user)
})

//Update
app.put('/update/:id', (req, res) => {
    let {id} = req.params;
    let {name} = req.body;

    let updatedUser = user.map((u) => u.id === id ? {...u, name} : u);
    user = updatedUser;
    res.send(user)
})

//Delete
app.delete('/delete/:id', (req, res) => {
    let {id} = req.params;
 

    let userData = user.filter((u) => u.id !== id);
    user = userData;
    res.send(user);
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})