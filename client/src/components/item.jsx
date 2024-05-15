function item(props){
    var count = 0;
    props.subtask.forEach((task)=>{
        if(task.status){
            count = count+1;
        }
    });
    return (
        <div className="item" onClick={()=>{props.showTask(props.id)}}>
            <p>
                <span  className="itemTitle">                
                    {props.title}
                </span>
                <br/>
                <span className="itemSubtasks">
                    {count} of {props.subtask.length} subtasks
                </span>
            </p>
        </div>
    )
}

export default item;