var express=require('express');
var app=express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//Invoking user
var User=require('./schema.js');

//Creating a default post object by giving values to all properties
var User1=new User({
	name:'Anurag',
	username:'Anurag1',
	password:'abc',
	admin:false,
	location:'Lucknow',
	createdAt:'Jun 11 2017'
});//Remember to provide all records,otherwise document wont be saved.

//CRUD start. Creating a user document

User1.save(function(err,employ,num){
	if(err){
		console.log('error occured');
	}
	console.log('saved '+num+' record');
	console.log('Details '+employ);
});


/*To retrieve documents from dtavabse,you can retieve all at
once, or one at a time by find(), findById(), findOne()*/

app.get('/', function(req,res){

	res.send("<h1>This is a blog app</h1>");
});

//To retrieve all documents
app.get('/blogs', function(req,res){

	User.find({},function(err,data){
		if(err){
			console.log('error occured while retrieving all docs');
		}
		res.send(data);
	});
});

 //To find one doc by username
 app.get('/blogs/:username', function(req,res){

 	User.findOne({'username':req.params.username},function(err,data){
 		if(err){
 			console.log('error in finding one document');
 		}
 		res.send(data);
 	});
 });


  // //To find by id
  // app.get('/blogs/:id',function(req,res){

  // 	User.findOne({'_id':req.params.id}, function(err,data){
  // 		if(err){
  // 			console.log('Error in finding doc by id');
 	// 	}
  // 		res.send(data);
  // 	});
  // });

 //Create
 app.post('/blog/create', function(req,res){

 	var newPost=new User({
 		name:    req.body.name,
 		username:req.body.username,
 		password:req.body.password,
 		admin:req.body.admin,
 		location:req.body.location,

 	});

 	var today=Date.now();
 	newPost.createdAt=today;

 	newPost.save(function(error){
 		if(error){
 			console.log(error);
 			res.send(error);
 		}
 		res.send(newPost);
 	});
 });

 //Updating
 User.update({location:'Lucknow'},{location:'Indira Nagar'},function(err){
 	if(err){
 		console.log('error in updating');
 	}
 	console.log('updated');
 });

  //update one document
  app.put('/blogs/:username/edit', function(req,res){

    var update=req.body;
  	User.findOneAndUpdate({'username':req.params.username},update,function(err,data){
  		if(err){
  			console.log('error in finding and updating');
  		}
  		res.send('updated '+data);
  	});
  });

  //Delete a user document
  app.post('/blogs/:username/delete', function(req,res){

  	User.remove({'username':req.params.username},function(err){
  		if(err){
  			console.log('error occured');
  		}
  		res.send('removed');
  	});
  });

  //404
  app.use(function(req, res) {
  	res.status('404').send("404: Page not Found");
  	console.log("404");
  });


  app.listen(3000, function () {
  	console.log('Example app listening on port 3000!');
  });