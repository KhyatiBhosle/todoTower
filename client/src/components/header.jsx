import axios from "axios";

function header(props){
    return(
        <div className="row header">
            <div className="col align-self-center laptop">
                <h5>
                    {props.boardName}
                </h5>
            </div>
            <div className="col mobile">
                <i className="fa-solid fa-layer-group"></i>&emsp;&emsp;
                <select className="form-select" defaultValue={""} onChange={(event)=>{props.setActiveBoard(event.target.value)}}>
                    <option value={""}>To-Do Tower</option>
                    {props.boards.map((board, index)=>(
                        <option key={index} value = {board}>{board}</option>
                    ))}
                </select>
            </div>
            {props.boardName === "Please select a board to view tasks"?null:(
                <div className="col-3 addTask align-self-center">
                    <button className="btn laptop" onClick={props.addTask}>
                        <i className="fa-solid fa-plus"></i> Add New Task <span ></span>
                    </button>
                    <button className="btn mobile" onClick={()=>{props.createBoard()}}>
                        <i className="fa-solid fa-plus"></i> New Board <span ></span>
                    </button>
                </div>
            )}    
        </div>
    )
}

export default header;