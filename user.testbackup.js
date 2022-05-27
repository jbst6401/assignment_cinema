const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account", () => {
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
		const res = await User.register("S002", "chua", "012-3456789", "3d", "chua@gmail.com", "active")
		console.log(res)
		expect(res).toBe("Staff Registered")
	})

	test("Duplicate username", async () => {
		const res = await User.register("S001", "12345","012-3456789", "3d", "chua@gmail.com", "active")
		console.log(res)
		expect(res).toBe("Staff ID is not available for registration")
	})

	test("User login invalid username", async () => {
		const res = await User.login("haha", "pass12345")
		console.log(res)
		expect(res).toBe("Wrong ID or password")
	})

	test("User login invalid password", async () => {
		const res = await User.login("S001", "pass12345")
		console.log(res)
		expect(res).toBe("Wrong ID or password")
	})

	test("User login successfully", async () => {
		const res = await User.login("S001", "12345")
		console.log(res)
		expect(res).toBe("Login Succesfully")
	})
});