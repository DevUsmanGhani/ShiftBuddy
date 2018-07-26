var express = require('express');
var app = express();

app.get('/', (req,res) => {
    res.send("ShiftBuddy")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log("Now listening on port: " + PORT);
})