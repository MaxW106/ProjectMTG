import {MongoClient, ObjectId} from 'mongodb';
const secret = require("../secret.json");
const client = new MongoClient(secret.mongoUri);
interface User {
    _id?:ObjectId,
    mail:string,
    name: string,
    password: string,
}
let users: User[] = [
    {name:"Artjom", mail:"artjom@gmail.com",password: "test"},
    {name:"Daniel",mail:"Daniel@gmail.com",password: "test"},
    {name:"Max",mail:"Max@gmail.com",password: "test"},
    {name:"Bilal",mail:"Bilal@gmail.com",password: "test"}
]
const main = async () => {
    try{
        await client.connect();
        let userCollection = await client.db("ProjectMTG").collection("Users");
        let deckCollection = await client.db("ProjectMTG").collection("Decks");
        //await userCollection.insertMany(users);
    }    
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
    
}
<<<<<<< HEAD

const createUser = (naam: string, email: string, hashedPassword: string) => {
    
}

export{main}
=======
export{main, User}
>>>>>>> 47392f9de02855af736857dd31caa5699aa1eb20
