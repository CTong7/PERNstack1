import React ,{Fragment, useEffect,useState }from "react";

import EditTodo from "./EditTodo";

//*This function automatically lists all items in todolist upon loading page
const ListTodo=() =>{

    const[todos,setTodos]=useState([]);

    //* DELETE item FUNCTOIN
    const deleteTodo= async (id) => {
        try{
            const deleteTodo=await fetch(`http://localhost:5000/todos/${id}`,{method:"DELETE"});
            setTodos(todos.filter(todo=> todo.todo_id !==id));//!Filter creates a condition, remove the deleted items from table
            console.log('print');
            console.log(deleteTodo);


        }
        catch (err){
            console.error(err.message);

        }
    }
    const getTodos = async()=>{
        try{
            //! what is 
            const response = await fetch("http://localhost:5000/todos");
            const jsonData=await response.json();

            //console.log(jsonData);
            setTodos(jsonData);
        }
        catch (err){
            console.error(err.message);
        }

    }
    
    //*UseEFfect is used to perform "SIDE" functions (anything that is outside of the component)
    //ex) fetching data from API
    useEffect(()=>{
        getTodos();

    },[]);
    


    return(
    <Fragment> 
        <table className="table mt-5 table-dark table-striped">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr> */}


                {/* !WE ARE MAPPING DATA FROM INPUT INTO THE TABLE */}

                {todos.map(todo=>(
                //! Something about creating unique key ids? 
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td> 
                            <EditTodo todo={todo}/>
                            
                        
                        </td>
                        <td><button className=" btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}> Delete </button></td>
                    </tr>

                ))}
                
                
            </tbody>
        </table>
    </Fragment>);
};

export default ListTodo;