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

	test("New user registration", async () => {
		const res = await User.register("happy012user", "password", "123456")
		console.log(res)
		expect(res).toBe(true)
		//expect(res).toBe("Customer Registered")
	})

	test("Duplicate username", async () => {
		const res = await User.register("happy123", "pass123")
		console.log(res)
		//expect(res).toBe("Customer ID is not available for registration")
		expect(res).toBe(false)
	})

	test("User login invalid username", async () => {
		const res = await User.login("haha", "pass12345")
		console.log(res)
		//expect(res).toBe("Wrong ID or password")
		expect(res).toBe(false)
	})

	test("User login invalid password", async () => {
		const res = await User.login("happy123", "pass12345")
		console.log(res)
		//expect(res).toBe("Wrong ID or password")
		expect(res).toBe(false)
	})

	test("User login successfully", async () => {
		const res = await User.login("happy123", "pass123")
		console.log(res)
		//expect(res).toBe("Login Successfully")
		expect(res).toBe(true)

		// expect(res._id.toString()).toBe("627e55fed0cbda83a836b16a");
		// expect(res.cust_id.toString()).toBe("happy123");
		// expect(res.cust_phone.toString()).toBe("123456");

	})

	test('should run', () => {
	});
});