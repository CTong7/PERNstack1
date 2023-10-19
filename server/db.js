//* Connecting Server to Postgres Database
// we are using the PG library to set up connection

const Pool=require("pg").Pool; //importing Pool class from pg library and assigning it to a var name Pool
//pool class creates a "pool" of db connections that can be reused across multiple requests
// rather than creating a new connection every time there is a new query
//! not fully sure why its called pool and why you need connections etc.


const pool= new Pool({
    // setup configuration inside (user name, password etc.)
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "perntodo" //name of database you are connecting to

})

module.exports=pool;