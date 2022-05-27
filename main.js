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
//express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Testing Tools:Swagger
const swaggerUi=require('swagger-ui-express');
const swaggerJsdoc=require('swagger-jsdoc');
const options={
	definition:{
		openapi:'3.0.0',
		info:{
			title:'Cinema_Assignment',
			version:'1.0.0'
		}
},
	apis:['./main.js'],//
};
const swaggerSpec=swaggerJsdoc(options);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

//Customer login
/**
 * @swagger
 * /login/{username}/{password}:
 *   post:
 *     description: Login
 *     parameters:
 *       - in: path
 *         name: username
 *         schema: 
 *           type: string
 *         required: true
 *         description: Customer ID
 *       - in: path
 *         name: password
 *         schema: 
 *           type: string
 *         required: true
 *         description: Password     
 *     responses:
 *       200:
 *         description: Logined
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Customer'
 *       403:
 *         description: Invalid Username or Password
 */

//Post 
/**
 * @swagger
 * /register:
 *   post:
 *     description: Create User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               phone: 
 *                 type: string
 *               ic: 
 *                 type: string
 *               mys_status: 
 *                 type: string
 *               email: 
 *                 type: string
 *               member: 
 *                 type: string 
 *     responses:
 *       200:
 *         description: Customer Registered
 *       400:
 *         description: City already exist
 */

//Scehmas
/**
 * @swagger
 * components: 
 *   schemas: 
 *     Customer:
 *       type: object
 *       properties:
 *         ID:
 *           type: string
 *         Phone: 
 *            type: string
 *         IC: 
 *           type: string
 *         MyS_status: 
 *           type: string
 *         Email: 
 *           type: string
 *         Member: 
 *           type: string
 */
///////////////////////////////
 app.post('/login/:username/:password', async (req, res) => {
	console.log("Login Main:",req.params);
	//username, password, phone,ic,mys_status,email,member
	let userlogin = await User.login(req.params.username, req.params.password);
	console.log('Login Main Return:',userlogin)
	if (userlogin!=false){
		res.status(200).json({
			ID:userlogin.cust_id,
			Phone:userlogin.cust_phone,
			IC:userlogin.cust_ic,
			MyS_status:userlogin.cust_mysstatus,
			Email:userlogin.cust_email,
			Member: userlogin.cust_member
		})
	}
	else{
		res.status(403).send("Invalid Username or Password");
	}
})

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})


app.post('/login', async (req, res) => {
	console.log("Login Main:",req.body);
	//username, password, phone,ic,mys_status,email,member
	let userlogin = await User.login(req.body.username, req.body.password);
	console.log('Login Main Return:',userlogin)
	if (userlogin!=false){
		res.status(200).json({
			ID:userlogin.cust_id,
			Phone:userlogin.cust_phone,
			IC:userlogin.cust_ic,
			MyS_status:userlogin.cust_mysstatus,
			Email:userlogin.cust_email,
			Member: userlogin.cust_member
		})
	}
	else{
		res.status(403).send("Invalid Username or Password");
	}
})


app.post('/register', async (req, res) => {
	console.log('Register Main:',req.body);
	var userregister = await User.register(req.body.username, 
		req.body.password, req.body.phone, req.body.ic, req.body.mys_status, req.body.email, req.body.member);
	console.log("Register Main Return",userregister)
	 if (userregister==true){
		res.status(200).send("Customer Registered");
	}
	else{
		res.status(403).send("Customer ID is not available for registration")
	}
	console.log(userregister)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
