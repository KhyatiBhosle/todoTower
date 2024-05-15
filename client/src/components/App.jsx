import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Allitems from "./allitems";
import Task from "./task";
import AddTask from "./addnewtask";

function App() {
  const [lists, setList] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [itemClicked, setClicked] = useState("");
  const [task, setTask] = useState({});
  const [addClicked, setAdd] = useState(false);  
  const [newBoard, setNewboard] = useState(false);
  const [hurray, setHurray] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtasks: [{title:'', status: false}],
    status: 'To-Do',
    board: null
  });

  const showTask = (itemID)=> {
    setClicked(itemID);
    lists.map((selectedTask)=>(
      selectedTask._id === itemID? setTask(selectedTask): null
    ))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewBoard = (event)=>{
    setActiveBoard(event.target.value)
  };

  const handleSubtaskChange = (index, value) => {
    const subtasks = [...formData.subtasks];
    subtasks[index].title = value;
    subtasks[index].status = false;
    setFormData(prevState => ({
      ...prevState,
      subtasks
    }));
  };

  const handleStatusChange = (task)=>{
    var previousState;

    lists.map(list=>{
      if(list._id == task._id){
        previousState = list;
      }
    })
    var previousCount = 0;
    var changedCount = 0;
    
    previousState.subtask.map((state)=>{
      if(state.status){
        previousCount = previousCount+1;
      }
    })

    task.subtask.map((state)=>{
      if(state.status){
        changedCount = changedCount+1;
      }
    })
    if(changedCount == 3 & previousCount < 3){
      setHurray(true);
    }
    console.log(previousState.status != "Done");
    if(previousState.status != "Done" & task.status == "Done"){
      setHurray(true);
    }

    axios.post("https://todotower.onrender.com/changeTask", task).then(()=>{
      axios.get('https://todotower.onrender.com/api').then((list)=>{
        setList(list.data)
    }).catch((err)=>{
      console.log(err);
    })
    }).catch((err)=>{
      console.log(err)
    });
    setClicked("");
    setAdd(false);
    console.log(hurray)
  }

  const addSubtask = () => {
    setFormData(prevState => ({
      ...prevState,
      subtasks: [...prevState.subtasks, {title: '', status: false}]
    }));
  };

  const deleteSubtask = (index) => {
    const subtasks = [...formData.subtasks];
    subtasks.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      subtasks
    }));
  };

  const hideTask = ()=>{
    setClicked("");
    setAdd(false);
    setFormData({
      title: '',
      description: '',
      subtasks: [{title:'', status: false}],
      status: 'To-Do',
      board: null
    })
    setNewboard(null);
  }

  const addTask = ()=>{
    setAdd(true);
  }

  const deleteTask = (id)=>{
    axios.post("https://todotower.onrender.com/delete", {id: id}).then(()=>{
      axios.get('https://todotower.onrender.com/api').then((list)=>{
        setList(list.data)
    }).catch((err)=>{
      console.log(err);
    })
    }).catch((err)=>{
      console.log(err)
    });
    setClicked("");
    setAdd(false);
  }

  function addNewTask(){
    axios.post("https://todotower.onrender.com/newTask", {
      title: formData.title,
      description: formData.description,
      subtask: formData.subtasks,
      status: formData.status,
      board: activeBoard
    }).then(()=>{
      axios.get('https://todotower.onrender.com/api').then((list)=>{
        setList(list.data)
    }).catch((err)=>{
      console.log(err);
    })
    }).catch((err)=>{
      console.log(err)
    });

    setFormData(prevState => ({
      title: '',
      description: '',
      subtasks: [''],
      status: 'To-Do',
      board: null
    }));
    setAdd(false);
    setNewboard(null);
  }

  const createBoard = ()=>{
    setNewboard(true);
  }

  useEffect(()=>{
    axios.get('https://todotower.onrender.com/api').then((list)=>{
      setList(list.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[]);

  const uniqueBoards = new Set(lists.map(item => item.board));
  const boards = Array.from(uniqueBoards);

 return (
    <div>
      <div className="row dashboard">
        <div className="col-2 allBoards laptop">
          <div className="brand">
            <h5>
            <i className="fa-solid fa-layer-group"></i>&emsp;To-Do Tower
            </h5>
          </div>
          <br/>
          <div className="boards">
            <p>
              ALL BOARDS ({boards.length})
            </p>
            {boards.map((board, index)=>(
              (board === activeBoard)?(
                <p key = {index} className="boardName boardActive" onClick = {()=>setActiveBoard(board)}>
                <i className="fa-regular fa-clipboard"></i>&emsp;{board}
                </p>):(
                <p key = {index} className="boardName" onClick = {()=>setActiveBoard(board)}>
                <i className="fa-regular fa-clipboard"></i>&emsp;{board}
                </p>)
              ))
            }
            <p className="boardName" onClick={()=>{setNewboard(true); setActiveBoard(null)}}>
              <i className="fa-regular fa-clipboard"></i>&emsp;Create new board
            </p>
          </div>
        </div>
        <Allitems activeBoard = {activeBoard} lists = {lists} showTask={showTask} addTask={addTask} boards = {boards} setActiveBoard={setActiveBoard} createBoard={createBoard}/>
      </div>

      {itemClicked === ""?null:(
            lists.map((item, index)=>(
              (item._id === itemClicked)?(
                <div className="task" key = {index}>
                  <Task id ={item._id} task = {task} hideTask = {hideTask} handleStatusChange={handleStatusChange} deleteTask={deleteTask}/>
                </div>
              ):null
            ))
      )}

      {addClicked ? (
        <AddTask 
          hideTask = {hideTask} 
          addNewTask = {addNewTask} 
          formData = {formData} 
          addSubtask={addSubtask} 
          handleInputChange={handleInputChange} 
          handleSubtaskChange={handleSubtaskChange} 
          deleteSubtask={deleteSubtask}
          newTask={null}
          />
        ): null}

      {newBoard? (
        <AddTask 
          hideTask = {hideTask} 
          addNewTask = {addNewTask} 
          formData = {formData} 
          addSubtask={addSubtask} 
          handleInputChange={handleInputChange} 
          handleSubtaskChange={handleSubtaskChange} 
          deleteSubtask={deleteSubtask}
          newTask = {true}
          activeBoard = {activeBoard}
          handleNewBoard={handleNewBoard}
          />
      ):null}

      {hurray?(
        <div className="hurrayParent task">
          <div className="hurray taskContent">
          <lottie-player className="lottie" src="https://lottie.host/c37c322c-e736-4862-9237-560bb7a4d4c8/SJPFT02OFg.json" background="transparent" speed="1"  loop autoplay direction="1" mode="normal"></lottie-player>
            <div className="taskContent hurrayChild">
              <h1>Keep Up the Work!</h1><br/>
              <button onClick={()=>{setHurray(false)}}>Continue
              </button>
            </div>
           
          </div>
        </div>
      ):null
        
      }
    </div>    
  );
}
  
export default App;