const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Staff = require("./Staff");
const Movie = require("./Movie");

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
	Staff.injectDB(client);
	Movie.injectDB(client);
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
	apis:['./main.js'],
};
const swaggerSpec=swaggerJsdoc(options);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
/////////////////////////////////////////////////////////////////////////
//Customer Swagger

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

//Register
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
 *               name:
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
 *       403:
 *         description: Customer Already Exist
 */


//Customer Update Phone
/**
 * @swagger
 * /phone/{username}/{phone}:
 *   patch:
 *     security:
 *       - bearerAuth: [] 
 *     description: Update Phone Number (Customer Token)
 *     parameters:
 *       - in: path
 *         name: username
 *         schema: 
 *           type: string
 *         required: true
 *         description: Customer ID
 *       - in: path
 *         name: phone
 *         schema: 
 *           type: string
 *         required: true
 *         description: Phone     
 *     responses:
 *       200:
 *         description: Update Phone Successfully
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Customer'
 *       403:
 *         description: Update Phone Failed
 *       401:
 *         description: Access token is missing or invalid
 */

///////////////////////////////////////////////////////////////////////////
//staff

//staff login
/**
 * @swagger
 * /stafflogin/{username}/{password}:
 *   get:
 *     description: Staff Login
 *     parameters:
 *       - in: path
 *         name: username
 *         schema: 
 *           type: string
 *         required: true
 *         description: Staff ID
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
 *               $ref: '#/components/schemas/Staff'
 *       403:
 *         description: Invalid Username or Password
 */


//Add staff
/**
 * @swagger
 * /addstaffs:
 *   post:
 *     security:
 *       - bearerAuth: []   
 *     description: Add staff (Manager Token)
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
 *               name:
 *                 type: string
 *               phone: 
 *                 type: string
 *               email: 
 *                 type: string
 *               role: 
 *                 type: string
 *     responses:
 *       200:
 *         description: New Staff Added
 *       403:
 *         description: Staff Already Exist
 *       401:
 *         description: Access token is missing or invalid
 */

//Staff Update Phone Customer
/**
 * @swagger
 * /staffupdatecustphone/{username}/{phone}:
 *   patch:
 *     security:
 *       - bearerAuth: []   
 *     description: Update Phone Number of Customer (Staff + Manager Token)
 *     parameters:
 *       - in: path
 *         name: username
 *         schema: 
 *           type: string
 *         required: true
 *         description: Customer ID
 *       - in: path
 *         name: phone
 *         schema: 
 *           type: string
 *         required: true
 *         description: Phone Number     
 *     responses:
 *       200:
 *         description: Update Phone Successfully
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Customer'
 *       403:
 *         description: Update Phone Failed
 *       401:
 *         description: Access token is missing or invalid
 */


//Staff Update Membership Customer
/**
 * @swagger
 * /staffupdatecustmember/{username}/{member}:
 *   patch:
 *     security:
 *       - bearerAuth: []     
 *     description: Update Membership of Customer (Staff + Manager Token)
 *     parameters:
 *       - in: path
 *         name: username
 *         schema: 
 *           type: string
 *         required: true
 *         description: Customer ID
 *       - in: path
 *         name: member
 *         schema: 
 *           type: string
 *         required: true
 *         description: Membership    
 *     responses:
 *       200:
 *         description: Update Member Successfully
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Customer'
 *       403:
 *         description: Update Member Failed
 *       401:
 *         description: Access token is missing or invalid
 */

//Delete staff
/**
 * @swagger
 * /deletestaff/{staff_id}/{password}/{deletestaff_id}:
 *   delete:
 *     security:
 *       - bearerAuth: []   
 *     description: Delete Staff (Manager Token)
 *     parameters:
 *       - in: path
 *         name: staff_id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Manager ID
 *       - in: path
 *         name: password
 *         schema: 
 *           type: string
 *         required: true
 *         description: password   
 *       - in: path
 *         name: deletestaff_id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Staff ID you want to delete  
 *     responses:
 *       200:
 *         description: Staff Deleted
 *       403:
 *         description: Staff Doesn't Exist
 *       401:
 *         description: Access token is missing or invalid
 */

//////////////////////////////////////
//Movie
//Create Movie 
/**
 * @swagger
 * /createmovies:
 *   post:
 *     security:
 *       - bearerAuth: []   
 *     description: Create Movie (Staff + Manager Token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               MovieID:
 *                 type: string
 *               moviename:
 *                 type: string
 *               mduration:
 *                 type: string
 *               mdimension: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie Created
 *       403:
 *         description: Movie already existed
 *       401:
 *         description: Access token is missing or invalid
 */

