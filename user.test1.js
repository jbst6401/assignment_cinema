const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.l8gir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})
	//username, password, phone,ic,mys_status,email,member
	test("New user registration", async () => {
		const res = await User.register("happy012user", "password", "123456","12-12-12","3d", "happy012@gmail.com", "active")
		console.log(res)
		expect(res).toBe(true)
	})

	test("Duplicate username", async () => {
		const res = await User.register("happy123", "pass123","123456","12-12-12","3d", "happy012@gmail.com", "active")
		console.log(res)
		expect(res).toBe(false)
	})

	test("User login invalid username", async () => {
		const res = await User.login("haha", "pass12345")
		console.log(res)
		expect(res).toBe(false)
	})

	test("User login invalid password", async () => {
		const res = await User.login("happy123", "pass12345")
		console.log(res)
		expect(res).toBe(false)
	})

	test("User login successfully", async () => {
		const res = await User.login("happy123", "pass123")
		console.log(res)
		expect(res._id.toString()).toBe("627e55fed0cbda83a836b16a")
		expect(res.cust_id).toBe("happy123")
		expect(res.cust_password).toBe("$2b$10$.Tw/k3y00nNaSzYBE5Q5FeX0hrk1SBMY1BRVjLdOAtK6oG.R2Of06")
		expect(res.cust_phone).toBe("123456")
		expect(res.cust_ic).toBe("12-12-12")
		expect(res.cust_mysstatus).toBe("3d")
		expect(res.cust_email).toBe("happy123@gmail.com")
		expect(res.cust_member).toBe("active")

	})

	test("User update Phone successfully", async () => {
		const res = await User.updatephone("happy12345", "pass123","012-123456")
		console.log(res)
		expect(res._id.toString()).toBe("628e4ab9cac131210070e4b3")
		expect(res.cust_id).toBe("happy12345")
		expect(res.cust_password).toBe("$2b$10$.Tw/k3y00nNaSzYBE5Q5FeX0hrk1SBMY1BRVjLdOAtK6oG.R2Of06")
		expect(res.cust_phone).toBe("012-123456")
		expect(res.cust_ic).toBe("12-12-12")
		expect(res.cust_mysstatus).toBe("3d")
		expect(res.cust_email).toBe("happy123@gmail.com")
		expect(res.cust_member).toBe("active")

	})
	test("User update Phone successfully", async () => {
		const res = await User.updatephone("happy12", "pass123","012-123456")
		expect(res).toBe(false)
	})

	test('should run', () => {
	});
});