import Board from "./board";
import Header from "./header";

function allitems(props){
    var activeBoard = props.activeBoard;
    if(props.activeBoard === null){
        activeBoard = "Please select a board to view tasks";
    }
    return(
        <div className="col-10 items"> 
            <Header boardName={activeBoard} addTask={props.addTask} boards={props.boards} setActiveBoard={props.setActiveBoard} createBoard={props.createBoard}/>
            <div className="row tasks">
                {activeBoard === "Please select a board to view tasks"? null:
                <div className="col-12 mobile">
                    <button className="mobile" onClick={props.addTask}>
                            <i className="fa-solid fa-plus"></i> Add New Task
                    </button>  
                </div>                  
                }     
                <Board activeBoard = {props.activeBoard} lists ={props.lists} status="To-Do" showTask = {props.showTask}/>
                <Board activeBoard = {props.activeBoard} lists ={props.lists} status="Doing" showTask = {props.showTask}/>
                <Board activeBoard = {props.activeBoard} lists ={props.lists} status="Done" showTask = {props.showTask}/>
            </div> 
            
            
        </div>
    )
}

export default allitems;