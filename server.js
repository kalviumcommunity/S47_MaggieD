const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("DARSHANNNNNN")
})

app.listen(3000)