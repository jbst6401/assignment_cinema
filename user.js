let users;
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const saltRounds=10
//r=random
const rName = faker.internet.userName() 
const rpassword = faker.internet.password()
const rphone = faker.phone.phoneNumber('01#-###-####') 
const ric=faker.phone.phoneNumber('9#0#0#-0#-####')
var rmys_status=faker.datatype.number({ min: 0, max: 9, precision:1 })
const remail=faker.internet.email()
var rmember=faker.datatype.number({ min: 0, max: 9, precision:1 })

//api documentation //https://fakerjs.dev/api/name.html



class User {
	static async injectDB(conn) {
		users = await conn.db("CinemaAssignment").collection("Customer")
	}

	static async register(username, password, name, phone, ic, mys_status, email, member) {
		// TODO: Check if username exists
		
		let result=await users.findOne({cust_id:username});
		console.log(result)
		if(result!=null){return false}
		else{
			//Use Faker please uncomment these 3 lines
			// username=rName
			// password=rpassword
			// phone=rphone
			// ic=ric
			// if (rmys_status<=4){mys_status="1d"}//1st Dose
			// else if (rmys_status=5){mys_status="2d"}//2nd Dose
			// else{mys_status="3d"}//boaster dose
			// email=remail
			// if (rmember<=4){member="active"}//active membership
			// else if (rmember=5){member="expired"}//Expired membership
			// else{member="no"}//non-member
			
			bcrypt.genSalt(saltRounds, function (saltError, salt){
				if(saltError){
					throw saltError
				}else{
					bcrypt.hash(password, salt, function(hashError, hash){
						if (hashError){
							throw hashError
						}else {
							const hash_password = hash
							//username, password, phone,ic,mys_status,email,member
							users.insertOne(
								{   cust_id:username,
									cust_password:hash_password,
									cust_name:name,
									cust_phone:phone,
									cust_ic:ic,
									cust_mysstatus:mys_status,
									cust_email:email,
									cust_member:member
								})					
							}});						
						}
					})
					return true
					}}

	static async login(username, password) {
		// TODO: Check if username exists
		let result=await users.findOne({cust_id:username});
		if(result!=null){
			const result=await users.findOne({cust_id:username});	
			const dbspass=result.cust_password
			const doesPasswordMatch = bcrypt.compareSync(password, dbspass);
			if(!doesPasswordMatch) {return false}
			else{return result}			
		}
		else{return false}}

	static async updatephone(username,phone) {
		let result=await users.findOne({cust_id:username});
		if(result!=null){
			let updateresult=await users.updateOne({cust_id:username},{"$set":{cust_phone:phone}});
			console.log(updateresult)
			let afterupdateresult=await users.findOne({cust_id:username});
			return afterupdateresult
		}
		else{return false}	
		
	}
}
module.exports = User;