//Check Movie
/**
 * @swagger
 * /readmovie/{movieID}:
 *   get:
 *     security:
 *       - bearerAuth: []   
 *     description: Check Movie Information (Staff + Manager Token)
 *     parameters:
 *       - in: path
 *         name: movieID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Movie ID  
 *     responses:
 *       200:
 *         description: Movie Information
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Movie'
 *       403:
 *         description: Movie Doesn't exist
 */


//Update Movie Info
/**
 * @swagger
 *  /updatemovie/{MovieID}/{moviename}/{mduration}/{mdimension}:
 *   patch:
 *     security:
 *       - bearerAuth: []     
 *     description: Update Membership of Customer (Staff + Manager Token)
 *     parameters:
 *       - in: path
 *         name: MovieID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Movie ID
 *       - in: path
 *         name: moviename
 *         schema: 
 *           type: string
 *         required: true
 *         description: Movie Name   
 *       - in: path
 *         name: mduration
 *         schema: 
 *           type: string
 *         required: true
 *         description: Duration   
 *       - in: path
 *         name: mdimension
 *         schema: 
 *           type: string
 *         required: true
 *         description: Dimension   
 *     responses:
 *       200:
 *         description: Update Movie Successfully
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Movie'
 *       403:
 *         description: Update Movie Info Failed
 *       401:
 *         description: Access token is missing or invalid
 */

/////////////////////////////////////////////////
//Hall
//Create Showtimes
/**
 * @swagger
 * /createshowtimes:
 *   post:
 *     security:
 *       - bearerAuth: []   
 *     description: Create Showtimes (Staff and Manager Token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               showID:
 *                 type: string
 *               hallnum:
 *                 type: string
 *               mdate:
 *                 type: string
 *               mtime: 
 *                 type: string
 *               mvID: 
 *                 type: string
 *               a_seat: 
 *                 type: string
 *               b_seat: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Showtime Created
 *       403:
 *         description: Hall is booked
 *       401:
 *         description: Access token is missing or invalid
 */


//Check Showtimes
/**
 * @swagger
 * /readshowtime/{movieID}:
 *   get:
 *     description: Check Showtimes 
 *     parameters:
 *       - in: path
 *         name: movieID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Movie ID  
 *     responses:
 *       200:
 *         description: Movie Information
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Showtime'
 *       403:
 *         description: No Showtimes for the movie
 */

//Update Showtimes
/**
 * @swagger
 * /updateshowtimes:
 *   patch:
 *     security:
 *       - bearerAuth: []   
 *     description: Update Showtimes (Staff and Manager Token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               hallnum:
 *                 type: string
 *               mdate:
 *                 type: string
 *               mtime: 
 *                 type: string
 *               movieID: 
 *                 type: string
 *               etime: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Showtime Updated
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Showtime'
 *       403:
 *         description: Update ShowTime Failed
 *       401:
 *         description: Access token is missing or invalid
 */

/////////////////////////////////////
//Booking 

//Create Booking by Customer
/**
 * @swagger
 * /bookingcust:
 *   post:
 *     security:
 *       - bearerAuth: []   
 *     description: Create Booking (Customer Token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               custID:
 *                 type: string
 *               showID:
 *                 type: string
 *               mseat: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking Created
 *       403:
 *         description: Booking Failed
 *       401:
 *         description: Access token is missing or invalid
 */


//Create Booking by Staff
/**
 * @swagger
 * /bookingstaff:
 *   post:
 *     security:
 *       - bearerAuth: []   
 *     description: Create Booking (Staff and Manager Token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               staffID:
 *                 type: string
 *               custID:
 *                 type: string
 *               showID:
 *                 type: string
 *               mseat: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking Created
 *       403:
 *         description: Booking Failed
 *       401:
 *         description: Access token is missing or invalid
 */

// Customer Check Booking 
/**
 * @swagger
 * /readbookingcust/{custID}/{showID}:
 *   get:
 *     security:
 *       - bearerAuth: []  
 *     description: Customer Check Booking  (Customer Token)
 *     parameters:
 *       - in: path
 *         name: custID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Customer ID  
 *       - in: path
 *         name: showID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Show ID  
 *     responses:
 *       200:
 *         description: Booking
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 StaffID:
 *                   type: string
 *                 CustID:
 *                   type: string
 *                 Hallnum:
 *                   type: string
 *                 Date: 
 *                   type: string
 *                 Time:
 *                   type: string
 *                 Movie:
 *                   type: string
 *                 Duration:
 *                   type: string
 *                 Dimension: 
 *                   type: string
 *                 SeatNumber: 
 *                   type: string
 *       403:
 *         description: Booking is not found
 */

