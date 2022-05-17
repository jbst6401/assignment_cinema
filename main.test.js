const supertest = require('supertest');
const request = supertest('http://localhost:3000');
//jest.setTimeout(30000);
describe('Express Route Test', function () {
	// it('should return hello world', async () => {
	// 	return request.get('/hello')
	// 		.expect(200)
	// 		.expect('Content-Type', /text/)
	// 		.then(res => {
	// 			expect(res.text).toBe('Hello BENR2423');
	// 		});
	// })
	
	it('login successfully', async () => {
		return request
			.post('/login')
			.send({username: 'happy123', password: "pass123" })
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(200).then(res => {
				expect(res.text).toBe("Login Successfully");
			});
			// .then(response => {
			// 	//console.log("Register Main Test",response.body);
			// 	expect(response.body).toEqual(
			// 		expect.objectContaining({
			// 			//  _id: expect.any(String),
			// 			// cust_id: expect.any(String),
			// 			//  password: expect.any(String),
			// 			//  phone: expect.any(Number),
			// 		})
			// 	);
			// });
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({username: 'happy123main', password: "pass" })
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(403).then(res => {
				expect(res.text).toBe("Invalid Username or Password");
			});
				
			
	})
	
	it('register', async () => {
		return request
			.post('/register')
			.send({username: "happy012main", password: "password", phone:"123456"})
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(200).then(res => {
				expect(res.text).toBe("Customer Registered");
			});
			// .then(response => {
			// 	//console.log("Register Main Test",response.body);
			// 	expect(response.body).toEqual(
			// 		expect.objectContaining({
			// 			//  _id: expect.any(String),
			// 			//  CustomerID: expect.any(String),
			// 			// phone: expect.any(Number),
			// 		})
			// 	);
			// });
	});

	it('register failed', async () => {
		return request
		.post('/register')
			.send({username: "happy123", password: "password", phone:"123456"})
			//.expect('Content-Type', /json/)
			.expect('Content-Type', /text/)
			.expect(403).then(res => {
				expect(res.text).toBe("Customer ID is not available for registration");
			});
	})
});
"Customer ID is not available for registration"