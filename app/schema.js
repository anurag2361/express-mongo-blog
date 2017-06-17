
/*In MongoDB, the following MySQL terms has foll meanings
Table-->Collection
Row---->Document
Column->Field
Joins-->Linking

Here we first have to define a model which represents documents.
Documents are nothing but instances of models. CRUD operations like
Creation, Read,Updation, Deletion are handled by model.
mongoose schema defines attributes of documents

   
*/

var mongoose=require('mongoose');
var bluebird=require('bluebird');
//connectiong to mongodb
mongoose.connect('mongodb://localhost/mApp');//mApp is the database

//opening a connection
var db=mongoose.connection;
db.once('open',function(){
	console.log('connected to database');
});
db.on('error',console.error.bind(console,'connection error'));

//initialising a schema
var Schema=mongoose.Schema;

mongoose.Promise=require('bluebird');//used as mpromise was showing deprecated on console.


//creating a schema
var userSchema=new Schema({
	name:String,
	username:{type:String, required:true, unique:true},
	password:{type:String, Required:true},
	admin:Boolean,
	location:String,
	createdAt:Date,
});

//creating a model that uses this schema
var User=mongoose.model('User', userSchema);

//now we export this model
module.exports=User;