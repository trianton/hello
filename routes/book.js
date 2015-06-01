var Book=require("../models/book").Book;

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    router.use(bodyParser.urlencoded({ extended: true }))
    
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

 
module.exports=function(app){
 
    app.get("/book", function(req, res){
 
        Book.find({}, function(err, books){
            if(err)
                return res.send(err);
 
            res.json(books);
        });
 
    });
 
    app.get("/book/:id", function (req, res) {
 
        Book.find({"_id":req.params.id}, function(err, book){
            if(err)
                return res.send(err);
 
            res.json(book);
        })
 
    });
    app.post("/book", function(req, res){
     
      var book=new Book();
      book.title=req.body.title;
      book.author=req.body.author;
      book.page=req.body.page;
     
      console.log(req.body.title+req+book.title);
     
      book.save(function(err, book){
     
        if(err)
          return res.send(err);
     
        res.json({"status":"OK", data :book});
     
      });
     
    });
     
    app.put("/book/:id", function(req, res){
     
      Book.findById(req.params.id, function(err, book){
        if(err)
          return res.send(err);
     
        book.title=req.body.title;
        book.author=req.body.author;
        book.page=req.body.page;
     
        book.save(function(err, book){
     
          if(err)
            return res.send(err);
     
          res.json({"status":"OK", data :book});
     
        });
      });
     
    });
     
    app.delete("/book/:id",function(req, res){
     
      Book.findById(req.params.id, function(err, book){
        if(err)
          return res.send(err);
     
        book.remove(function(err){
          if(err)
            return res.send(err);
     
          res.json({"status" : "OK"});
        });
     
      });
     
    });


 
}