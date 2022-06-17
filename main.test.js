const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
////////////////////////////
//Customer	
	it('Customer Login Successfully', async () => {
		return request
			.post('/login')
			.send({username: 'happy123', password: "pass123" })
			.expect('Content-Type', /json/)
			//.expect('Content-Type', /text/)
			.expect(200).then(response => {
				console.log("Login Succesful:",response.body);
				expect(response.body).toEqual(
					expect.objectContaining({
						// _id: expect.any(String),
                         ID: expect.any(String),
						 Name: expect.any(String),
						 Phone:expect.any(String),
						 IC:expect.any(String),
						 MyS_status:expect.any(String),
						 Email:expect.any(String),
						 Member: expect.any(String)
                })
				);
			});
	});

	it('Customer Login Failed', async () => {
		return request
			.post('/login')
			.send({username: 'happy123main', password: "pass" })
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(403).then(res => {
				expect(res.text).toBe("Invalid Username or Password");
			});		
	})
	
	it('Customer Register', async () => {
		return request
			.post('/register')
			//username, password, phone,ic,mys_status,email,member
			.send({username: "happy012main",
			password: "password", 
			name:"Beh main",
			phone:"123456",
			ic:"12-12-12", 
			mys_status:"3d",
			email:"happy012@gmail.com",
			member: "active"})
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(200).then(res => {
				expect(res.text).toBe("Customer Registered");
			});
		});

	it('Customer Register Failed', async () => {
		return request
		.post('/register')
			.send({username: "happy123", password: "password", phone:"123456"})
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(403).then(res => {
				expect(res.text).toBe("Customer ID is not available for registration");
			});
	})

	it('Customer Update Phone', async () => {
		return request
			.patch('/phone')
			//username, password, phone,ic,mys_status,email,member
			.send({username: "happyupdatephone",phone:"987654321"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				console.log("Update Phone Succesful:",response.body);
				expect(response.body).toEqual(
					expect.objectContaining({
                         ID: expect.any(String),
						 Name: expect.any(String),
						 Phone:expect.any(String),
						 IC:expect.any(String),
						 MyS_status:expect.any(String),
						 Email:expect.any(String),
						 Member: expect.any(String)
                }))
			});
		});


		it('Customer Update Phone Failed', async () => {
		return request
			.patch('/phone')
			//username, password, phone,ic,mys_status,email,member
			.send({username: "happyupdate",phone:"87654321"})
			.expect('Content-Type', /text/)
			.expect(403).then(res => {
				expect(res.text).toBe("Update Phone Failed");
			});
		});

//////////////////////////////////////
//Staff
		it('Staff Login Successfully', async () => {
			return request
				.get('/stafflogin')
				.send({username: 'S001', password: "password" })
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Login Succesful:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							// _id: expect.any(String),
							 ID: expect.any(String),
							 Name: expect.any(String),
							 Phone:expect.any(String),
							 Email:expect.any(String),
							 Role: expect.any(String)
							 
					})
					);
				});
		});
	
		it('Staff Login Failed', async () => {
			return request
				.get('/stafflogin')
				.send({username: 'happy123main', password: "pass" })
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Invalid Staff ID or Password");
				});		
		})

		it('Staff Register', async () => {
			return request
				.post('/addstaff')
				//username, password, phone,ic,mys_status,email,member
				.send({username: "M005",
				password: "password", 
				name:"Beh main",
				phone:"123456",
				email:"happy012@gmail.com",
				role: "staff"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(200).then(res => {
					expect(res.text).toBe("Staff Registered");
				});
			});
	
		it('Staff Register Failed', async () => {
			return request
			.post('/addstaff')
				.send({username: "M001", password: "password", phone:"123456"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Staff ID already existed");
				});
		})

		it('Staff Update Customer Phone', async () => {
			return request
				.patch('/staffupdatecustphone')
				//username, password, phone,ic,mys_status,email,member
				.send({username: "happyupdatephone",phone:"135792468"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Staff Update Customer Phone:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							// _id: expect.any(String),
                         ID: expect.any(String),
						 Name: expect.any(String),
						 Phone:expect.any(String),
						 IC:expect.any(String),
						 MyS_status:expect.any(String),
						 Email:expect.any(String),
						 Member: expect.any(String)				 
					})
					);
				});
			});
	
		it('Staff Update Customer Phone Failed', async () => {
			return request
			.patch('/staffupdatecustphone')
				.send({username: "happyupdate",phone:"123456"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Update Phone Failed");
				});
		})

		it('Staff Update Customer Membership', async () => {
			return request
				.patch('/staffupdatecustmember')
				//username, password, phone,ic,mys_status,email,member
				.send({username: "happyupdatephone",member:"expired"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Staff Update Customer Membership:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							// _id: expect.any(String),
							ID: expect.any(String),
							Name: expect.any(String),
							Phone:expect.any(String),
							IC:expect.any(String),
							MyS_status:expect.any(String),
							Email:expect.any(String),
							Member: expect.any(String)			 
					})
					);
				});
			});
	
		it('Staff Update Customer Membership Failed', async () => {
			return request
			.patch('/staffupdatecustmember')
				.send({username: "happyupdate",member:"active"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Update Phone Failed");
				});
		})

		it('Delete Staff', async () => {
			return request
			.delete('/deletestaff')
				.send({staff_id: "M001",password:"password",deletestaff_id:"M005"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(200).then(res => {
					expect(res.text).toBe("Staff Deleted");
				});
		})

		it('Delete Staff Failed', async () => {
			return request
			.delete('/deletestaff')
				.send({staff_id: "S001",password:"password",deletestaff_id:"M005"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Staff Deletion Failed");
				});
		})
///////////////////////
//Movie

it('Create Movie', async () => {
	return request
		.post('/createmovie')
		.send({MovieID:"220601-14",moviename:"Hello World Main",mduration:"1h",mdimension:"2D"})
		.expect('Content-Type', /text/)
				.expect(200).then(res => {
					expect(res.text).toBe("Movie Created");
				});
	});

	it('Create Movie Failed', async () => {
		return request
			.post('/createmovie')
			.send({MovieID:"210601-001",moviename:"Hello World Main",mduration:"1h",mdimension:"2D"})
			.expect('Content-Type', /text/)
					.expect(403).then(res => {
						expect(res.text).toBe("Movie already existed");
					});
		});

		it('Read Movie Information', async () => {
			return request
				.get('/readmovie')
				.send({movieID:"210601-001"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Read Movie Information:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							Movie: expect.any(String),
							Duration: expect.any(String),
							Dimension:expect.any(String)		 
					})
					);
				});
			});
	
		it('Read Movie Information Failed', async () => {
			return request
			.get('/readmovie')
				.send({movieID:"100"})
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Movie Doesn't exist");
				});
		})
		
		it('Update Movie', async () => {
			return request
				.patch('/updatemovie')
				.send({MovieID:"220601-14",moviename:"Hello World Main",mduration:"2h",mdimension:"3D"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Update Movie:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							Movie: expect.any(String),
							Duration: expect.any(String),
							Dimension:expect.any(String)			 
					})
					);
				});
			});
	
		it('Update Movie Failed', async () => {
			return request
				.patch('/updatemovie')
				.send({MovieID:"220601-0",moviename:"Hello World Main",mduration:"2h",mdimension:"3D"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Update Movie Info Failed");
				});
		})
