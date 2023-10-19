
import './App.css';
import React, {Fragment} from "react";
// fragment lets you group components together

//*Import Components that we built into main file
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  console.log("App is running properly!")
  // return (<Fragment> <h1>Hello</h1> </Fragment>);
  return (
  <Fragment> 
    <div className="container">
      <InputTodo/> 
      <ListTodo/>
    </div>
    
    
    </Fragment>);
  
};

export default App;
