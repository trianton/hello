var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var dbConfig=require("./config/database");
var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
 
require("./routes/book")(app);
mongoose.connect(dbConfig.url);

 
app.listen(8181);
console.log("listen on port 8181");