
// record libraries that we installed: express, pg and cors
const express = require('express');

//run express library and creates server
const app=express();//constant variable app is assigned instance of express app

const cors=require("cors");

const pool=require("./db") // import POOL object from db.js file so that we can connect DB to server and run queries with postgres
//!how do I know which files to import shit to? I know index.js is the main but.

//*create middleware (function that sits between clietn and server in a web app)
app.use(cors()); //use middleware library called cors

//*get data from client side from request.body object
app.use(express.json()); // req.body
//! what is req.body?
//ROUTES//

//create a todo
app.post("/todos",async(req,res) =>{
//req= request, res=result
//when we want to acess data it usually take a while
//async gives us an "await" which waits for function to return before code continues

    try{//use a try catch for error handling to make our lives easier
        //req object represents http request from client
        // req.body contains the message in the request sent
        const{description}= req.body; //extracts body of HTTP request from client 

        //*create a query to insert new row in table
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]
        
        ); // COMMAND tablename columnname value to be inserted
        

        //*send response back to client as JSON
        res.json(newTodo.rows); 
        console.log(req.body)
        
    }
    
    catch{
        console.error(err.message) // error rhandling
    }
})
//get all todos
app.get("/todos", async(req,res)=>{
    try{
        //*create query to return all data from table
        const allTodos=await pool.query("SELECT*FROM todo");
        res.json(allTodos.rows);

    }
    catch (err){
        console.error(err.message);

    }

}
)

//get a todo (when url is https://localhost:5000/todos/1) --> return query wiht id 1
app.get("/todos/:id", async(req,res)=>{
//! who is defining these urls routes?

    try{

        const{id}=req.params; //deconstructing params by id value

        const todo=await pool.query("SELECT*FROM todo WHERE todo_id=$1",[id]); //WHERE lets us specify what we want to seleect
        //! placeholder $1 is replaced by [id] which is extrated from the request
        res.json(todo.rows[0]);
    }
    catch (err){
        console.log(err.message);
    }
})
//update a todo
app.put("/todos/:id", async(req,res)=>{
    try{
        const{id}=req.params;
        const{description}=req.body;

        const todo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        //update table todo, set description to new value for todo item id 
         res.json("Your shit has been updated");
        // res.json(todo.rows);

    }

    catch (err){
        console.log(err.message);

    }

})
//delete a todo
app.delete("/todos/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        
        const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);

        res.json("Your shit has been deleted");
    }
    catch (err){
        console.log(err.message)
    }

})

// connect to server 5000
app.listen(5000,()=>{
    console.log('server has started on port 5000') // indicate that server has started
});

/*
Syntax:
require() loads in modules/libraries similar to import in python
express() creates an instance of the express application, which enables many methods
- app.get, app.post, app.delete, app.use(middleware), app.listen()
-app.post() is a method used to handle HTTP Post requests to a specific oroute

await ensures that the query is finished executing before running the rest of hte code
pool.query() executes a SQL query on the database
$1 is used as a placeholder for a different variable which replaces it, just syntax
*/