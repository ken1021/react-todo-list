import React from 'react';
import storage from './storage';
import "../app.css";
import {GoTrashcan} from 'react-icons/go';
import {IconContext} from 'react-icons';
import FlipMove from 'react-flip-move';

class App extends React.Component{
constructor(props){
    super(props);
    this.state = {items: [] };
    this.handleInput = this.handleInput.bind(this);
}
handleInput(e){
if(this.myRef.value !== ""){
var newItem = {
    text: this.myRef.value,
    key: Date.now(),
    check: false
}
let tempList = this.state.items;

tempList.push(newItem)
this.setState({items:tempList})
storage.set('reactList',tempList);
e.preventDefault();
this.myRef.value = "";
}else(alert("Pls add a Task"))
}
handleCheck = (key) =>{
    let tempList = this.state.items;
    tempList[key].check = !tempList[key].check
    this.setState({items:tempList})
    storage.set("reactList",tempList)
}
handleDelete = (key) =>{
    let tempList = this.state.items;
    tempList.splice(key,1);
    this.setState({items:tempList})
    storage.set("reactList",tempList)
}

componentDidMount(){
    var todolist = storage.get("reactList")
    if(todolist){
        this.setState({items:todolist})
    }
}
render(){
    return (
        <div className="container">
            <form onSubmit = {this.handleInput} >
            <input ref={(a) => this.myRef = a}  placeholder = "enter-task" />
            <button type = "submit">add</button>
            </form>
            <h2>Not Complete</h2>
            <ul><FlipMove duiration = {250} easing = "ease-out">{
                this.state.items.map((value,key) => {
                        if(!value.check){
                            return (
                        <li className = "list not-comp" key = {value.key}>
                        <p >{value.text}</p>
                        <input  type = "checkbox" checked = {value.check} onChange = {this.handleCheck.bind(this,key)}/>
                        <IconContext.Provider  value = {{
                        className:"trash"}}><div>
                        <GoTrashcan className = "trash" onClick ={this.handleDelete.bind(this,key)} /></div>
                        </IconContext.Provider>
                        </li>
                        )
                            }
                        }
                    )
                }
            </FlipMove>
            </ul>
            
            <h2> Complete</h2>
            <ul ><FlipMove duiration = {250} easing = "ease-out">{
                this.state.items.map((value,key) => {
                        if(value.check){
                            return(
                        <li  className = "list comp" key = {value.key}>
                        <p >{value.text}</p>
                        <input type = "checkbox" checked = {value.check} onChange = {this.handleCheck.bind(this,key)}/>
                        <IconContext.Provider   value = {{
                        className:"trash"}}><div>
                        <GoTrashcan  className = "trash" onClick ={this.handleDelete.bind(this,key)} /></div>
                        </IconContext.Provider>
                            </li>)
                            }
                        }
                    )
                }</FlipMove>
            </ul>
        </div>
    );
}
}

export default App;