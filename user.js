let users;
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const saltRounds=10
//r=random
const rName = faker.internet.userName() 
const rpassword = faker.internet.password()
const rphone = faker.phone.phoneNumber('01#-###-####') 
//api documentation //https://fakerjs.dev/api/name.html



class User {
	static async injectDB(conn) {
		users = await conn.db("CinemaAssignment").collection("Customer")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, phone) {
		// TODO: Check if username exists
		
		let result=await users.findOne({cust_id:username});
		console.log(result)
		if(result!=null){
			//if(result.cust_id!=null){
			//console.log("Customer ID is not available for registration") 
			return false
			//return "Customer ID is not available for registration"

		}
		else{
			//Use Faker please uncomment these 3 lines
			// username=rName
			// password=rpassword
			// phone=rphone
			bcrypt.genSalt(saltRounds, function (saltError, salt){
				if(saltError){
					throw saltError
				}else{
					bcrypt.hash(password, salt, function(hashError, hash){
						if (hashError){
							throw hashError
						}else {
							const hash_password = hash
							
							users.insertOne({cust_id:username,cust_password:hash_password,cust_phone:phone})
							
							}});
							
						}
					})
					//return "Customer Registered"
					//console.log("Customer Registered")
					return true
					
	}
		// TODO: Hash password
		// TODO: Save user to database
		// faker.js
		// return
	}

	static async login(username, password) {
		// TODO: Check if username exists
		let result=await users.findOne({cust_id:username});
		if(result!=null){
					const result=await users.findOne({cust_id:username});	
						const dbspass=result.cust_password
						const doesPasswordMatch = bcrypt.compareSync(password, dbspass);
						if(!doesPasswordMatch) {
							//console.log( "Wrong ID or password")
							return false
							//return "Wrong ID or password"
						 }
							else{
								//console.log( "Login Successfully")
								return true
								//return "Login Successfully"
								//return result
							}			
		}
		else{
			return false
			//console.log( "Wrong ID or password")	
			//return "Wrong ID or password"
			}
		// TODO: Validate password
		

		// TODO: Return user object
	

		// faker.js
	//	return
	}
}

module.exports = User;