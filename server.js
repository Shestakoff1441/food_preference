let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
 
let app = express();
let jsonParser = bodyParser.json();
 
app.use(express.static(__dirname + "/public"));

app.get("/api/users", function(req, res){
      
    let content = fs.readFileSync("public/users.json", "utf8");
    let users = JSON.parse(content);
    res.send(users);
});
app.get("/api/parameters", function(req, res){
      
    let content = fs.readFileSync("public/parameters.json", "utf8");
    let parameters = JSON.parse(content);
    res.send(parameters);
});



app.post("/api/usersOuter", jsonParser, function (req, res) {     
    if(!req.body) return res.sendStatus(400);
     
    let foodPos = req.body.foodPos;
    let favorKitch = req.body.favorKitch;
    let firstEatTime = req.body.firstEatTime;
    let dish = req.body.dish;
    let userName = req.body.userName;
    let userLastName = req.body.userLastName;
    let userPos = req.body.userPos;

	let user = []; 
    let dataAboutUser = {
    	userName 		:userName,
    	userLastName 	:userLastName,
    	userPos 		:userPos,
    	foodPosition	:foodPos,
    	favoriteKitchen :favorKitch,
    	firstEatingTime :firstEatTime,
    	favoriteDish	:dish


    }

    dataAboutUser = JSON.stringify(dataAboutUser);
    user.push(dataAboutUser)
    fs.appendFileSync("public/dataAboutUsers.json", user);
    res.send(dataAboutUser);
});
app.listen(3000);