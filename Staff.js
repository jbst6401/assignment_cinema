let staff;
let users;
const bcrypt = require('bcrypt');
const saltRounds=10

class Staff {
	static async injectDB(conn) {
		users = await conn.db("CinemaAssignment").collection("Customer")
		staff = await conn.db("CinemaAssignment").collection("Staff")
	}

	static async register(username, password, name, phone, email, role) {
		// TODO: Check if username exists
		
		let result=await staff.findOne({staff_id:username});
		console.log(result)
		if(result!=null){return false}
		else{
			
			bcrypt.genSalt(saltRounds, function (saltError, salt){
				if(saltError){
					throw saltError
				}else{
					bcrypt.hash(password, salt, function(hashError, hash){
						if (hashError){
							throw hashError
						}else {
							const hash_password = hash
							//username, password,name, phone,email, role
							staff.insertOne(
								{   staff_id:username,
									staff_password:hash_password,
									staff_name:name,
									staff_phone:phone,
									staff_email:email,
									staff_role:role
								})					
							}});						
						}
					})
					return true
					}}

	static async login(username, password) {
		// TODO: Check if username exists
		let result=await staff.findOne({staff_id:username});
		if(result!=null){
					const result=await staff.findOne({staff_id:username});	
						const dbspass=result.staff_password
						const doesPasswordMatch = bcrypt.compareSync(password, dbspass);
						if(!doesPasswordMatch)  {return false}
						else{return result}			
		}
		else{return false}}

		static async deletestaff(username, password, staffid) {
			let result=await staff.findOne({staff_id:username});
			if(result!=null){
				const result=await staff.findOne({staff_id:username});	
							const dbspass=result.staff_password
							const doesPasswordMatch = bcrypt.compareSync(password, dbspass);
							var rrole=result.staff_role
							if(!doesPasswordMatch) {return false}
								else{
									if(rrole=="manager"){
									let deleteresult=await staff.deleteOne({staff_id:staffid});
									console.log(deleteresult)
									return deleteresult
									}
									else{return false}
								}}
			else{return false}	
		}
	

	static async updatecustphone(custname, phone) {
								let userid=await users.findOne({cust_id:custname})
								if(userid!=null){
								let updateresult=await users.updateOne(
									{cust_id:custname},{"$set":{cust_phone:phone}});
								console.log(updateresult)
								let afterupdateresult=await users.findOne({cust_id:custname});
								return afterupdateresult
							}
							else{return false}
						}
	
	static async updatecustmember(custname, member) {
									let custread=await users.findOne({cust_id:custname})
									if (custread!=null){	
								let updateresult=await users.updateOne(
									{cust_id:custname},{"$set":{cust_member:member}});
								console.log(updateresult)
								let afterupdateresult=await users.findOne({cust_id:custname});
								return afterupdateresult
									}
								else{return false}
							}
}
module.exports = Staff;