let movie;
let hall;
let booking;
class Movie {
	static async injectDB(conn) {
		movie   = await conn.db("CinemaAssignment").collection("Movie"),
		hall    = await conn.db("CinemaAssignment").collection("Hall"),
		booking = await conn.db("CinemaAssignment").collection("Booking")
	}
//////////////////////////////
//Movie
	static async createmovie(movieID,moviename,mduration,mdimension) {		
		let result=await movie.findOne({mv_id:movieID});
		console.log(result)
		if(result!=null){return false}
		else{
			await movie.insertOne({mv_id:movieID,mv_name:moviename,duration:mduration,dimension:mdimension})
			return true
		}}
		
		static async readmovie(movieID) {		
			let readresult=await movie.findOne({mv_id:movieID});
			console.log(readresult)
			if(readresult!=null){return readresult}
			else{return false}}

		static async updatemovie(movieID,moviename,mduration,mdimension) {		
			let result=await movie.findOne({mv_id:movieID});
			console.log(result)
			if(result!=null){
				await movie.updateOne({mv_id:movieID},
					{"$set":{mv_name:moviename,duration:mduration,dimension:mdimension}});
				let updatemovieoutput= movie.findOne({mv_id:movieID});
				console.log(updatemovieoutput)
				return updatemovieoutput
				}
				else{return false
				}}
//////////////////////
//Hall
static async createhallshowtime(showID,hallnumber,mdate,mtime,movieID,ma_seat,mb_seat) {	
	// Hall number, Date, Time, Movie Time, MovieID, available seat booked seat
	//available seat = 100 person
	let result=await hall.findOne({show_id:showID,hallnum:hallnumber,date:mdate,time:mtime});
	console.log(result)
	if(result!=null){return false}
	else{
		await hall.insertOne({
			show_id:showID,
			hallnum:hallnumber, 
			date:mdate,
			time:mtime, 
			mv_id:movieID,
			a_seat:ma_seat, 
			b_seat:mb_seat})
		return true
	}}
		
	static async readmovieshowtime(movieID) {		
		let readresult=await hall.findOne({mv_id:movieID});
		console.log(readresult)
		if(readresult!=null)
		{
			let readresult=await hall.aggregate([
				{$match:{mv_id:movieID}},//Database Movie
				{$lookup:{
					from: 'Movie',
					localField: 'string',
					foreignField: 'string',
					as: 'Movie'
				}},
				{$unwind:{path:"$Movie"}},
				{$match:{"Movie.mv_id":movieID}},
				{$group:{
					_id: "$_id",
					hallnum: {$addToSet:"$hallnum"},
					date:{$addToSet:"$date"},
					time:{$addToSet:"$time"},
					mv_name:{$addToSet:"$Movie.mv_name"},
					duration:{$addToSet:"$Movie.duration"},
					dimension:{$addToSet:"$Movie.dimension"},
					a_seat:{$addToSet:"$a_seat"},
					b_seat:{$addToSet:"$b_seat"}}}
			]).toArray();
			return readresult
		}
		else{return false}}

		static async updatemovieshowtime(hallnumber,mdate,mtime,movieID,etime) {	
			let result=await hall.findOne({hallnum:hallnumber,date:mdate,time:mtime,mv_id:movieID});
			console.log(result)
			if(result!=null){
				await hall.updateOne({hallnum:hallnumber,date:mdate,time:mtime,mv_id:movieID},
					{"$set":{time:etime}});
			let updateresult=await hall.findOne({hallnum:hallnumber,date:mdate,mv_id:movieID});
				return updateresult
			}
		else return false
	}
////////////////////////////////////////
//Booking
static async bookseat(staffID,custID,showID,mseat) {	
	let result=await booking.findOne({show_id:showID,seat_num:mseat});
	console.log(result)
	if(result!=null){return false}
	else{
		await booking.insertOne({staff_id:staffID,cust_id:custID,show_id:showID,seat_num:mseat})
		let seats=await hall.findOne({show_id:showID})
		let aseat=seats.a_seat
		let bseat=seats.b_seat
		await hall.updateOne({show_id:showID},{"$set":{a_seat:aseat-1,b_seat:bseat+1}});
		return true
	}}

	static async readbookseat(custID,showID) {

		let checkbooking=await booking.find({cust_id:custID,show_id:showID}).count()
		console.log("checkbooking:",checkbooking)
		if(checkbooking==1){
			let mshowid=await hall.findOne({show_id:showID})
			let mvid=mshowid.mv_id
			let readresult=await booking.aggregate([
				{$match:{cust_id:custID,show_id:showID}},
				{$lookup:{
					from: 'Hall',
					localField: 'string',
					foreignField: 'string',
					as: 'Hall'
				}},
				{$unwind:{path:"$Hall"}},
				{$match:{"Hall.show_id":showID}},
				{$lookup:{
					from: 'Movie',
					localField: 'string',
					foreignField: 'string',
					as: 'Movie'
				}},
				{$unwind:{path:"$Movie"}},
				{$match:{"Movie.mv_id":mvid}},
				{$group:{
					_id: "$_id",
					staff_id: {$first:"$staff_id"},
					cust_id:{$first:"$cust_id"},
					hallnum:{$first:"$Hall.hallnum"},
					date:{$first:"$Hall.date"},
					time:{$first:"$Hall.time"},
					mv_name:{$first:"$Movie.mv_name"},
					duration:{$first:"$Movie.duration"},
					dimension:{$first:"$Movie.dimension"},
					seat_num:{$first:"$seat_num"}}}
			]).toArray();
			return readresult
		}
		else{return false}}

}

module.exports = Movie;