// Staff Check Booking 
/**
 * @swagger
 * /readbookingstaff/{custID}/{showID}:
 *   get:
 *     security:
 *       - bearerAuth: []  
 *     description: Staff Check Booking  (Staff and Manager Token)
 *     parameters:
 *       - in: path
 *         name: custID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Customer ID  
 *       - in: path
 *         name: showID
 *         schema: 
 *           type: string
 *         required: true
 *         description: Show ID  
 *     responses:
 *       200:
 *         description: Booking
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 StaffID:
 *                   type: string
 *                 CustID:
 *                   type: string
 *                 Hallnum:
 *                   type: string
 *                 Date: 
 *                   type: string
 *                 Time:
 *                   type: string
 *                 Movie:
 *                   type: string
 *                 Duration:
 *                   type: string
 *                 Dimension: 
 *                   type: string
 *                 SeatNumber: 
 *                   type: string
 *       403:
 *         description: Booking is not found
 */


///////////////////////////////////////////
//Scehmas 
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes 
 *   security:
 *     - bearerAuth: []     
 *   schemas:    # Customer Shcema
 *     Customer:
 *       type: object
 *       properties:
 *         Token:
 *           type: string
 *         ID:
 *           type: string
 *         Name:
 *           type: string
 *         Phone: 
 *           type: string
 *         IC: 
 *           type: string
 *         MyS_status: 
 *           type: string
 *         Email: 
 *           type: string
 *         Member: 
 *           type: string
 * 
 *     Staff:    #Staff Schema
 *       type: object
 *       properties:
 *         Token: 
 *           type: string
 *         ID:
 *           type: string
 *         Name:
 *           type: string
 *         Phone: 
 *           type: string
 *         Email: 
 *           type: string
 *         Role: 
 *           type: string
 *     Movie:    #Movie Schema
 *       type: object
 *       properties:
 *         Movie: 
 *           type: string
 *         Duration:
 *           type: string
 *         Dimension:
 *           type: string
 *     Showtime:    #Showtime Schema
 *       type: object
 *       properties:
 *         Hallnum: 
 *           type: string
 *         Date:
 *           type: string
 *         Time:
 *           type: string
 *         Movie: 
 *           type: string
 *         Duration: 
 *           type: string
 *         Dimension: 
 *           type: string
 *         AvailableSeat: 
 *           type: string
 *         BookedSeat: 
 *           type: string
 */
///////////////////////////////






