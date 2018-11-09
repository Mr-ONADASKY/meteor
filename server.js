const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const csv = require("csvtojson");
var jsondata = undefined;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

let init =()=>{
    csv()
        .fromFile("./data/meteors.csv")
        .then((parsed) => {
            jsondata = parsed;
            
            app.listen(port, () => console.log(`Meteorite app listening on port ${port}!`));
        }, (error)=>{
            console.log(error);
        })
};

init();