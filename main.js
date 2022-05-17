const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.l8gir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.set('view-engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})
app.get('/login', (req, res) => {
	res.render('login.ejs')
})

app.post('/login', async (req, res) => {
	console.log("Login Main:",req.body);

	var userlogin = await User.login(req.body.username, req.body.password);
	console.log('Login Main Return:',userlogin)
	if (userlogin==true){
		//if (userlogin="Login Successfully"){
		//res.sendStatus(200);
		res.status(200).send("Login Successfully");
		//res.send("Login Successfully");
		
	}
	else{
		res.status(403).send("Invalid Username or Password");
	}

	// if (userlogin==false){
	// 	//if (userlogin="Login Succesfully"){
	// 		res.sendStatus(401);
		
	// }
	// else{
	// 	res.sendStatus(200).send(userlogin)
	// 	//return res.body=userlogin
		
	// }
	// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })
})
app.get('/register', (req, res) => {
	res.render('register.ejs')
})

app.post('/register', async (req, res) => {
	console.log('Register Main:',req.body);
	var userregister = await User.register(req.body.username, req.body.password,req.body.phone);
	console.log("Register Main Return",userregister)
	 if (userregister==true){
		//if (userregister="Customer Registered"){
		res.status(200).send("Customer Registered");
		
		//res.getMaxListeners("Customer ID:",res.body.username)
	}
	else{
		res.status(403).send("Customer ID is not available for registration")
	}

	console.log(userregister)
	


	// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
