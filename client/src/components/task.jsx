function Task(props){
    var task = JSON.parse(JSON.stringify(props.task));;

        return(
        <div className="taskContent">
            <span className="close" onClick={()=>{props.hideTask();}}><i className="fa-solid fa-xmark"></i></span>
            <h5>
                {task.title}
            </h5>
            <br/>
            <p>
                {task.description}
            </p>
            <div className="allSubtasks">
                {task.subtask.map((subtask, index)=>(
                    <div key={index} className="align-self-center row">
                        <input className="align-self-center col-1" type={"checkbox"} defaultChecked={subtask.status} onChange={(event)=>{
                        subtask.status = event.target.checked;
                        }}/>
                        <label className="align-self-center col-10">{subtask.title}</label>
                    </div>
                ))}
            </div>
            <br/>
            <div>
                <select 
                    className="form-select"
                    name="status" 
                    defaultValue={task.status}
                    onChange = {(event)=>{task.status = event.target.value;}}>
                    <option value="To-Do">To-Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>    
            </div>
            <br/>
            <div className="row">
                <div className="col">
                    <button className="addSubtaskbtn" onClick={()=>{props.handleStatusChange(task);}}>Save</button>
                </div>
                <div className="col">
                    <button className="submit" onClick={()=>{props.deleteTask(task._id);}}>Delete Task</button>
                </div>
            </div>
        </div>
    )
}

export default Task;