const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const DB_URL = "mongodb://127.0.0.1:27017/rentspace";
main().then((res) => {
    console.log("connested to database");
}).catch((err) => {
    console.log("err");
});

async function main() {
    await mongoose.connect(DB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "68f26112ce03d672eb46901e" }));
    await Listing.insertMany(initdata.data);
    console.log("data saved successfull");
}

initDB();