import {MongoClient, ObjectId} from 'mongodb';
const secret = require("../secret.json");
const client = new MongoClient(secret.mongoUri);
/*interface User {
    _id?:ObjectId,
    mail:string,
    name: string,
    password?: number,
}
let users: User[] = [
    {name:"Artjom", mail:"artjom@gmail.com"},
    {name:"Daniel",mail:"Daniel@gmail.com"},
    {name:"Max",mail:"Max@gmail.com"},
    {name:"Bilal",mail:"Bilal@gmail.com"},
]*/
const main = async () => {
    try{
        await client.connect();
        let userCollection = await client.db("ProjectMTG").collection("Users");
        let deckCollection = await client.db("ProjectMTG").collection("Decks");
        
    }    
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
    
}
export{main}