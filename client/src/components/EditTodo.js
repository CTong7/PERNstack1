import React,{Fragment,useState} from "react";

//*Pass todo as input to our function
const EditTodo=({ todo })=>{

    //!why do we always define description var, why not just reference in text as todo.description, feel like todo.description is way more informative
    const [description,setDescription]=useState(todo.description);

    //*edit description funciton using event handler
    // e=event
    const updateDescription= async (e) =>{
        e.preventDefault(); // allows updateDescription function to handle form submission wihtout reloading the page
        //bydefault when you submit a form, the URL is reloaded
        try{
            //this data is being packaged in the body of the request, which is typically a JSON object that contains the data to be sent.
            //
            const body={description};

            const response= await fetch(`http://localhost:5000/todos/${todo.todo_id}`, 
            {method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)}
            );
            
            window.location="/"; //calls browser to refresh so that you see change in text
            //!why are we calling a browser refresh instead of using onPush press={e=> setDescription(e.target.value)}
        }

        catch (err){
            console.error(err.message);
        }

    }

    return(
    <Fragment> 
        {/* <!-- Yellow Button to Open the Modal --> */}
        <button 
            type="button" 
            class="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}>
            Edit
        </button>

        {/* <!-- The Modal --> */}
        <div class="modal" id={`id${todo.todo_id}`} onClick={()=>setDescription(todo.description)}>
        <div class="modal-dialog">
        <div class="modal-content">

            {/* <!-- Modal Header = close button --> */}
            <div class="modal-header">
                <h4 class="modal-title">Edit Todo</h4>
                <button type="button" class="close" data-dismiss="modal" 
                onClick={()=>setDescription(todo.description)}>&times;</button>
            </div>

            {/* <!-- Modal body = Input Text box for user to type in--> */}
            <div class="modal-body"> <input type='text' className="form-control" value={description}
                onChange={e=> setDescription(e.target.value)}/> 
            
            </div>

            {/* <!-- Modal footer = Edit+ Close button --> */}
            {/* inside of the button we have nested an event listener which calls an event handler function */}
            <div class="modal-footer">
                <button 
                    type="button"
                    class="btn btn-warning"
                    data-dismiss="modal"
                    onClick={e => updateDescription(e)}
                    >
                    
                    Update
                </button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

        </div>
        </div>
        </div>

    </Fragment>
    );
}
export default EditTodo;
