//Backend

const { MongoClient, ObjectId } = require('mongodb'); 

// --env-file=.env app.js
const username = process.env.USER ;
const password = process.env.PASSWORD ;
const database = "WebsiteData"; 

const uri = `mongodb+srv://${username}:${password}@websitedatabase.6oze7.mongodb.net/`

async function runQueries() {

    const client = new MongoClient(uri);
    
    try {
        //making sure that i'm connected to the database
        await client.connect().then(console.log(`\nLogged in as ${username}`));
        
        // await addNewUser(client);

        // await addNewWorkspace(client);

        // await addNewProperty(client);
        
        // await updateWorkspace(client);

        // await updateProperty(client);
        
        // await deleteProperty(client);

        await deleteWorkspace(client);

        // await deleteUser(client);

        // await showUsers(client);

        // await showAllProperties(client);

        // await showAllWorkspaces(client);

    } catch (e) {
        console.error(e);
    } finally {
        //close connection after query is done.
        await client.close()
            .then(console.log(`${username} - Connection closed`));
    }
}

//execute the function that houses all of the queries
runQueries();

//will be changed when frontend is connected to backend
async function addNewUser(client) {
    const userDescription = {
        name: 'derek', 
        password: 'abc123',
        email: 'derek',
        phone: '1112223333',
        role: 'Owner'
    }

    const response = await client
    .db(database)           
    .collection("users")   
    .insertOne(userDescription);          
}

//will be changed when frontend is connected to backend
async function addNewProperty(client) {
    const propertyDescription = {
        name: 'my Property',
        owner: 'derek', //to be changed when backend is connected to frontend 
        address: '123 address',
        neighbourhood: 'my neighbourhood',
        sqft: '50',
        garage: 'Yes',
        accessibleByPublicTransport: 'Yes'
    }
    const response = await client
    .db(database)          
    .collection("properties")   
    .insertOne(propertyDescription);          
}

//will be changed when frontend is connected to backend
async function addNewWorkspace(client) {
    const workspaceDescription = {
        name: 'my Workspace',
        underProperty: 'my Property', 
        owner: 'derek', //to be changed when backend is connected to frontend 
        meetingRoom: 'Yes',
        privateOffice: 'Yes',
        openDesk: 'Yes',
        capacity: '20',
        smoking: 'No',
        availability: 'Yes',
        term: 'Week',
        price: '750'
    }

    const response = await client
    .db(database)          
    .collection("workspaces")  
    .insertOne(workspaceDescription);          
}

//will be changed when frontend is connected to backend
async function updateWorkspace(client) {
    const updatedWorkspace = {
        $set: {
            meetingRoom: 'No',
            privateOffice: 'No',
            openDesk: 'No',
            capacity: '10',
            smoking: 'Yes',
            availability: 'No',
            term: 'Month',
            price: '2500'
        }
    }

    const response = await client
    .db(database)   
    .collection("workspaces")                 
    .updateOne({name: 'my Workspace'}, updatedWorkspace) 
}

//will be changed when frontend is connected to backend
async function updateProperty(client) {
    const updatedProperty = {
        $set: {
            address: '123 address',
            neighbourhood: 'my neighbourhood',
            sqft: '150',
            garage: 'No',
            accessibleByPublicTransport: 'No'
        }
    }

    const response = await client
    .db(database)   
    .collection("properties")                 
    .updateOne({name: 'my Property'}, updatedProperty) 
}

//will be changed when frontend is connected to backend
async function deleteProperty(client) {
    const response = await client
    .db(database)
    .collection("properties")
    .deleteOne({name: 'my Property'})
}

//will be changed when frontend is connected to backend
async function deleteWorkspace(client) {
    const response = await client
    .db(database)
    .collection("workspaces")
    .deleteOne({name: 'my Workspace'})
}

//will be changed when frontend is connected to backend
async function deleteUser(client) {
    const response = await client
    .db(database)
    .collection("users")
    .deleteOne({name: 'derek'})
}

//maybe not needed, shows all users registered on the database
async function showUsers(client) {
    const response = await client
    .db(database)       
    .collection("users") 
    .findOne();        
    console.log(response);
}

async function showAllProperties(client) {
    const response = await client
    .db(database)       
    .collection("properties") 
    .find();        
    console.log(response);
}

async function showAllWorkspaces(client) {
    const response = await client
    .db(database)       
    .collection("workspaces") 
    .find();        
    console.log(response);
}

//not working on this (maybe), planning on doing this on the frontend
async function searchWorkspaces(client) {
    const response = await client
    .db(database)       
    .collection("workspaces") 
    .find();        
    console.log(response);
}