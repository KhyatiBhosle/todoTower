function addTask(props){

    return (<div className="task">
    <div className="taskContent">
      <span className="close" onClick={props.hideTask}><i className="fa-solid fa-xmark"></i></span>
      <h5>Add New Task</h5>
      <form>
          {props.newTask?(
            <div>
              <label >Board Name</label><br/>
              <input 
                type={"text"} 
                name={"title"} 
                placeholder={"e.g. Take coffee break"} 
                value={props.activeBoard}
                onChange={props.handleNewBoard}/>
            </div>):null}
          <label >Title</label><br/>
          <input 
            type={"text"} 
            name={"title"} 
            placeholder={"e.g. Take coffee break"} 
            value={props.formData.title}
            onChange={props.handleInputChange}/><br/>

          <label >Description</label><br/>
          <textarea            
            type={"text"} 
            name={"description"} 
            rows="5"
            placeholder={"e.g. It's always good to take a break. This 15 minute break can recharge the batteries a little"}
            value={props.formData.description}
            onChange={props.handleInputChange}></textarea>
          <br/>
          <div>
            <label>Subtasks:</label>
            {props.formData.subtasks.map((subtask, index) => (
              <div className="row" key={index}>
                <div className="col-11 align-self-center">
                <input
                  className="subtask"
                  type="text"
                  value={subtask.title}
                  onChange={(e) => {props.handleSubtaskChange(index, e.target.value)}}
                />
                </div>
                <div className="col-1 align-self-center">
                  <span onClick={() => props.deleteSubtask(index)}><i className="fa-solid fa-xmark"></i></span>
                </div>
                <br/>
                <br/>
              </div>
            ))}
            <br/>
            <button type="button" className="addSubtaskbtn"onClick={props.addSubtask}><i className="fa-solid fa-plus"></i> Add Subtask</button>
          </div>
          <label >Status</label><br/>
          <select 
            className="form-select"
            name="status" 
            value={props.formData.status}
            onChange={props.handleInputChange}>
              <option value="To-Do">To-Do</option>
              <option value="Doing">Doing</option>
          </select>
          <br/>
          <button className="submit" onClick={(event)=>{
            event.preventDefault();
            props.addNewTask();
          }}>Create Task</button>
      </form>
    </div>
  </div>
  )
}
export default addTask;