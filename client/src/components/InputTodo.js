import React, {Fragment, useState} from "react"; // import packages, we need react package to define react components

//* define function called InputTodo
//returns a jsx element that contains a header1 with text
const InputTodo=() =>{

    // *This lets you overlay text inside the todo list input box
    const [description, setDescription]=useState(""); 
    // description = current state, setDescription = how to chagne the state
    //useState = shows default value
    //!wtf is going on


    //*Send data request out to server
    //e is an event
    const onSubmitForm=async e=>{
        e.preventDefault();
        try{
            const body= {description};
            const response=await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)


            }); //FETCH MAKES A GET REQUEST BY DEFAULT SO WE NEED TO MODIFY IT
            
            window.location="/"; //refresh window after submission
            

        }
        catch (err){
            console.error(err.message);
        }
    }
    
    
    return(
        // add mt-5 (add margin aboe text of 5) + define a class name for it
        //center the text to middle of page
        //inside the form, we have linked to the state variable description
    <Fragment> 

        <h1 className="text-center mt-5"> Todo List </h1>
        <form className="d-flex mt-4" onSubmit={onSubmitForm}>
            <input 
            type="text"
            className="form-control"
            value={description}
            onChange={e=> setDescription(e.target.value)}
            /> 
            
            <button className="btn btn-success">Add</button>
        </form>

    </Fragment>);
    

};

export default InputTodo; // export means that we can import this function into other parts of the applications

/* Synatax
jsx is writing html code inside of a javascript file. What's actually going on is the following:
const element = <h1>Hello, world!</h1>; ---> const element = React.createElement("h1", null, "Hello, world!");
*/