////////////////////////////////////////////////////////
//Customer
 app.post('/login/:username/:password', async (req, res) => { //Cust Login Swagger
	console.log("Login Main:",req.params);
	//username, password, name, phone,ic,mys_status,email,member
	let userlogin = await User.login(req.params.username, req.params.password);
	console.log('Login Main Return:',userlogin)
	if (userlogin!=false){
		res.status(200).json({
			token:generateCustAccessToken({username:userlogin.cust_id,role:'cust'}),
			ID:userlogin.cust_id,
			Name:userlogin.cust_name,
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

app.post('/login', async (req, res) => { // Customer Login
	console.log("Login Main:",req.body);
	//username, password, phone,ic,mys_status,email,member
	let userlogin = await User.login(req.body.username, req.body.password);
	console.log('Login Main Return:',userlogin)
	if (userlogin!=false){
		res.status(200).json({
			ID:userlogin.cust_id,
			Name:userlogin.cust_name,
			Phone:userlogin.cust_phone,
			IC:userlogin.cust_ic,
			MyS_status:userlogin.cust_mysstatus,
			Email:userlogin.cust_email,
			Member: userlogin.cust_member,
			token:generateCustAccessToken({username:userlogin.cust_id,role:'cust'})
		});
	}
	else{
		res.status(403).send("Invalid Username or Password");
	}
})


app.post('/register', async (req, res) => { //Customer Register New User
	console.log('Register Main:',req.body);
	var userregister = await User.register(req.body.username, 
		req.body.password, req.body.name, req.body.phone, 
		req.body.ic, req.body.mys_status, req.body.email, req.body.member);
	console.log("Register Main Return",userregister)
	 if (userregister==true){
		res.status(200).send("Customer Registered");
	}
	else{
		res.status(403).send("Customer ID is not available for registration")
	}
	console.log(userregister)
})


app.patch('/phone', async (req, res) => { //Customer Update Phone (Jest)
	console.log('Update Cust Phone:',req.body);
	var updatephone = await User.updatephone(req.body.username, req.body.phone);
	console.log("Update Cust Phone Return:",updatephone)
	 if (updatephone!=false){
		res.status(200).json({
			ID:updatephone.cust_id,
			Name:updatephone.cust_name,
			Phone:updatephone.cust_phone,
			IC:updatephone.cust_ic,
			MyS_status:updatephone.cust_mysstatus,
			Email:updatephone.cust_email,
			Member:updatephone.cust_member
		});
	}
	else{res.status(403).send("Update Phone Failed")}
})

app.patch('/phone/:username/:phone',CustAccessToken, async (req, res) => { //Customer Update Phone (Swagger)
	console.log('Update Cust Phone:',req.params);
	var updatephone = await User.updatephone(req.params.username, req.params.phone);
	console.log("Update Cust Phone Return:",updatephone)
	 if (updatephone!=false){
		res.status(200).json({
			ID:updatephone.cust_id,
			Name:updatephone.cust_name,
			Phone:updatephone.cust_phone,
			IC:updatephone.cust_ic,
			MyS_status:updatephone.cust_mysstatus,
			Email:updatephone.cust_email,
			Member:updatephone.cust_member
		});
	}
	else{res.status(403).send("Update Phone Failed")}
})

//////////////////////////////////////////////////////////
//staff
app.get('/stafflogin', async (req, res) => { // Staff Login
	console.log("Login Main:",req.body);
	//username, password, phone,ic,mys_status,email,member
	let stafflogin = await Staff.login(req.body.username, req.body.password);
	console.log('Login Main Return:',stafflogin)
	if (stafflogin!=false){
	
	//username, password,name, phone,email, role
	let tokeninfo;
	if (stafflogin.staff_role=="staff"){tokeninfo=generateStaffAccessToken({username:stafflogin.cust_id,role:'staff'})}
	else if (stafflogin.staff_role=="manager"){tokeninfo=generateManAccessToken({username:stafflogin.cust_id,role:'manager'})}
		res.status(200).json({
			ID:stafflogin.staff_id,
			Name:stafflogin.staff_name,
			Phone:stafflogin.staff_phone,
			Email:stafflogin.staff_email,
			Role: stafflogin.staff_role,
			token:tokeninfo
		});
	}
	else{
		res.status(403).send("Invalid Staff ID or Password");
	}
})

app.get('/stafflogin/:username/:password', async (req, res) => { // Staff Login (Swagger)
	console.log("Login Main:",req.params);
	//username, password, phone,ic,mys_status,email,member
	let stafflogin = await Staff.login(req.params.username, req.params.password);
	console.log('Login Main Return:',stafflogin)
	if (stafflogin!=false){
	
	//username, password,name, phone,email, role
	let tokeninfo;
	if (stafflogin.staff_role=="staff"){tokeninfo=generateStaffAccessToken({username:stafflogin.staff_id,role:'staff'})}
	else if (stafflogin.staff_role=="manager"){tokeninfo=generateManAccessToken({username:stafflogin.staff_id,role:'manager'})}
		res.status(200).json({
			token:tokeninfo,
			ID:stafflogin.staff_id,
			Name:stafflogin.staff_name,
			Phone:stafflogin.staff_phone,
			Email:stafflogin.staff_email,
			Role: stafflogin.staff_role
		});
	}
	else{
		res.status(403).send("Invalid Staff ID or Password");
	}
})

//username, password,name, phone,email, role
app.post('/addstaff', async (req, res) => { //Add Staff
	console.log('Register Main:',req.body);
	var staffregister = await Staff.register(req.body.username, 
		req.body.password, req.body.name, req.body.phone,req.body.email, req.body.role);
	console.log("Register Main Return:",staffregister)
	 if (staffregister==true){
		res.status(200).send("Staff Registered");
	}
	else{
		res.status(403).send("Staff ID already existed")
	}
	console.log(staffregister)
})

app.post('/addstaffs',ManAccessToken, async (req, res) => { //Add Staff (Swagger Token)
	console.log('Register Main:',req.body);
	var staffregister = await Staff.register(req.body.username, 
		req.body.password, req.body.name, req.body.phone,req.body.email, req.body.role);
	console.log("Register Main Return:",staffregister)
	 if (staffregister==true){
		res.status(200).send("Staff Registered");
	}
	else{
		res.status(403).send("Staff ID already existed")
	}
	console.log(staffregister)
})

app.patch('/staffupdatecustphone', async (req, res) => { //Staff Update Cust Phone
	console.log('Staff Update Cust Phone:',req.body);
	var staffupdatephone = await Staff.updatecustphone(req.body.username, req.body.phone);
	console.log("Staff Update Cust Phone Return:",staffupdatephone)
	 if (staffupdatephone!=false){
		res.status(200).json({
			ID:staffupdatephone.cust_id,
			Name:staffupdatephone.cust_name,
			Phone:staffupdatephone.cust_phone,
			IC:staffupdatephone.cust_ic,
			MyS_status:staffupdatephone.cust_mysstatus,
			Email:staffupdatephone.cust_email,
			Member:staffupdatephone.cust_member
		});
	}
	else{res.status(403).send("Update Phone Failed")}
})

app.patch('/staffupdatecustphone/:username/:phone',SandMAccessToken, async (req, res) => { 
	//Staff Update Cust Phone (Swagger Token)
	console.log('Staff Update Cust Phone:',req.params);
	var staffupdatephone = await Staff.updatecustphone(req.params.username, req.params.phone);
	console.log("Staff Update Cust Phone Return:",staffupdatephone)
	 if (staffupdatephone!=false){
		res.status(200).json({
			ID:staffupdatephone.cust_id,
			Name:staffupdatephone.cust_name,
			Phone:staffupdatephone.cust_phone,
			IC:staffupdatephone.cust_ic,
			MyS_status:staffupdatephone.cust_mysstatus,
			Email:staffupdatephone.cust_email,
			Member:staffupdatephone.cust_member
		});
	}
	else{res.status(403).send("Update Phone Failed")}
})


app.patch('/staffupdatecustmember', async (req, res) => { //Staff  Update Membership
	console.log('Staff Update Cust Member:',req.body);
	var staffupdatemember = await Staff.updatecustmember(req.body.username, req.body.member);
	console.log("Staff Update Cust Member Return:",staffupdatemember)
	 if (staffupdatemember!=false){
		res.status(200).json({
			ID:staffupdatemember.cust_id,
			Name:staffupdatemember.cust_name,
			Phone:staffupdatemember.cust_phone,
			IC:staffupdatemember.cust_ic,
			MyS_status:staffupdatemember.cust_mysstatus,
			Email:staffupdatemember.cust_email,
			Member:staffupdatemember.cust_member
		});
	}
	else{res.status(403).send("Update Phone Failed")}
})

app.patch('/staffupdatecustmember/:username/:member',SandMAccessToken,async (req, res) => { 
	//Staff  Update Membership (swagger)
	console.log('Staff Update Cust Member:',req.params);
	var staffupdatemember = await Staff.updatecustmember(req.params.username, req.params.member);
	console.log("Staff Update Cust Member Return:",staffupdatemember)
	 if (staffupdatemember!=false){
		res.status(200).json({
			ID:staffupdatemember.cust_id,
			Name:staffupdatemember.cust_name,
			Phone:staffupdatemember.cust_phone,
			IC:staffupdatemember.cust_ic,
			MyS_status:staffupdatemember.cust_mysstatus,
			Email:staffupdatemember.cust_email,
			Member:staffupdatemember.cust_member
		});
	}
	else{res.status(403).send("Update Phone Failed")}
})


app.delete('/deletestaff', async (req, res) => { //Delete Staff 
	console.log('Staff Deletion:',req.body);
	var deletestaff = await Staff.deletestaff(req.body.staff_id, req.body.password,req.body.deletestaff_id);
	console.log("Staff Deletion Return:",deletestaff)
	 if (deletestaff!=false){
		res.status(200).send("Staff Deleted");
	}
	else{res.status(403).send("Staff Deletion Failed")}
})

app.delete('/deletestaff/:staff_id/:password/:deletestaff_id',ManAccessToken, async (req, res) => { 
	//Delete Staff (Swagger)
	console.log('Staff Deletion:',req.params);
	var deletestaff = await Staff.deletestaff(req.params.staff_id, req.params.password,req.params.deletestaff_id);
	console.log("Staff Deletion Return:",deletestaff)
	 if (deletestaff!=false){
		res.status(200).send("Staff Deleted");
	}
	else{res.status(403).send("Staff Deletion Failed")}
})
///////////////////////////////////////////////////////////
//Movie

app.post('/createmovie', async (req, res) => { //Create Movie
	//movieID,moviename,mduration,mdimension
	console.log('Create Movie:',req.body);
	var createmovie = await Movie.createmovie(req.body.MovieID, 
		req.body.moviename, req.body.mduration, req.body.mdimension);
	console.log("Create Movie Return:",createmovie)
	 if (createmovie==true){
		res.status(200).send("Movie Created");
	}
	else{
		res.status(403).send("Movie already existed")
	}
})

app.post('/createmovies',SandMAccessToken, async (req, res) => { 
	//Create Movie Swagger (Token)
	//movieID,moviename,mduration,mdimension
	console.log('Create Movie:',req.body);
	var createmovie = await Movie.createmovie(req.body.MovieID, 
		req.body.moviename, req.body.mduration, req.body.mdimension);
	console.log("Create Movie Return:",createmovie)
	 if (createmovie==true){
		res.status(200).send("Movie Created");
	}
	else{
		res.status(403).send("Movie already existed")
	}
})

app.get('/readmovie', async (req, res) => { //Movie Info
	console.log("Read Movie:",req.body);
	let readmovie = await Movie.readmovie(req.body.movieID);
	console.log('Read Movie:',readmovie)
	if (readmovie!=false){
		res.status(200).json({
			Movie:readmovie.mv_name,
			Duration:readmovie.duration,
			Dimension:readmovie.dimension
		});
	}
	else{
		res.status(403).send("Movie Doesn't exist");
	}
})

app.get('/readmovie/:movieID',SandMAccessToken, async (req, res) => { //Movie Info
	console.log("Read Movie:",req.params);
	let readmovie = await Movie.readmovie(req.params.movieID);
	console.log('Read Movie:',readmovie)
	if (readmovie!=false){
		res.status(200).json({
			Movie:readmovie.mv_name,
			Duration:readmovie.duration,
			Dimension:readmovie.dimension
		});
	}
	else{
		res.status(403).send("Movie Doesn't exist");
	}
})

app.patch('/updatemovie', async (req, res) => { //Update Movie Info
	console.log('Update Movie Info:',req.body);
	var updatemovie = await Movie.updatemovie(req.body.MovieID, 
		req.body.moviename, req.body.mduration, req.body.mdimension);
	console.log("Update Movie Info Return:",updatemovie)
	 if (updatemovie!=false){
		res.status(200).json({
			Movie:updatemovie.mv_name,
			Duration:updatemovie.duration,
			Dimension:updatemovie.dimension
		});
	}
	else{res.status(403).send("Update Movie Info Failed")}
})

app.patch('/updatemovie/:MovieID/:moviename/:mduration/:mdimension', SandMAccessToken,async (req, res) => { 
	//Update Movie Info Swagger
	console.log('Update Movie Info:',req.params);
	var updatemovie = await Movie.updatemovie(req.params.MovieID, 
		req.params.moviename, req.params.mduration, req.params.mdimension);
	console.log("Update Movie Info Return:",updatemovie)
	 if (updatemovie!=false){
		res.status(200).json({
			Movie:updatemovie.mv_name,
			Duration:updatemovie.duration,
			Dimension:updatemovie.dimension
		});
	}
	else{res.status(403).send("Update Movie Info Failed")}
})

/////////////////////////////////////////////////////////////////////////////////////
//Hall
app.post('/createshowtime', async (req, res) => { //Create Show Times
	//showID,hallnumber,mdate,mtime,movieID,ma_seat,mb_seat
	console.log('Create Showtime:',req.body);
	var createshowtime = await Movie.createhallshowtime(req.body.showID, 
		req.body.hallnum, req.body.mdate, req.body.mtime,req.body.mvID,req.body.a_seat,req.body.b_seat);
	console.log("Create Showtime Return:",createshowtime)
	 if (createshowtime==true){
		res.status(200).send("Showtime Created");
	}
	else{
		res.status(403).send("Hall is booked")
	}
})

app.post('/createshowtimes', SandMAccessToken, async (req, res) => { 
	//Create Show Times (Swagger Token)
	//showID,hallnumber,mdate,mtime,movieID,ma_seat,mb_seat
	console.log('Create Showtime:',req.body);
	var createshowtime = await Movie.createhallshowtime(req.body.showID, 
		req.body.hallnum, req.body.mdate, req.body.mtime,req.body.mvID,req.body.a_seat,req.body.b_seat);
	console.log("Create Showtime Return:",createshowtime)
	 if (createshowtime==true){
		res.status(200).send("Showtime Created");
	}
	else{
		res.status(403).send("Hall is booked")
	}
})


app.get('/readshowtime', async (req, res) => { //Read Showtimes 
	console.log("Read Show Time:",req.body);
	let readshowtime = await Movie.readmovieshowtime(req.body.movieID);
	console.log('Read Show Time Return:',readshowtime)
	if (readshowtime!=false){
		res.status(200).json({
			Hallnum:readshowtime[0].hallnum.toString(),
			Date:readshowtime[0].date,
			Time:readshowtime[0].time,
			Movie:readshowtime[0].mv_name,
			Duration:readshowtime[0].duration,
			Dimension:readshowtime[0].dimension,
			AvailableSeat:readshowtime[0].a_seat.toString(),
			BookedSeat:readshowtime[0].b_seat.toString()
		});
	}
	else{
		res.status(403).send("No Showtimes for the movie");
	}
})

app.get('/readshowtime/:movieID', async (req, res) => { //Read Showtimes (jest+swagger)
	console.log("Read Show Time:",req.params);
	let readshowtime = await Movie.readmovieshowtime(req.params.movieID);
	console.log('Read Show Time Return:',readshowtime)
	if (readshowtime!=false){
		res.status(200).json({
			Hallnum:readshowtime[0].hallnum.toString(),
			Date:readshowtime[0].date,
			Time:readshowtime[0].time,
			Movie:readshowtime[0].mv_name,
			Duration:readshowtime[0].duration,
			Dimension:readshowtime[0].dimension,
			AvailableSeat:readshowtime[0].a_seat.toString(),
			BookedSeat:readshowtime[0].b_seat.toString()
		});
	}
	else{
		res.status(403).send("No Showtimes for the movie");
	}
})


app.patch('/updateshowtime', async (req, res) => {
	console.log('Update Movie ShowTime:',req.body);
	var updateshowtime= await Movie.updatemovieshowtime(req.body.hallnumber, 
		req.body.mdate, req.body.mtime, req.body.movieID,req.body.etime);
	console.log("Update Movie ShowTimeReturn:",updateshowtime)
	 if (updateshowtime!=false){
		res.status(200).json({
			Hallnum:updateshowtime.hallnum.toString(),
			Date:updateshowtime.date,
			Time:updateshowtime.time,
			MovieID:updateshowtime.mv_id,
			AvailableSeat:updateshowtime.a_seat.toString(),
			BookedSeat:updateshowtime.b_seat.toString()
		});
	}
	else{res.status(403).send("Update ShowTime Failed")}
})

app.patch('/updateshowtimes',SandMAccessToken, async (req, res) => {
	console.log('Update Movie ShowTime:',req.body);
	var updateshowtime= await Movie.updatemovieshowtime(req.body.hallnum, 
		req.body.mdate, req.body.mtime, req.body.movieID,req.body.etime);
	console.log("Update Movie ShowTimeReturn:",updateshowtime)
	 if (updateshowtime!=false){
		res.status(200).json({
			Hallnum:updateshowtime.hallnum.toString(),
			Date:updateshowtime.date,
			Time:updateshowtime.time,
			MovieID:updateshowtime.mv_id,
			AvailableSeat:updateshowtime.a_seat.toString(),
			BookedSeat:updateshowtime.b_seat.toString()
		});
	}
	else{res.status(403).send("Update ShowTime Failed")}
})
///////////////////////////////////////////////////////////////
//Booking
app.post('/booking', async (req, res) => { //Booking Movie Ticket
	//staffID,custID,showID,mseat
	console.log('Booking:',req.body);
	var bookingres = await Movie.bookseat(req.body.staffID, 
		req.body.custID, req.body.showID, req.body.mseat);
	console.log("Booking Return:",bookingres)
	 if (bookingres==true){
		res.status(200).send("Booking Created");
	}
	else{
		res.status(403).send("The Seat is booked")
	}
})

app.post('/bookingcust',CustAccessToken, async (req, res) => { //Booking Movie Ticket by Customer (Swagger)
	//staffID,custID,showID,mseat
	console.log('Booking:',req.body);
	var bookingres = await Movie.bookseat(" ", 
		req.body.custID, req.body.showID, req.body.mseat);
	console.log("Booking Return:",bookingres)
	 if (bookingres==true){
		res.status(200).send("Booking Created");
	}
	else{
		res.status(403).send("The Seat is booked")
	}
})

app.post('/bookingstaff',SandMAccessToken, async (req, res) => { //Booking Movie Ticket by Staff (Swagger)
	//staffID,custID,showID,mseat
	console.log('Booking:',req.body);
	var bookingres = await Movie.bookseat(req.body.staffID, 
		req.body.custID, req.body.showID, req.body.mseat);
	console.log("Booking Return:",bookingres)
	 if (bookingres==true){
		res.status(200).send("Booking Created");
	}
	else{
		res.status(403).send("The Seat is booked")
	}
})

app.get('/readbooking', async (req, res) => { //Movie Info
	console.log("Read Booking:",req.body);
	let readbooking = await Movie.readbookseat(req.body.custID,req.body.showID);
	console.log('Read Booking Return:',readbooking)
	if (readbooking!=false){
		res.status(200).json({
			StaffID:readbooking[0].staff_id,
			CustID:readbooking[0].cust_id,
			Hallnum:readbooking[0].hallnum.toString(),
			Date:readbooking[0].date,
			Time:readbooking[0].time,
			Movie:readbooking[0].mv_name,
			Duration:readbooking[0].duration,
			Dimension:readbooking[0].dimension,
			SeatNumber:readbooking[0].seat_num
		});
	}
	else{
		res.status(403).send("Booking is not found");
	}
})

app.get('/readbookingcust/:custID/:showID',CustAccessToken, async (req, res) => { //Movie Info
	console.log("Read Booking:",req.params);
	let readbooking = await Movie.readbookseat(req.params.custID,req.params.showID);
	console.log('Read Booking Return:',readbooking)
	if (readbooking!=false){
		res.status(200).json({
			StaffID:readbooking[0].staff_id,
			CustID:readbooking[0].cust_id,
			Hallnum:readbooking[0].hallnum.toString(),
			Date:readbooking[0].date,
			Time:readbooking[0].time,
			Movie:readbooking[0].mv_name,
			Duration:readbooking[0].duration,
			Dimension:readbooking[0].dimension,
			SeatNumber:readbooking[0].seat_num
		});
	}
	else{
		res.status(403).send("Booking is not found");
	}
})

app.get('/readbookingstaff/:custID/:showID',SandMAccessToken, async (req, res) => { //Movie Info
	console.log("Read Booking:",req.params);
	let readbooking = await Movie.readbookseat(req.params.custID,req.params.showID);
	console.log('Read Booking Return:',readbooking)
	if (readbooking!=false){
		res.status(200).json({
			StaffID:readbooking[0].staff_id,
			CustID:readbooking[0].cust_id,
			Hallnum:readbooking[0].hallnum.toString(),
			Date:readbooking[0].date,
			Time:readbooking[0].time,
			Movie:readbooking[0].mv_name,
			Duration:readbooking[0].duration,
			Dimension:readbooking[0].dimension,
			SeatNumber:readbooking[0].seat_num
		});
	}
	else{
		res.status(403).send("Booking is not found");
	}
})


/////////////////////////////////////////////////////////////
//jsonwebtoken
const jwt = require('jsonwebtoken');
//Customer Token
function generateCustAccessToken(user){
	return jwt.sign(user,"custaccesstoken",{expiresIn:'1h'});
}
function CustAccessToken(req,res,next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	if (token == null) return res.status(401).send("Access token is missing or invalid");

	jwt.verify (token,"custaccesstoken",(err,user)=>{
		console.log(err)
		if (err) return res.status(401).send("Access token is missing or invalid");
		req.user=user
		next()

	});
}

//Staff Token
function generateStaffAccessToken(user){
	return jwt.sign(user,"staffaccesstoken",{expiresIn:'1h'});
}
function StaffAccessToken(req,res,next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	if (token == null) return res.status(401).send("Access token is missing or invalid");

	jwt.verify (token,"staffaccesstoken",(err,user)=>{
		console.log(err)
		if (err) return res.status(401).send("Access token is missing or invalid");
		req.user=user
		next()

	});
}

//Manager Token
function generateManAccessToken(user){
	return jwt.sign(user,"manaccesstoken",{expiresIn:'1h'});
}
function ManAccessToken(req,res,next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	if (token == null) return res.status(401).send("Access token is missing or invalid");

	jwt.verify (token,"manaccesstoken",(err,user)=>{
		console.log(err)
		if (err) return res.status(401).send("Access token is missing or invalid");
		req.user=user
		next()
	});
}
//Staff and Manager Token Test
function SandMAccessToken(req,res,next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	if (token == null) return res.status(401).send("Access token is missing or invalid");
		jwt.verify (token,"staffaccesstoken",(err,user)=>{
			console.log(err)
			if (err) {
			jwt.verify (token,"manaccesstoken",(err,user)=>{
				console.log(err)
				if (err) return res.status(401).send("Access token is missing or invalid");
				req.user=user
				next()
			});
		}
		else{
			req.user=user
			next()
		}
		
		});
}

app.get('/generatetoken',(req, res) => {//json web token testing
	let token1=generateCustAccessToken({username:'developer',role:'cust'})
	let token2=generateStaffAccessToken({username:'developer',role:'staff'})
	let token3=generateManAccessToken({username:'developer',role:'manager'})
	res.json({
		tokenC:token1,
		tokenS:token2,
		tokenM:token3,
	})
})
app.get('/custtokentest',CustAccessToken, (req, res) => {//json web token testing
		res.send('Cust Token Test Passed')
})
app.get('/stafftokentest',StaffAccessToken,  (req, res) => {//json web token testing
	res.send('Staff Token Test Passed')
})
app.get('/mantokentest',ManAccessToken,  (req, res) => {//json web token testing
	res.send('Manager Token Test Passed')
})

app.get('/sandmtokentest',SandMAccessToken,  (req, res) => {//json web token testing
	res.send('Staff and Manager Token Test Passed')
})
/////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
