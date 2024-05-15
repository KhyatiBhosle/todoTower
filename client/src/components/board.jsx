import Item from "./item";

function board(props){
    var count = 0;

    props.lists.forEach((item)=>{
        if((item.board === props.activeBoard) & (item.status === props.status)){
            count = count+1;
        }
    })

    return(
        <div className="col board">
            <p className="status">
            <i className="fa-solid fa-circle" id={props.status}></i> {props.status.toUpperCase()} ({count})
            </p>
            {props.lists.map((item)=>(
                (item.board === props.activeBoard) & (item.status === props.status)? (
                    <Item 
                        key={item._id} 
                        id={item._id} 
                        board={item.board} 
                        status={item.status} 
                        title={item.title} 
                        description={item.description} 
                        subtask={item.subtask} 
                        showTask ={props.showTask}
                    />
                    ) : null
                ))}
        </div>
    );
}

export default board;