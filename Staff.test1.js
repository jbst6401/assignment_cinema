const MongoClient = require("mongodb").MongoClient;
const Staff = require("./Staff")

describe("Staff Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.l8gir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		Staff.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})
	//username, password, name, phone, email, role
	test("New staff registration", async () => {
		const res = await Staff.register("S002", "password", "chong","010-0987654","happy012@gmail.com", "staff")
		console.log(res)
		expect(res).toBe(true)
	})

	test("Duplicate staff_id", async () => {
		const res = await Staff.register("S001", "pass123","chong","010-0987654","happy012@gmail.com", "staff")
		console.log(res)
		expect(res).toBe(false)
	})

	test("Staff login invalid staff_id", async () => {
		const res = await Staff.login("haha", "pass12345")
		console.log(res)
		expect(res).toBe(false)
	})

	test("Staff login invalid password", async () => {
		const res = await Staff.login("S001", "pass12345")
		console.log(res)
		expect(res).toBe(false)
	})

	test("Staff login successfully", async () => {
		const res = await Staff.login("S001", "password")
		console.log(res)
		expect(res._id.toString()).toBe("628e2da7cac131210070e4ab")
		expect(res.staff_id).toBe("S001")
		expect(res.staff_password).toBe("$2b$10$sFB7uvyN8./NLCzUZxpW7.C2B7Z0iePq3BNTF7y29REOW3AGxJn/m")
		expect(res.staff_name).toBe("Jonathan")
		expect(res.staff_phone).toBe("012-9876543")
		expect(res.staff_email).toBe("abc012345@student.utem.edu.my")
		expect(res.staff_role).toBe("staff")

	})

	test("Staff update cust's Phone successfully", async () => {
		const res = await Staff.updatecustphone("happy123","012-123457")
		console.log(res)
		expect(res._id.toString()).toBe("627e55fed0cbda83a836b16a")
		expect(res.cust_id).toBe("happy123")
		expect(res.cust_password).toBe("$2b$10$.Tw/k3y00nNaSzYBE5Q5FeX0hrk1SBMY1BRVjLdOAtK6oG.R2Of06")
		expect(res.cust_phone).toBe("012-123457")
		expect(res.cust_ic).toBe("12-12-12")
		expect(res.cust_mysstatus).toBe("3d")
		expect(res.cust_email).toBe("happy123@gmail.com")
		expect(res.cust_member).toBe("active")

	})
	test("Staff update cust's Phone unsuccessfully", async () => {
		const res = await Staff.updatecustphone("happy12","012-12345")
		expect(res).toBe(false)
	})

	test("Staff update membership", async () => {
		const res = await Staff.updatecustmember("happy123","active")
		expect(res._id.toString()).toBe("627e55fed0cbda83a836b16a")
		expect(res.cust_id).toBe("happy123")
		expect(res.cust_password).toBe("$2b$10$.Tw/k3y00nNaSzYBE5Q5FeX0hrk1SBMY1BRVjLdOAtK6oG.R2Of06")
		expect(res.cust_phone).toBe("012-123457")
		expect(res.cust_ic).toBe("12-12-12")
		expect(res.cust_mysstatus).toBe("3d")
		expect(res.cust_email).toBe("happy123@gmail.com")
		expect(res.cust_member).toBe("active")
	})
	test("Staff update membership failed", async () => {
		const res = await Staff.updatecustmember("happy12","012-12345")
		expect(res).toBe(false)
	})

	test("delete staffid", async () => {
		const res = await Staff.deletestaff("M001", "password","S002")
		expect(res.acknowledged).toBe(true)
		expect(res.deletedCount).toBe(1)
	})
	test("delete staffid fail", async () => {
		const res = await Staff.deletestaff("S000", "password","S002")
		expect(res).toBe(false)
	})

});