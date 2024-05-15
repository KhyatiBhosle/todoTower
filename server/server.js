import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
import "dotenv/config";

console.log();
const app = express();
app.use(cors());
app.use(express.json())
const port = 3001;

mongoose.connect(process.env.MONGOURL);

const todoSchema =  new Schema({
    status: {
        type: String,
        required: true
    }, 
    board: {
        type: String,
        required:  true
    },
    title:{
        type: String,
        required: true
    },
    description: String,
    subtask: Array
});

const ToDo = mongoose.model('ToDo', todoSchema);

app.get('/api', (req, res)=>{
    ToDo.find({}).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err);
        console.log(err)
    })
});
app.post('/newTask', (req,res)=>{
    var todo = new ToDo({
        status: req.body.status,
        board: req.body.board,
        title: req.body.title,
        description: req.body.description,
        subtask: req.body.subtask
    })
    todo.save().then(res.redirect('/api'));
});

app.post('/changeTask', (req,res)=>{
    var task = req.body;
    var count = 0;
    task.subtask.forEach((subtask)=>{
        if(subtask.status){
            count = count+1;
        }
    })

    if(count === task.subtask.length){
        task.status = "Done"
    }

    if(task.status === "Done"){
        task.subtask.forEach((subtask)=>{
            subtask.status = true;
        })
    }
    ToDo.findByIdAndUpdate(task._id, {status: task.status, subtask: task.subtask}).then(()=>{res.redirect('/api')})
})

app.post('/delete', (req,res)=>{
    ToDo.findByIdAndDelete(req.body.id).then(res.redirect('/api'));
})
app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`);
});