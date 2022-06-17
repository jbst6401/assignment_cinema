const MongoClient = require("mongodb").MongoClient;
const Movie = require("./Movie")

describe("Movie Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.l8gir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		Movie.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

//////////////////////////////
//Movie Test
	test("New Movie", async () => {
		const res = await Movie.createmovie("220601-003","Hello World","2h","3D")
		console.log(res)
		expect(res).toBe(true)
	})

	test("Duplicate MovieID", async () => {
		const res = await Movie.createmovie("210601-001","Hello World","2h","3D")
		console.log(res)
		expect(res).toBe(false)
	})

	test("Read Movie Information", async () => {
		const res = await Movie.readmovie("210601-001")
		console.log(res)
		expect(res._id.toString()).toBe("62a4cfcf65be4ea2b77cd172")
		expect(res.mv_id).toBe("210601-001")
		expect(res.mv_name).toBe("Database")
		expect(res.duration).toBe("2h")
		expect(res.dimension).toBe("3D")
	})

	test("No Movie Found", async () => {
		const res = await await Movie.readmovie("210601-100")
		console.log(res)
		expect(res).toBe(false)
	})

	test("Update Movie", async () => {
		const res = await Movie.updatemovie("210601-002","Resident Evil","2h","3D")
		console.log(res)
		expect(res._id.toString()).toBe("62a583f665be4ea2b77cd175")
		expect(res.mv_id).toBe("210601-002")
		expect(res.mv_name).toBe("Resident Evil")
		expect(res.duration).toBe("2h")
		expect(res.dimension).toBe("3D")
	})

	test("Update Movie Failed", async () => {
		const res = await Movie.updatemovie("220601-100","Hello World","2h","3D")
		console.log(res)
		expect(res).toBe(false)
	})
///////////////////////////////////
//Hall Test
	test("New Show Time", async () => {
		const res = await Movie.createhallshowtime("b220605-1",6,"2022-06-05","5pm","220101-001",100,0)
		console.log(res)
		expect(res).toBe(true)
	})

	test("The Hall is booked", async () => {
		const res = await Movie.createhallshowtime("b220605-2",10,"2022-01-02","2.30pm","210601-001",100,0)
		console.log(res)
		expect(res).toBe(false)
	})
		
		test("See Movie Show Time", async () => {
			const res = await Movie.readmovieshowtime("210601-001")
			console.log("See Movie Show Time:", res)
			expect(res[0]._id.toString()).toBe("62a5949e65be4ea2b77cd1ba")
			expect(res[0].date).toBe("2022-01-02")
			expect(res[0].time).toBe("5.30pm")
			expect(res[0].hallnum).toBe(8)
			expect(res[0].mv_name).toBe("Database")
			expect(res[0].duration).toBe("2h")
			expect(res[0].dimension).toBe("3D")
			expect(res[0].a_seat).toBe(100)
			expect(res[0].b_seat).toBe(0)
		})

	test("Movie No Show Time", async () => {
		const res = await Movie.readmovieshowtime("210601-009")
		console.log(res)
		expect(res).toBe(false)
	})

	test("Change Show Time", async () => {
		const res = await Movie.updatemovieshowtime(8,"2022-01-02","5.30pm","220101-001","3.30pm")
		console.log("Change Show Time:",res)
		expect(res._id.toString()).toBe("62a5912465be4ea2b77cd1b4")
		expect(res.show_id).toBe("b220605-3")
		expect(res.hallnum).toBe(8)
		expect(res.date).toBe("2022-01-02")
		expect(res.time).toBe("3.30pm")
		expect(res.mv_id).toBe("220101-001")
		expect(res.a_seat).toBe(100)
		expect(res.b_seat).toBe(0)
	})

	test("Change Show Time Failed", async () => {
		const res = await Movie.updatemovieshowtime(8,"2022-01-02","5.30pm","220101-001","3.30pm")
		console.log(res)
		expect(res).toBe(false)
	})
/////////////////////////////
//Booking

test("Buy Seats", async () => {
	const res = await Movie.bookseat('S001','happyupdatephone',"b220605-1","M10")
	console.log(res)
	expect(res).toBe(true)
})

test("The Seats is booked", async () => {
	const res = await Movie.bookseat('','happy123',"b220605-1","A01")
	console.log(res)
	expect(res).toBe(false)
})

		
test("See Booking", async () => {
	const res = await Movie.readbookseat("happy123","b220605-100")
	console.log("See Movie Show Time:", res)
	expect(res[0]._id.toString()).toBe("62a5ac4365be4ea2b77cd1db")
	expect(res[0].staff_id).toBe("S001")
	expect(res[0].cust_id).toBe("happy123")
	expect(res[0].hallnum).toBe(8)
	expect(res[0].date).toBe("2022-06-05")
	expect(res[0].time).toBe("1.30pm")
	expect(res[0].mv_name).toBe("Database")
	expect(res[0].duration).toBe("2h")
	expect(res[0].dimension).toBe("3D")
	expect(res[0].seat_num).toBe("A01")
})

test("Wrong Booking id", async () => {
const res = await Movie.readbookseat("happy122","b220604-1001")
console.log(res)
expect(res).toBe(false)
})



});