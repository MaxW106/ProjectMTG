import {MongoClient, ObjectId} from 'mongodb';
const secret = require("../secret.json");
const client = new MongoClient(secret.mongoUri);

const main = async () => {
    try{
        await client.connect();
        
        
    }    
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
    const exit = async () => {
        try {
            await client.close();
            console.log('Disconnected from database');
        } catch (error) {
            console.error(error);
        }
        process.exit(0);
    }
    
    const connect = async () => {
        try {
            await client.connect();
            console.log('Connected to database');
            process.on('SIGINT', exit);
        } catch (error) {
            console.error(error);
        }
    }
}
main();