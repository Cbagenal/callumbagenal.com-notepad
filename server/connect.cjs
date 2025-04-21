const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./server/config.env"})

const uri = process.env.MONGO_URI;
let client; 

if(!uri){
    console.error("Missing uri")
}

async function connectToMongo(){

    client = new MongoClient(uri)

    try{
        await client.connect()
        return client.db()
    } catch(e){
        console.log("Error: ", e)
    }
    
}