////////////////////////////////
//Hall

it('Create Showtimes', async () => {
	return request
		.post('/createshowtime')
		.send({showID:"b220605-19", hallnum:5, mdate:"2022-06-05", mtime:"5pm",
			mvID:"220101-001", a_seat:100,b_seat:0})
		.expect('Content-Type', /text/)
				.expect(200).then(res => {
					expect(res.text).toBe("Showtime Created");
				});
	});

	it('Create Showtimes Failed', async () => {
		return request
			.post('/createshowtime')
			.send({showID:"b220605-15", hallnum:5, mdate:"2022-06-05", mtime:"5pm",
			mvID:"220101-001", a_seat:100,b_seat:0})
			.expect('Content-Type', /text/)
					.expect(403).then(res => {
						expect(res.text).toBe("Hall is booked");
					});
		});

		it('Read ShowTime', async () => {
			return request
				.get('/readshowtime')
				.send({movieID:"210601-001"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Read Movie Information:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							Hallnum: expect.any(String),
							Date: expect.any(String),
							Time: expect.any(String),
							Movie: expect.any(String),
							Duration: expect.any(String),
							Dimension:expect.any(String),
							AvailableSeat:expect.any(String),
							BookedSeat:expect.any(String) 
					})
					);
				});
			});
	
		it('Read ShowTime Failed', async () => {
			return request
			.get('/readshowtime')
			.send({movieID:"210601-009"})
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("No Showtimes for the movie");
				});
		})
		
		it('Update Movie ShowTime', async () => {
			return request
				.patch('/updateshowtime')
				.send({hallnumber:8,mdate:"2022-01-02",mtime:"5.30pm",movieID:"220101-001",etime:"3.30pm"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Update Movie:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							Hallnum: expect.any(String),
							Date: expect.any(String),
							Time: expect.any(String),
							MovieID: expect.any(String),
							AvailableSeat:expect.any(String),
							BookedSeat:expect.any(String) 		 
					})
					);
				});
			});
	
		it('Update Movie ShowTime Failed', async () => {
			return request
				.patch('/updateshowtime')
				.send({hallnumber:9,mdate:"2022-01-02",mtime:"5.30pm",movieID:"220101-001",etime:"3.30pm"})
				//.expect('Content-Type', /json/)
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Update ShowTime Failed");
				});
		})
//////////////////////////////////////////
//Booking
it('Booking', async () => {
	return request
		.post('/booking')
		.send({staffID:'S001',custID:'happyupdatephone',showID:"b220605-1",mseat:"M10"})
		.expect('Content-Type', /text/)
				.expect(200).then(res => {
					expect(res.text).toBe("Booking Created");
				});
	});

	it('Booking Failed', async () => {
		return request
			.post('/booking')
			.send({staffID:'S001',custID:'happyupdatephone',showID:"b220605-1",mseat:"M10"})
			.expect('Content-Type', /text/)
					.expect(403).then(res => {
						expect(res.text).toBe("The Seat is booked");
					});
		});

		it('Read Booking', async () => {
			return request
				.get('/readbooking')
				.send({custID:"happy123",showID:"b220605-100"})
				.expect('Content-Type', /json/)
				.expect(200).then(response => {
					console.log("Read Booking:",response.body);
					expect(response.body).toEqual(
						expect.objectContaining({
							StaffID:expect.any(String),
							CustID:expect.any(String),
							Hallnum: expect.any(String),
							Date: expect.any(String),
							Time: expect.any(String),
							Movie: expect.any(String),
							Duration: expect.any(String),
							Dimension:expect.any(String),
							SeatNumber:expect.any(String)
					})
					);
				});
			});
	
		it('Read Booking Failed', async () => {
			return request
			.get('/readbooking')
			.send({custID:"happy12300",showID:"b220605-100"})
				.expect('Content-Type', /text/)
				.expect(403).then(res => {
					expect(res.text).toBe("Booking is not found");
				});
		})



});
